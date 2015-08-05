// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','moduleServices', 'moduleController',
    'moduleDirective'/*,'remoteValidation','me-lazyimg'*/]);

//app.constant('BASE_URL',"http://192.168.1.103/saorder_server/");
app.constant('BASE_URL',"http://192.168.1.103/saorder_serve/index.php");
//app.constant('BASE_URL',"http://mboss.net.cn/saorder_serve/index.php");
/************************
    配置
 ***********************/

app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$ionicConfigProvider)
{
    $httpProvider.defaults.withCredentials = true;
  $stateProvider.state('eventmenu', {
    url: '/event',
    abstract: true,
    templateUrl: 'template/event-menu.html'
  })
  .state('eventmenu.category',{
      url: '/category',
      views: {
          mainView: {
              //template:'<ion-view><ion-content><p class="sss">思源黑体Light 龙飞凤舞 中国文字之美</p></ion-content></ion-view>',
              templateUrl: 'template/category.html',
              controller: 'CategoryCtrl'
          }
      }
  })
  .state('eventmenu.dishes', {
        url: '/dishes:id',
        views: {
          mainView: {
            templateUrl: 'template/dishes.html',
            controller: 'DishesCtrl'
          }
        },
        resolve: {
            categoryIndex: function($stateParams, DishServices){
                var id = $stateParams.id;
                var index = parseInt(id.substring(id.indexOf(":") + 2,id.indexOf("}")));
                //alert(index);
                return index;
            }
        }
      })
  .state('eventmenu.restaurant', {
        url: '/restaurant',
        views: {
          mainView: {
            templateUrl: 'template/restaurant.html',
            controller: 'RestaurantCtrl'
          }
        }
      })
  .state('eventmenu.find', {
      url: '/find',
      views: {
          mainView: {
              templateUrl: 'template/find.html',
              controller: 'FindCtrl'
          }
      }
  })
  /*.state('eventmenu.personal', {
      url: '/personal',
      views: {
          mainView: {
              templateUrl: 'template/personal.html',
              controller: 'PersonalCtrl'
          }
      }
  })*/
  .state('eventmenu.myorder', {
      url: '/myorder',
      views: {
          mainView: {
              templateUrl: 'template/personal_orders.html',
              controller: 'PersonalCtrl'
          }
      }
  })
  .state('eventmenu.detail',{
        url:'/detail:id',
        views: {
          mainView: {
            templateUrl: 'template/detail.html',
            controller: 'DishCtrl'
          }
        },
        resolve: {
          item: function($stateParams, DishServices){
            var id = $stateParams.id;
            var index = parseInt(id.substring(id.indexOf(":") + 2,id.indexOf("}")));

            return DishServices.getDish(index);
          }
        }
      })
  .state('eventmenu.orders',{
      url:'/orders',
      views: {
          mainView: {
              templateUrl: 'template/orders.html',
              controller: 'OrderCtrl'
          }
      }
  })
  ;

  $stateProvider.state('default', {
    url: '/default',
    templateUrl: 'template/default.html'
    //controller: 'DefaultCtrl'
      })
  .state('register',{
    url: '/register',
    templateUrl: 'template/register.html'
  })
  .state('login',{
      url: '/login',
      templateUrl: 'template/login.html'
  });


  $urlRouterProvider.otherwise('/default');

    //$rootScopeProvider.baseUrl = ";
});

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

app.run(function($templateCache,$cacheFactory) {
    $templateCache.removeAll();
    $cacheFactory('cache',{capacity:0});
    //alert("a");
});
/*.run(function($ionicPlatform,$cordovaBarcodeScanner,$rootScope) {
  $ionicPlatform.ready(function() {

      // QR_CODE扫描
      $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {

              $rootScope.$broadcast("scanSuccess");
              if(barcodeData.cancelled == 0 && barcodeData.format === "QR_CODE") {
                  //alert(barcodeData.text);
                  //$rootScope.$broadcast("scanSuccess");
              }
          }, function(error) {
              // An error occurred
              $rootScope.$broadcast("scanSuccess", "ERR");
          });

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
          StatusBar.styleDefault();
      }

  });
});*/

/*
var INTEGER_REGEXP = /^1[3|4|5|8][0-9]\d{8}$/;
 app.directive('phone', function() {
     return {
         require: 'ngModel',
         link: function (scope, elm, attrs, ctrl) {
             ctrl.$validators.phone = function (modelValue, viewValue) {
                 if (ctrl.$isEmpty(modelValue)) {
                     // consider empty models to be valid
                     return true;
                 }
                 if (INTEGER_REGEXP.test(viewValue)) {
                     // it is valid
                     return true;
                 }
                 // it is invalid
                 return false;
             };
         }
     };
 });
*/


