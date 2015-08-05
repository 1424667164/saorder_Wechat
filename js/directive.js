/**
 * Created by mjl on 15/4/22.
 */
//var directive = angular.module('moduleDirective', ['ionic']);
var directive = angular.module('moduleDirective',['ionic']);

var INTEGER_REGEXP = /^1[3|4|5|8][0-9]\d{8}$/;

directive.directive('phone', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.phone = function(modelValue, viewValue) {
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

directive.directive('userUnique', function($http,BASE_URL) {
    var toId;
    var paraUrlCtrl = "?c=user";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.ngModel,function(value){
                var paraUrlAction = "&a=registered";
                var paraUrl = "&username="+value;

                if(toId) clearTimeout(toId);
                toId = setTimeout(function() {
                    $http.get(BASE_URL + paraUrlCtrl + paraUrlAction + paraUrl)
                        .success(function (data, status, headers, config) {
                            // 声明执行成功，即http请求数据成功，可以返回数据了
                            //data = Boolean(data);
                            if(data.unique == false){
                                ctrl.$setValidity('userUnique', false);
                            }else{
                                ctrl.$setValidity('userUnique', true);
                            }
                        }).
                        error(function (data, status, headers, config) {
                            ctrl.$setValidity('userUnique', false);
                        });
                },200);
            });
            /*elm.bind('keyup', function(viewValue) {
                var paraUrlAction = "&a=registered";
                var paraUrl = "&username="+viewValue;
                $http.get(BASE_URL + paraUrlCtrl + paraUrlAction + paraUrl)
                    .success(function(data, status, headers, config) {
                        // 声明执行成功，即http请求数据成功，可以返回数据了
                        if(data == true) {
                            ctrl.$setValidity('name',true);
                        }else{
                            ctrl.$setValidity('name',false);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        ctrl.$setValidity('name',false);
                    });
            });*/
        }
    }
});

directive.directive('calcHeight', function() {
    return {
        link: function(scope, elm, attrs, ctrl) {
            scope.$watch(attrs,function(){
                var element = elm[0];
                var actualTop = element.getPositionInParent();
                    /*current = element.offsetParent; // 取得元素的offsetParent
// 一直循环直到根元素
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }*/
                alert(actualTop);
               /* for(key in elm[0]) {
                    alert(key + "   " + elm[0][key]);
                }*/
            })
        }
    };
});

directive.directive('imgLazy', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
            elm.bind('load', function(){
                elm.css({
                    'opacity': 1,
                    '-webkit-transition': 'all 0.5s',
                    'transition': 'all 0.5s'
                });
            });
            scope.$on('$destroy', function(){
                elm.unbind('load');
            });
        }
    };
});