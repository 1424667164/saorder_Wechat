/**
 * Created by mjl on 15/4/18.
 */
angular.module('moduleServices', ['ionic'])

    .factory('DishServices', function ($http, $q, BASE_URL, RestaurantServices, DeviceServices) {
    var dishType = 1;
    var currentIndex = 0;
    var categories = [
        //{id: 0,'name': 'AA','imgurl': 'http://mboss.net.cn/saorder/images/type001.jpg', 'description': 'BBB', orders: 0},
        //{id: 2,'name': 'AA','imgurl': 'http://192.168.1.103/saorder/images/type002.jpg', 'description': 'BBB', orders: 0},
        //{id: 1,'name': 'AA','imgurl': 'http://192.168.1.103/saorder/images/dish004.jpg', 'description': 'BBB', orders: 0},
        //{id: 3,'name': 'AA','imgurl': 'http://192.168.1.103/saorder/images/dish004.jpg', 'description': 'BBB', orders: 0},
    ];
    var dishes = [
        /*[{id: -1, name: "大盘鸡",imgurl: "http://mboss.net.cn/saorder/images/dish004.jpg",
           description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
            price: 12, ordered:0, liked:0},
         {id: -1, name: "大盘鸡1",imgurl: "http://192.168.1.103/saorder/images/dish002.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 996, type: 0,
             price: 12, ordered:0, liked:0},
        {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
            price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},{id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
            price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},{id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
            price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},{id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
            price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},{id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
            price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
            {id: -1, name: "大盘鸡2",imgurl: "http://192.168.1.103/saorder/images/dish005.jpg",
                description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
                price: 12, ordered:0, liked:0},
 
         {id: -1, name: "大盘鸡3",imgurl: "http://192.168.1.103/saorder/images/dish003.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 996, type: 0,
             price: 12, ordered:0, liked:0}
    ]*/
    ];
    var comments = [
        { 'name': 'MBoss', 'date': '1992-01-01 12:12', 'content': 'This is so cool! Just do it,OK? I love this dish, and for you lover!' },
        { 'name': 'MBoss', 'date': '1992-01-01 12:12', 'content': 'This is so cool!' }
    ];
    var maxId_ = -1;
    var ctrlUrl = "?c=dish";
    var dishUpdatting = false;
    return {
        categories: categories,
        dishes: dishes,
        comments: comments,
        getDish: function (index) {
            return dishes[currentIndex][index]
        },
        getMaxId: function () {
            return maxId_;
        },
        getLastId: function () {
            if (dishes[currentIndex].length < 1) {
                return -1;
            }
            return dishes[currentIndex][dishes[currentIndex].length - 1].id;
        },
        setType: function (type) {
            dishType = type;
        },
        getCategory: function (index) {
            return categories[index];
        },
        updateCategory: function () {
            var actonUrl = "&a=categories";//alert(BASE_URL + ctrlUrl + actonUrl + RestaurantServices.getParaUrl())
            $http.get(BASE_URL + ctrlUrl + actonUrl + RestaurantServices.getParaUrl()/*,{params: {id: maxId}}*/)
                .success(function (data, status, headers, config) {//alert("A");
                if (typeof data === "object") {
                    categories.splice(0, categories.length);
                    for (var key in data) {
                        var category = data[key];
                        category.orders = 0;
                        category.height = DeviceServices.tHeight;
                        categories.push(category);
                        dishes.push([]);
                    }
                }
            })
                .error(function (data, status, headers, config) {//alert(data)

            });
        },
        reset: function (categoryIndex) {
            currentIndex = categoryIndex;
            //dishes = [];
            //dishes.splice(0,dishes.length);
        },
        updateDishes: function () {
            if (dishUpdatting) { return; }
            dishUpdatting = true;
            var lastId = this.getLastId();
            var actionUrl = "&a=load_more_dishes";
            var paraUrl = "&type=" + dishType + "&id=" + lastId;

            var deferred = $q.defer();
            $http.get(BASE_URL + ctrlUrl + actionUrl + paraUrl + RestaurantServices.getParaUrl()/*,{params: {id: maxId}}*/)
                .success(function (data, status, headers, config) {
                if (typeof data === "object") {
                    var dish, contained;
                    for (var key in data) {
                        contained = false;
                        dish = data[key];
                        for (var element in dishes[currentIndex]) {
                            //alert(dishes[currentIndex][element].id + "  aa  " + dish.id);
                            if (dishes[currentIndex][element].id == dish.id) {
                                contained = true;
                                break;
                            }
                        }
                        if (contained) {
                            continue;
                        }
                        dish.liked = parseInt(dish.liked);
                        dish.ordered = 0;
                        dish.orders = 0;
                        dish.height = DeviceServices.dHeight;
                        dishes[currentIndex].push(dish);
                    }
                }
                dishUpdatting = false;
                deferred.resolve();
            })
                .error(function (data, status, headers, config) {//alert("b");
                dishUpdatting = false;
                deferred.reject();
            });
            return deferred.promise;
        },
        updateMaxId: function () {
            var actionUrl = "&a=getMaxId";
            var paraUrl = "&type=" + dishType;
            $http.get(BASE_URL + ctrlUrl + actionUrl + paraUrl + RestaurantServices.getParaUrl())
                .success(function (data, status, headers, config) {//alert(data[0].maxid);
                if (data[0].maxid != undefined) {
                    maxId_ = parseInt(data[0].maxid);
                }
            }).error(function (error) {
                //alert("cuowu");
            });
        },
        getCategoryName: function (id) {
            for (var key in categories) {
                if (categories[key].id == id) {
                    return categories[key].name;
                }
            }
        },
        resetCurrentDishes: function(){
            dishes[currentIndex].splice(0,dishes[currentIndex].length);
        }
    }
})
    .factory('RestaurantServices', function ($http, BASE_URL) {
    var paraUrlCtrl = "?c=restaurant";
    var paraUrl = "&restaurant_id=0";
    var restaurant_id = 0;
    var desk_id = -1;
    var name = "伊清阁";
    var restaurant = {
        "id": "0",
        "adminname": "admin",
        "adminpwd": "admin",
        "name": "伊清阁",
        "type": "0",
        "address": "上海市同济大学",
        "poslat": "102", "poslong": "32",
        "email": "mjl1424667164@163.com", "phone": "18221799201",
        "recommend": "清汤丽水最好吃",
        "description": "伊清阁，是上海著名的伊斯兰风格餐厅，食品"
    };
    var comments = [
        { 'name': 'MBoss', 'date': '1992-01-01 12:12', 'content': 'This is so cool! Just do it,OK? I love this dish, and for you lover!' },
        { 'name': 'MBoss', 'date': '1992-01-01 12:12', 'content': 'This is so cool!' }
    ];
    return {
        restaurant: restaurant,
        restaurantId: restaurant_id,
        deskId: desk_id,
        comments: comments,
        paraUrl: paraUrl,
        set: function (para) {
            var obj = eval('(' + para + ')');
            if (obj.restaurant_id != undefined && obj.desk_id != undefined) {
                restaurant_id = parseInt(obj.restaurant_id);
                desk_id = parseInt(obj.desk_id);
                name = obj.name;
                restaurant.id = obj.rid;
                restaurant.name = obj.name;

                paraUrl = "&restaurant_id=" + restaurant_id;
                // + "&desk_id=" + desk_id;
            }
        },
        getParaUrl: function () {
            return paraUrl;
        },
        getName: function () {
            return restaurant.name;
        },
        getRid: function () {
            return restaurant_id;
        },
        getDid: function () {
            return desk_id;
        },
        getRestaurant: function () {
            return restaurant;
        },
        updateRestaurant: function (callback) {
            var paraUrlAction = "&a=restaurant";
            var paraUrl = "&id=" + restaurant_id;//alert(BASE_URL + paraUrlCtrl + paraUrlAction + paraUrl)
            $http.get(BASE_URL + paraUrlCtrl + paraUrlAction + paraUrl)
                .success(function (data, status, headers, config) {
                //restaurant['img'] = "aa";
                if (data != undefined) {
                    //callback(data);
                    //restaurant = data;
                    for (var key in data) {
                        restaurant[key] = data[key];//alert(data[key]);
                        //alert(key+" "+data[key]);
                    }
                }

            }).
                error(function (data, status, headers, config) {//alert("b");
            });
        }
    }
})
    .factory('UserServices', function ($http, $q, BASE_URL) {
    var user_ = {
        id: 0,
        name: '～_～',
        username: '～～',
        password: '',
        email: '',
        headimg: 'img/ionic.png',
        description: '',
        openid: '',
        nickname: '',
        headimgurl: ''
    };
    var paraUrlCtrl = "?c=user";
    //var isLogin_ = false;
    return {
        user: user_,
        /*
        isLogin: isLogin_,
        isAutoLogin: function(){
            var autologin = window.localStorage['autologin'];
            return angular.fromJson(autologin) == true;
        },
        setAutoLogin: function(isAuto){
            window.localStorage['autologin'] = angular.toJson(isAuto);
        },
        isRegistered: function(){
            var username = window.localStorage['username'];
            return username != undefined;
        },
        setRegistered: function(userName){
            window.localStorage['username'] = angular.toJson(userName);
        },
        getUserName: function(){
            var username = window.localStorage['username'];
            return angular.fromJson(username);
        },
        getPassword: function(){
            var password = window.localStorage['password'];
            return angular.fromJson(password);
        },
        setPassword: function(password){
            window.localStorage['password'] = angular.toJson(password);
        },
        */
        Register: function(){
            //注册新用户
            //http 操作 http://192.168.1.103/saorder_serve/index.php?c=user&a=register
            var requestData = user_;
            var paraUrlAction = "&a=register_w";

            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http.post(BASE_URL + paraUrlCtrl + paraUrlAction,
                requestData, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                })
            .success(function(data, status, headers, config) {//alert(data.data);
                if(data.success == true) {
                    deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                    //window.localStorage['username'] = angular.toJson(username);
                }else{
                    deferred.reject(data);   // 声明执行失败，即服务器返回错误
                }
            }).
            error(function(data, status, headers, config) {
                deferred.reject(data);   // 声明执行失败，即服务器返回错误
            });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        /*
        Login: function(username,password){
            //login
            //http 操作
            var password_ = hex_md5(password);
            isLogin_ = true;
            return isLogin_;
        },
        
        getUser: function(openid){
            var paraUrlAction = "&a=getuser";
            var paraUrl = "&openid="+openid;
            var deferred = $q.defer();
            $http.get(BASE_URL + paraUrlCtrl + paraUrlAction + paraUrl)
                .success(function (data, status, headers, config) {
                    // 声明执行成功，即http请求数据成功，可以返回数据了
                    if(data.isfind == true) {
                        deferred.resolve(data.data);
                    }else{
                        deferred.reject(data);
                    }
                }).
                error(function (data, status, headers, config) {alert("e");
                    deferred.reject(data);
                });
            return deferred.promise;
        },*/
        setUser: function () {
            var udata = angular.fromJson(window.localStorage.user);
            user_.openid = udata.openid;
            user_.nickname = udata.nickname;
            user_.headimgurl = udata.headimgurl;
            //Register();
        }
    }
})
    .factory('AdServices', function (DeviceServices) {
    var ads = [
        { name: "北京烤鸭", description: "周末打折，半价优惠", img: "http://mboss.net.cn/saorder/images/dishes/dish006.jpg", url: "", height: DeviceServices.aHeight },
        { name: "蛋炒饭", description: "周末打折，半价优惠", img: "http://mboss.net.cn/saorder/images/dishes/dish005.jpg", url: "", height: DeviceServices.aHeight },
        { name: "兰州拉面", description: "周末打折，半价优惠", img: "http://mboss.net.cn/saorder/images/dishes/dish003.jpg", url: "", height: DeviceServices.aHeight }
    ];
    return {
        ads: ads,
        getAd: function (index) {
            return ads[index]
        },
        updateAds: function ($http) {
            $http.get("http://192.168.1.103/saorder_serve/index.php?a=dishes")
                .success(function (data, status, headers, config) {
                for (var key in data) {
                    dish = data[key];
                    dishes.push(dish);
                }
            }).error(function (error) {
                //alert("cuowu");
            })
        }
    }
})
    .factory('OrderServices', function (DishServices, $http, BASE_URL, RestaurantServices, UserServices, $ionicPopup) {
    //var paraUrlCtrl = "?c=dish";
    var ctrlUrl = "?c=order";
    var orders = [
        /*{id: -1, name: "大盘鸡",imgurl: "http://mboss.net.cn/saorder/images/dish004.jpg",
            description: "鲜甜可口", detail: "GGG", likes: 3, comments: 4, orders: 6, type: 0,
            price: 12, ordered:false, liked:0}
         */
    ];
    var placedOrders = [
        { id: 0, state: 0, date: '1220-22-22 10:22:22' }
    ];
    var categories = DishServices.categories;
    var updateCategory = function (id_, diff) {
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].id == id_) {
                categories[i].orders += diff;
                return;
            }
        }
    };
    var clearAll = function () {
        var index = 0;
        while (index < orders.length) {
            var dish = orders[index];
            dish.ordered = 0;
            updateCategory(dish.type, -dish.orders);
            dish.orders = 0;
            index++;
        }
        orders.splice(0, orders.length);
    };
    
    return {
        orders: orders,
        placedOrders: placedOrders,
        updateOrders: function(){
            var actonUrl = "&a=orders";
            $http.get(BASE_URL + ctrlUrl + actonUrl + "&uid=" + UserServices.user.id + "&rid=" + RestaurantServices.getRid())
                .success(function (data, status, headers, config) {//alert("A");
                if (typeof data === "object") {
                    placedOrders.splice(0, placedOrders.length);
                    for (var key in data) {
                        var order = data[key];
                        order.orders = 0;
                        placedOrders.push(order);
                    }
                }
            })
            .error(function (data, status, headers, config) {//alert("data")

            });
        },
        add: function (dish, index) {
            //orders.push(dish);
            if (orders.indexOf(dish) < 0) {
                orders.splice(index, 0, dish);
            }

            dish.ordered++;
            dish.orders = parseInt(dish.orders) + 1;
            updateCategory(dish.type, 1);
        },
        delete: function (dish) {
            var index = orders.indexOf(dish);
            if (index > -1) {
                orders.splice(index, 1);
                dish.ordered--;
                dish.orders = parseInt(dish.orders) - 1;
                updateCategory(dish.type, -1);
            }
        },
        clear: function (dish) {
            var index = orders.indexOf(dish);
            while (index > -1) {
                orders.splice(index, 1);
                dish.ordered--;
                dish.orders = parseInt(dish.orders) - 1;
                updateCategory(dish.type, -1);
                index = orders.indexOf(dish);
            }
        },
        submit: function (callback) {
            var requestData = {
                'orders': [],
                'uid': UserServices.user.id,
                'rid': RestaurantServices.getRid(),
                'did': RestaurantServices.getDid()
            };
            for (var key in orders) {
                for (var i = 0; i < orders[key].orders; i++) {
                    requestData.orders.push(orders[key].id);
                }
            }
            var paraUrlAction = "&a=place";

            $http.post(BASE_URL + ctrlUrl + paraUrlAction,
                requestData, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                })
                .success(function (data, status, headers, config) {
                if (data.result) {
                    var order = { 'id': data.id, 'state': 0, 'date': (new Date()).Format('yyyy-MM-dd hh:mm:ss') };
                    placedOrders.push(order);
                    clearAll();
                    callback(order);
                }
            }).
                error(function (data, status, headers, config) {
                $ionicPopup.alert({ title: "订单提交", template: "发生错误，请重试！" });
            });
        },
        like: function (dish, isLiked) {
            var requestData = {
                'uid': UserServices.user.id,
                'id': dish.id,
                'liked': isLiked
            };
            var paraUrlAction = "&a=like";

            $http.post(BASE_URL + paraUrlCtrl + paraUrlAction,
                requestData, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                })
                .success(function (data, status, headers, config) {
            }).
                error(function (data, status, headers, config) {
            });
        }
    }
})
.factory('DeviceServices',function(){
      return{
          width: 0,
          dHeight: 0,
          tHeight: 0,
          aHeight: 0,
          calcH: function(){
              this.dHeight = (this.width - 20) * 540/960;
              this.tHeight = (this.width - 20) * 360/960;
              this.aHeight = (this.width) * 560/960;
          }
      }
})
;