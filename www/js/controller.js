/**
 * Created by mjl on 15/4/18.
 */
angular.module('moduleController', ['ionic'/*, 'ngCordova'*/, 'once'])


    .controller('MainCtrl', function ($scope, $state, $ionicSideMenuDelegate, $location) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.openOrders = function () {
            $state.go("eventmenu.orders", {}, { reload: true });
        };

        $scope.$on("$locationChangeSuccess", function () {
            //alert($location.url());
            var url = $location.url();
            $scope.shouldShowSearch = (url === "/event/dishes");
        });
    })
    .controller('DefaultCtrl', function ($scope, UserServices, RestaurantServices, DishServices, /*RestaurantInfo,*/
        $rootScope, $state, $ionicPlatform/*, $cordovaBarcodeScanner*/, $timeout, $location, $cacheFactory, $templateCache) {

        $cacheFactory('super-cache').removeAll();
        $templateCache.removeAll();
        var state = $state;
        
        /*
        var service = DishServices;
       
        $scope.scanResult = "";
        $scope.startScan = function(){
         $cordovaBarcodeScanner
                .scan()
                .then(function(barcodeData) {
                    if(barcodeData.cancelled == 0) {
                        if(barcodeData.format === "QR_CODE")
                        {
                            RestaurantServices.set(barcodeData.text);
                            state.go("eventmenu.category",{}, {reload: true});
                        }else{
                            $scope.scanResult = "您扫描的不是二维码，请重新扫描！";
                        }
                    }
                }, function(error) {
                    $scope.scanResult = "扫描失败，请重试！";
                });
        };
        */
        var scope = $scope;
        scope.error = "";
        //window.localStorage.removeItem('user');// = undefined;
        $ionicPlatform.ready(function () {

            var promise;
            if (window.localStorage.user) {
                UserServices.setUser();
                promise = UserServices.Register();
            } else {
                scope.error = "请确认登陆！";
                return;
            }
            promise.then(function (data) {
                UserServices.user.id = data.data;
                var paras = $location.search();
                if (paras.restaurant_id && paras.restaurant_id) {
                    RestaurantServices.set("{restaurant_id:" + paras.restaurant_id + ",desk_id:" + paras.desk_id + ",name:'" + paras.name + "'}");
                    state.go("eventmenu.category", {}, { reload: true });
                } else {
                    scope.error = "请扫描正确的二维码！";
                }
            }, function () {
                   scope.error = "发生错误，请重试！";
            });
            //var user = angular.fromJson(window.localStorage.user);
            //alert("user");
            //////////////////
            //state.go("eventmenu.personal",{}, {reload: true});
            /*
            var paras = $location.search();
            if (paras.restaurant_id && paras.restaurant_id) {
                RestaurantServices.set("{restaurant_id:" + paras.restaurant_id + ",desk_id:" + paras.desk_id + ",name:'" + paras.name + "'}");
                state.go("eventmenu.category", {}, { reload: true });
            } else {
                scope.error = "请扫描正确的二维码！";
            }
            */
            //RestaurantServices.set("{restaurant_id:" + RestaurantInfo.rid + ",desk_id:" + RestaurantInfo.did + ",name:'" + RestaurantInfo.name + "'}");
            //DishServices.setUrl(/*"http://192.168.1.103/saorder_serve/index.php?a=load_more_dishes" +*/barcodeData.text);
            //state.go("eventmenu.category", {}, { reload: true });
            ////////////////
            ///开始扫面
            //$scope.startScan();
            /*
            //自动登陆
            if(UserServices.isRegistered() && UserServices.isAutoLogin()){   //已注册&&自动登录
                UserServices.Login(UserServices.getUserName(),UserServices.getPassword());
            }
            */
            /*else if(UserServices.isLogin){
                //已登陆
                //扫描
                $scope.startScan();
            }
            else if(UserServices.isAutoLogin()){
                //自动登陆
                var isLogin = UserServices.Login(UserServices.getUserName(),UserServices.getPassword());
                if(isLogin){
                    //扫描
                    $scope.startScan();
                }else{
                    $scope.scanResult = "自动登陆失败";
                }
            }else{
                state.go("login",{}, {reload: true});
            }*/
        });
    })
    .controller('CategoryCtrl', function ($scope, RestaurantServices, DishServices, AdServices) {
        $scope.restaurant = RestaurantServices.getName();//"伊清阁";
        $scope.categories = DishServices.categories;
        DishServices.updateCategory();

        $scope.ads = AdServices.ads;
        $scope.adClicked = function ($index) {
            //alert(UserServices.user.nickname);
            ad = AdServices.getAd($index);
            if (ad.name) {
                alert(ad.name);
            }
        };
    })
    .controller('DishesCtrl', function ($scope, categoryIndex, RestaurantServices, DishServices,
        AdServices, $http, $timeout, $location, $ionicScrollDelegate, $anchorScroll) {
        $scope.category = DishServices.getCategory(categoryIndex);
        DishServices.reset(categoryIndex);
        DishServices.setType($scope.category.id);

        $scope.restaurant = RestaurantServices.getName();//"伊清阁";

        var interval = 60000;
        var updateMaxId = function () {
            DishServices.updateMaxId();
            $timeout(function () {
                updateMaxId();
            }, interval);
        };
        updateMaxId();

        $scope.dishes = DishServices.dishes[categoryIndex];
        //DishServices.updateDishes();
        var update = function (scope, services) {
            scope.shouldShowInfinite = true;
            var promise = services.updateDishes();
            promise.then(function () {  // 调用承诺API获取数据 .resolve
                scope.$broadcast('scroll.infiniteScrollComplete');
                scope.shouldShowInfinite = false;
                $scope.dishTips = "～_～下拉刷新～_～";
            }, function () {
                //alert("失败");
                scope.$broadcast('scroll.infiniteScrollComplete');
                scope.dishTips = "～︿～不好意思，请您重试一次～︿～";
                scope.shouldShowInfinite = false;
            });
        };
        update($scope, DishServices);
        $scope.dishTips = "";
        $scope.shouldShowInfinite = true;
        var scope = $scope;
        $scope.doRefresh = function () {
            var lastId = DishServices.getLastId();
            if (DishServices.getMaxId() > lastId) {
                update(scope, DishServices);
            } else {
                $timeout(function () {
                    scope.dishTips = "～_～已经是最后一个喽～_～";
                }, 800);

                scope.shouldShowInfinite = false;
            }
        };


        $scope.searchText = { value: "" };
        $scope.searchResult = [];
        $scope.searchChanged = function () {//alert("a"+$scope.searchText.value+"b")
            var value = $scope.searchText.value;
            if (value == "") {
                value = "#";
            }
            if (value != "") {
                var regexp = new RegExp(value, "i");
                var testArray = $scope.dishes;
                $scope.searchResult.splice(0, $scope.searchResult.length);
                for (var i = 0; i < $scope.dishes.length; i++) {
                    if (regexp.test(testArray[i].name)) {
                        $scope.searchResult.push({ 'index': i, 'name': testArray[i].name });
                    }
                }
            }
        };
        $scope.touchResult = function (item) {
            var index = item.index;
            var height = document.getElementById("dish0").scrollHeight - 1;
            var delegate = $ionicScrollDelegate.$getByHandle("dish-main").getScrollView();
            delegate.scrollTo(0, index * height + 36);
            $scope.searchEnd();
        };
        $scope.searchEnd = function () {
            $scope.searchResult.splice(0, $scope.searchResult.length);
            $scope.searchText.value = "";
            //var search = document.getElementById("searchForm");
            //search.reset();
        };
        $scope.onFocus = function (self) {
            //self.searchForm.searchInput.reset();
            //self.searchForm.searchInput.searchText = "";
            //alert(self);
            //console.dir(self.searchForm.searchInput.searchText);
        }
        /*
        $scope.imgLoad = function () {
            alert('a');
        };
        */
    })
    .controller('DishCtrl', function ($scope, item, DishServices, RestaurantServices) {
        //alert(item);
        $scope.restaurant = RestaurantServices.getName();//"伊清阁";
        $scope.dish = item;
        $scope.comments = DishServices.comments;
        $scope.getType = function (type) {
            return DishServices.getCategoryName(type);
        };
        $scope.show = function () {
            alert("A");
        };
        $scope.hide = function () {
            alert("B");
        };
        /*$scope.onDragRight = function(event){
            $ionicNavBarDelegate.back();
        }*/

    })
    .controller('RestaurantCtrl', function ($scope, RestaurantServices, $timeout) {
        $scope.restaurant = RestaurantServices.restaurant;
        RestaurantServices.updateRestaurant(function (data) {
            $scope.restaurant = data;
        });


        //alert(RestaurantServices.restaurant.img);
        $scope.comments = RestaurantServices.comments;
    })
    .controller('DishBtnCtrl', function ($scope, OrderServices) {
        $scope.ordersColor = "white";
        $scope.likesColor = "white";
        $scope.order = function (dish) {
            OrderServices.add(dish);
            /*if (!dish.ordered) {
                OrderServices.add(dish);
            } else {
                OrderServices.clear(dish);
            }*/
        };
        $scope.disorder = function (dish) {
            OrderServices.delete(dish);
            /*if (!dish.ordered) {
                OrderServices.add(dish);
            } else {
                OrderServices.clear(dish);
            }*/
        };
        $scope.liked = function (dish) {
            if (!dish.liked) {
                dish.likes = parseInt(dish.likes) + 1;
            } else {
                dish.likes = parseInt(dish.likes) - 1;
            }
            dish.liked = !dish.liked;
            OrderServices.like(dish, dish.liked);
        }
    })
    .controller('MenuCtrl', function ($scope) {

        $scope.menus = [
            { title: "点菜", url: "#/event/category", icon: "ion-ios-home-outline" },
            { title: "订单", url: "#/event/myorder", icon: "ion-ios-paper-outline" },
            { title: "餐厅", url: "#/event/restaurant", icon: "ion-android-restaurant" },
            //{title:"发现", url:"#/event/find", icon: "ion-ios-eye-outline"},
            //{ title: "个人", url: "#/event/personal", icon: "ion-ios-person-outline" }
        ];

        $scope.currentMenu = 0;
        $scope.menuChanged = function (index) {

            $scope.currentMenu = index;
        };
        $scope.isActived = function (index) {
            return $scope.currentMenu === index;
        }

    })
    .controller('UserCtrl', function ($scope, $state, UserServices) {
        $scope.user = UserServices.user;
        var state = $state;
        $scope.doRegister = function () {
            //注册
            var promise = UserServices.Register($scope.user.name, $scope.user.password);
            // 同步调用，获得承诺接口
            promise.then(function (data) {  // 调用承诺API获取数据 .resolve
                if (data.success == true) {
                    state.go('login', {}, { reload: false });
                }
            }, function (data) {  // 处理错误 .reject
                $scope.register_result = "注册失败，请重试！";
            });

        };
        $scope.toRegister = function () {
            //去注册
            state.go('register', {}, { reload: true });
        };
        $scope.doLogin = function () {
            //登陆
            state.go('eventmenu.personal', {}, { reload: true }); return;
            var promise = UserServices.Login($scope.user.name, $scope.user.password);
            promise.then(function (data) {  // 调用承诺API获取数据 .resolve
                if (data.success == true) {
                    state.go('eventmenu.dishes', {}, { reload: false });
                }
            }, function (data) {  // 处理错误 .reject
                $scope.login_result = "用户名或密码错误，请重试！";
            });
        };
        $scope.toLogin = function () {
            //去注册
            state.go('login', {}, { reload: true });
        };
    })
    .controller('PersonalCtrl', function ($scope, UserServices, $state, OrderServices, $ionicModal, $timeout) {
        $scope.user = UserServices.user;
        $scope.setAccount = function () {
            if (!UserServices.isRegistered()) {
                //去注册
                $state.go('register', {}, { reload: true });
            } else if (UserServices.isAutoLogin()) {
                UserServices.Login(UserServices.getUserName(), UserServices.getPassword());
            } else if (!UserServices.isLogin) {
                $state.go('login', {}, { reload: true });
            }
        };
        $scope.placedOrders = OrderServices.placedOrders;
        OrderServices.updateOrders();
        $scope.toPay = function (order) {
            $scope.payModal.show();
            $scope.currentOrder = order;
        };

        $scope.cancel = function () {
            //$scope.submitTips = "订单已提交，请尽快支付！";
            $scope.payModal.hide();
        };
        $scope.submitTitle = "去 支 付";
        $scope.payTips = "支付宝支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
        $scope.payChanged = function (type) {
            switch (type) {
                case 1: //ali pay
                    $scope.submitTitle = "去 支 付";
                    $scope.payTips = "支付宝支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
                    break;
                case 2: //uni pay
                    $scope.submitTitle = "去 支 付";
                    $scope.payTips = "微支付支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
                    break;
                case 3: //cash pay
                    $scope.submitTitle = "完 成";
                    $scope.payTips = "现金支付时，请在上菜时准备好现金，支持找零等服务！";
                    break;
            }
        };
        $scope.pay = function () {
            $scope.currentOrder.state = 1;
            $scope.payModal.hide();
            $timeout(function () {
                $scope.paySucessModal.show();
                $timeout(function () {
                    $scope.paySucessModal.hide();
                }, 3000);
            }, 400);
        };
        $ionicModal.fromTemplateUrl('template/pay.html', function (modal) {
            $scope.payModal = modal;
        }, {
                scope: $scope,
                //animation: 'fade-in'
            });
        $ionicModal.fromTemplateUrl('template/paySuccess.html', function (modal) {
            $scope.paySucessModal = modal;
        }, {
                scope: $scope,
                //animation: 'fade-in'
            });

        $scope.$on('$destroy', function () {
            $scope.payModal.remove();
            $scope.paySucessModal.remove();
        });
    })
    .controller('FindCtrl', function ($scope) {

    })
    .controller('OrderCtrl', function ($scope, OrderServices, DishServices, $ionicModal, $state, $ionicHistory, $timeout, $ionicPopup) {
        $scope.orders = OrderServices.orders;
        $scope.totalCash = 0.0;
        var updateCash = function () {
            var totalCash = 0.0;
            for (var key in OrderServices.orders) {
                totalCash += OrderServices.orders[key].price * OrderServices.orders[key].orders;
            }

            $timeout(function () {
                $scope.$apply(function () {
                    $scope.totalCash = totalCash;
                });
            }, 100);
        };
        updateCash();
        $scope.getType = function (id) {
            return DishServices.getCategoryName(id);
        };
        $scope.delete = function (order) {
            OrderServices.delete(order);
            updateCash();
        };
        $scope.add = function (order, index) {
            OrderServices.add(order, index);
            updateCash();
        };
        $scope.submitTips = "";
        $scope.submitOrder = function () {
            if (OrderServices.orders.length > 0) {

                var confirmPopup = $ionicPopup.confirm({
                    title: '确认订单',
                    template: '确定提交订单?',
                    cancelText: '否',
                    cancelType: '',
                    okText: '是',
                    okType: ''
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        OrderServices.submit(function (order) {
                            $scope.submitTips = "订单提交成功，请尽快付款！";
                            ////付款
                            $scope.currentOrder = order;
                            $scope.payModal.show();
                            $scope.submitTips = "";
                        });
                    } else {

                    }
                });
            }
        };
        $ionicModal.fromTemplateUrl('template/pay.html', function (modal) {
            $scope.payModal = modal;
        }, {
                scope: $scope,
                //animation: 'fade-in'
            });
        $scope.cancel = function () {
            $scope.submitTips = "订单已提交，请尽快支付！";
            $scope.payModal.hide();
        };
        $scope.submitTitle = "去 支 付";
        $scope.payTips = "支付宝支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
        $scope.payChanged = function (type) {
            switch (type) {
                case 1: //ali pay
                    $scope.submitTitle = "去 支 付";
                    $scope.payTips = "支付宝支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
                    break;
                case 2: //uni pay
                    $scope.submitTitle = "去 支 付";
                    $scope.payTips = "微支付支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
                    break;
                case 3: //cash pay
                    $scope.submitTitle = "完 成";
                    $scope.payTips = "现金支付时，请在上菜时准备好现金，支持找零等服务！";
                    break;
            }
        };

        $scope.pay = function () {
            $scope.submitTips = "";
            $scope.currentOrder.state = 1;
            $scope.payModal.hide();

            $timeout(function () {
                $scope.paySucessModal.show();
                $timeout(function () {
                    $scope.paySucessModal.hide();
                    $timeout(function () {
                        //$ionicHistory.goBack(-2);
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $ionicHistory.clearCache();
                        $state.go("eventmenu.category", {}, { reload: true });
                    }, 300);
                }, 3000);
            }, 400);
        };

        $ionicModal.fromTemplateUrl('template/paySuccess.html', {
            scope: $scope,
            //animation: 'fade-in'
        }).then(function (modal) {
            $scope.paySucessModal = modal;
        });

        $scope.$on('$destroy', function () {
            $scope.payModal.remove();
            $scope.paySucessModal.remove();
        });

        $scope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (fromState.name == "eventmenu.orders" && toState.name == "eventmenu.category") {
                    //$ionicHistory.clearCache();
                }
            });
    })
/*
.controller('PayCtrl', function($scope,order,OrderServices,DishServices,$ionicModal,$state,$ionicHistory,$timeout) {
    $scope.currentOrder = order;
    $scope.submitTips = "";
    $scope.submitOrder = function(){
        if(OrderServices.orders.length > 0){
            OrderServices.submit(function(){
                $scope.submitTips = "订单提交成功，请尽快付款！";
                //付款
                $scope.payModal.show();
                $scope.submitTips = "";
            });
        }
    };
    $ionicModal.fromTemplateUrl('template/pay.html', function(modal) {
        $scope.payModal = modal;
    }, {
        scope: $scope,
        //animation: 'fade-in'
    });
    $scope.cancel = function(){
        $scope.submitTips = "订单已提交，请尽快支付！";
        $scope.payModal.hide();
    };
    $scope.submitTitle = "去 支 付";
    $scope.payTips = "支付宝支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
    $scope.payChanged = function(type){
        switch(type){
            case 1: //ali pay
                $scope.submitTitle = "去 支 付";
                $scope.payTips = "支付宝支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
                break;
            case 2: //uni pay
                $scope.submitTitle = "去 支 付";
                $scope.payTips = "微支付支付时，支付成功后厨师将尽快为您上菜，并且不用任何后续操作，推荐您使用！";
                break;
            case 3: //cash pay
                $scope.submitTitle = "完 成";
                $scope.payTips = "现金支付时，请在上菜时准备好现金，支持找零等服务！";
                break;
        }
    };

    $scope.pay = function(){
        $scope.submitTips = "";
        $scope.payModal.hide();

        $timeout(function() {
            $scope.paySucessModal.show();
            $timeout(function () {
                $scope.paySucessModal.hide();
                $timeout(function() {
                    //$ionicHistory.goBack(-2);
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicHistory.clearCache();
                    $state.go("eventmenu.category",{}, {reload: true});
                },300);
            }, 3000);
        },400);
    };

    $ionicModal.fromTemplateUrl('template/paySuccess.html', {
        scope: $scope,
        //animation: 'fade-in'
    }).then(function(modal) {
        $scope.paySucessModal = modal;
    });

    $scope.$on('$destroy', function() {
        $scope.payModal.remove();
    });
})
*/
;

















