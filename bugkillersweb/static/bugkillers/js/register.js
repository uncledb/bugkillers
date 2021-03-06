/**
 * Created by dongbin on 2015/6/29.
 * 注册界面js 采用AngularJs框架编写
 */

/**
 * 声明angular模型
 * @type {*|module}
 */
var register = angular.module('register', ['ngRoute']);

/**
 * 顶级作用域
 */
register.run(function ($rootScope) {
    //$rootScope.root = {name: 'test'};
});

/**
 * 注册Service 可以在该module下任何controller中使用
 * Controllers
 */
register.factory('Url', function () {//Url服务来管理Url
    return {
        registerUrl: '/bugkillers/testform/', //http://host:port/user/regist
        backUrl: '/bugkillers/index/' //回到点击注册页的页面
    }
}).controller('registerController', function ($scope, $http, $timeout, Url) {//注册的控制器
        $scope.tabshow = ['active', 'none', 'none'];
        $scope.stepshow = [true, false, false];
        $scope.registerUrl = Url.registerUrl;
        $scope.code = '';//ret为false时有效
        $scope.msg = '';//信息
        $scope.ret = '';//是否成功

        var vm = $scope.vm = {
            show_error: false,
            user: {
                repass: '',
                password: ''
            }
        };
        vm.submit = function (myform) {
            vm.show_error = true;
            myform.$setDirty();
            if (myform.$valid) {
                $http.post(Url.registerUrl, $scope.vm.user)//提交注册
                    .success(function (returndata) {
                        $scope.ret = returndata.ret;
                        $scope.code = returndata.code;
                        $scope.msg = returndata.msg;
                        if (returndata.ret) {
                            //跳到第二步
                            $scope.setTab(2);
                        }
                    });
            }
        };
        $scope.setTab = function (tabnum) {
            $scope.tabshow = [];
            $scope.tabshow[tabnum - 1] = 'active';
            $scope.stepshow = [];
            $scope.stepshow[tabnum - 1] = true;
        };
        //跳转到第三页
        $scope.seconds = 5;//页面自动跳转倒计
        $scope.goToStep3 = function () {
            $scope.setTab(3);
            $scope.timeCount($scope.seconds)
        };
        $scope.timer = null;
        $scope.timeCount = function (seconds) {
            //当timeout被定义时，它返回一个promise对象
            $scope.timer = $timeout(
                $scope.timeReduce, 1000
            );
        };
        $scope.timeReduce = function () {
            $scope.seconds = $scope.seconds - 1;
            if ($scope.seconds != 0) {
                $scope.timeCount($scope.seconds)
            } else {
                if ($scope.timer) {
                    $timeout.cancel($scope.timer);
                }
                $scope.goBackToMainPage();
            }
        };
        //注册完成 跳转到之前的页面
        $scope.goBackToMainPage = function () {
            location.href = Url.backUrl;
        }
    }
)
;

/**
 * 验证两次密码是否一致的自定义标签
 */
register.directive("repeat", [function () {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            if (ctrl) {
                var otherInput = element.inheritedData("$formController")[attrs.repeat];

                var repeatValidator = function (value) {
                    var validity = value === otherInput.$viewValue;
                    ctrl.$setValidity("repeat", validity);
                    return validity ? value : undefined;
                };
                ctrl.$parsers.push(repeatValidator);
                ctrl.$formatters.push(repeatValidator);

                otherInput.$parsers.push(function (value) {
                    ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                    return value;
                });
            }
        }
    };
}]);


