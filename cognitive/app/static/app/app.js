"use strict";
var cognitive = angular.module("cognitive",['ui.router', 'ui.bootstrap', 'ngStorage']);

cognitive.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("index");
    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: "/",
            views: {
                main: {templateUrl: "/static/app/partial/home/main.html"}
            }
        }).state('whiteboard', {
            url: "/whiteboard",
            templateUrl: "/",
            views: {
                "main": {templateUrl: "/static/app/partial/whiteboard/main.html"},
            }
        }).state('whiteboard.experiment', {
            url: "/experiment",
            templateUrl: "/",
            views: {
                "whiteboard_content": {templateUrl: "/static/app/partial/whiteboard/experiment/main.html"},
            }
        }).state('whiteboard.setting', {
            url: "/setting",
            templateUrl: "/",
            views: {
                "whiteboard_content": {templateUrl: "/static/app/partial/whiteboard/setting/main.html"},
            }
        }).state('whiteboard.user_setting', {
            url: "/user_setting",
            templateUrl: "/",
            views: {
                "whiteboard_content": {templateUrl: "/static/app/partial/whiteboard/user_setting/main.html"},
            }
        }).state('whiteboard.workspace_manager', {
            url: "/workspace_manager",
            templateUrl: "/",
            views: {
                "whiteboard_content": {templateUrl: "/static/app/partial/whiteboard/workspace_manager/main.html"},
            }
        });
});

cognitive.controller('CognitiveController', function($scope, $http, $sessionStorage){
    $scope.user = $sessionStorage.$default({
        id: -1,
        name: "",
        token: ""
    });

    $scope.isAuthenticated = function () {
        var user = $scope.user;
        return user.id !== -1 && user.name !== "" && user.token !== "";
    }

});

cognitive.controller('CognitiveHeaderController', function($scope, $http, $sessionStorage, $state, $modal){
    $scope.openLoginModal = function () {
        var login_modal = $modal.open({
            animation: true,
            templateUrl: '/static/app/partial/login_modal.html',
            controller: 'CognitiveLoginModalController',
            windowClass: 'login-modal-window',
            resolve: {}
        });
        login_modal.opened.then(function () {
           if ($.browser.webkit) {
              $('input[name="password"]').attr('autocomplete', 'off');
            }
        });

        login_modal.result.then(function (result) {
            console.log(result)

            if (result.status === "success") {
                console.log("tst")
                $scope.user.id = result.user.id;
                $scope.user.name = result.user.name;
                $scope.user.token = result.user.token;
                console.log($scope.user)
                $state.go("whiteboard.experiment");
            }
        });
    };
});

cognitive.controller('CognitiveLoginModalController', function ($scope, $http, $state, $modalInstance) {
    $scope.loginForm = {
        username_or_email: "",
        password: ""
    }

    $scope.registerForm = {
        username: "",
        email: "",
        password: ""
    }

    $scope.login = function (username_or_email, password) {
        $http.get("/api/v1/users/login?username_or_email=" + username_or_email + "&password=" + password)
            .success(function (data, status, headers, config) {
                if (data.status !== "success") {
                    // some error suggestion
                    return;
                }
                $modalInstance.close({
                    status: "success",
                    user: {
                        id: data.id, name: data.username, token: data.token
                    }
                });
        })
    }

    $scope.register = function (username, email, password) {
        $http.post("/api/v1/users/", {username: username, email: email, password:password})
            .success(function (data, status, headers, config) {
                console.log(data)
                if (data.status !== "success") {
                    // some error suggestion
                    return;
                }
                $modalInstance.close({
                    status: "success",
                    user: {
                        id: data.id, name: data.username, token: data.token
                    }
                });
        })
    }
})


cognitive.controller('CognitiveContentController', function($scope){

});