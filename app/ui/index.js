var blog = angular.module("blog", []);

blog.controller("mainController", function ($scope, $http) {
    $scope.formData = {};
    console.log(sessionStorage.getItem('currentUserName'));
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/1.0/users',
        data: {
            loginUserId: sessionStorage.getItem('currentUserId')
        }
    }).then(function (data) {
        $scope.users = data.data;
    }, function (error) {
        console.log('Error: ' + error);
    });
});

blog.controller('loginController', function ($scope, $http, $window) {

    $scope.postdata = function () {

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/1.0/auth',
            data: {email: $scope.email, password: $scope.password}
        }).then(function (data) {
            if (data.data) {
                $scope.msg = "Post Data Submitted Successfully!"
                sessionStorage.setItem('currentUserId', data.data._id);
                sessionStorage.setItem('currentUserName', data.data.name);
                $window.location = "index.html"
            }

        }, function (error) {
            console.log('Error: ' + error);
        });

    };

});

blog.controller('registrationController', function ($scope, $http, $window) {

    $scope.postdata = function () {

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/1.0/users',
            data: {name: $scope.name, email: $scope.email, password: $scope.password}
        }).then(function (data) {
            if (data.data) {
                $scope.msg = "Post Data Submitted Successfully!"
                console.log(data.data);
            }
            $window.location = "login.html"
        }, function (error) {
            console.log('Error: ' + error);
        });

    };

});
