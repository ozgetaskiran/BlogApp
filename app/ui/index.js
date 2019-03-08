var blog = angular.module("blog", []);

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
                $window.location = "home.html"
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
            }
            $window.location = "login.html"
        }, function (error) {
            console.log('Error: ' + error);
        });
    };
});


blog.controller("myPostsController", function ($scope, $http) {
    $scope.formData = {};
    const publisherId = sessionStorage.getItem('currentUserId');
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/1.0/users/' + publisherId + '/posts'
    }).then(function (data) {
        $scope.posts = data.data;
    }, function (error) {
        console.log('Error: ' + error);
    });
});


blog.controller("followeePostsController", function ($scope, $http) {
    $scope.formData = {};
    const userId = sessionStorage.getItem('currentUserId')
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/1.0/users/' + userId + '/followees/-/posts'
    }).then(function (data) {
        $scope.posts = data.data;
    }, function (error) {
        console.log('Error: ' + error);
    });
});

blog.controller('newPostController', function ($scope, $http, $window) {

    $scope.postdata = function () {

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/1.0/posts',
            data: {
                title: $scope.title,
                text: $scope.text,
                publisherId: sessionStorage.getItem('currentUserId'),
                publisherName: sessionStorage.getItem('currentUserName'),
                private: $scope.private
            }
        }).then(function (data) {
            if (data.data) {
                $scope.msg = "Post Data Submitted Successfully!"
                $window.location = "myposts.html"
            }

        }, function (error) {
            console.log('Error: ' + error);
        });

    };

});


blog.controller("followeesController", function ($scope, $http, $window) {
    $scope.formData = {};
    const userId = sessionStorage.getItem('currentUserId');
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/1.0/users/' + userId + '/followees'
    }).then(function (data) {
        $scope.followees = data.data;
    }, function (error) {
        console.log('Error: ' + error);
    });

    $scope.unfollow = function (followeeId) {
        const userId = sessionStorage.getItem('currentUserId')
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/api/1.0/users/' + userId + '/followees/' + followeeId
        }).then(function (data) {
            $window.location = "followees.html";
        }, function (error) {
            console.log('Error: ' + error);
        });
    };
});

blog.controller("suggestionController", function ($scope, $http, $window) {
    $scope.formData = {};
    const userId = sessionStorage.getItem('currentUserId');
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/1.0/users/' + userId + '/suggestions'
    }).then(function (data) {
        $scope.suggestions = data.data;
    }, function (error) {
        console.log('Error: ' + error);
    });

    $scope.follow = function (followeeId) {
        const userId = sessionStorage.getItem('currentUserId')
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/api/1.0/users/' + userId + '/followees',
            data: {followeeId: followeeId}
        }).then(function (data) {
            $window.location = "followees.html";
        }, function (error) {
            console.log('Error: ' + error);
        });

    };
});

