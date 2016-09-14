'use strict';

angular.module('findareviewedcarApp')


.controller('ContactController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

    $scope.sendFeedback = function () {


        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
        } else {
            $scope.invalidChannelSelection = false;
            feedbackFactory.save($scope.feedback);
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
        }
    };
}])

.controller('ReviewController', ['$scope', '$state', '$stateParams', 'reviewFactory', 'AuthFactory', function ($scope, $state, $stateParams, reviewFactory, AuthFactory) {
    console.log("in reviewcontroller");
    $scope.myreview = {};
    //$scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.myreview = {
        rating: 5,
        zip: "",
        make: "",
        model: ""
    };
    console.log("in submitreview controller");
     $scope.myreview.username = AuthFactory.getUsername();
    console.log("submitreviewcontroller username="+ $scope.myreview.username);
    $scope.showMenu = true;
    if ($scope.myreview.username === "" ) {
        $scope.showMenu = false ;
        console.log("dont show menu")
    };
    
    $scope.submitReview = function () {
        console.log("in submitReview" + $scope.myreview.zip + "was zip displayed?");
        reviewFactory.save($scope.myreview);

        $state.go($state.current, {}, {reload: true});
        
        //$scope.reviewForm.$setPristine();

        $scope.myreview = {
            rating: 5,
            zip: "",
            make: "",
            model: ""
        };
    }
}])

.controller('ListReviewsController', ['$scope', 'NgTableParams', 'listReviewsFactory', function ($scope, NgTableParams, listReviewsFactory) {
    
    console.log("in listreviewcontroller");
    $scope.reviews = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    
    listReviewsFactory.query()
    .$promise.then(function(response, status) {
        $scope.reviews=response;

        console.log("reviews=" + $scope.reviews.length);
        
        $scope.sort = function(keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };
        
    },function(){console.log("in here")}
    );

}])

.controller('ReviewDetailsController', ['$scope', '$state', '$stateParams', 'reviewDetailsFactory', function ($scope, $state, $stateParams, reviewDetailsFactory) {
    
    console.log("in reviewdetailscontroller");

    $scope.review = {};
    $scope.filterText = '';
    $scope.showReview = false;
    $scope.message = "Loading review...";

    $scope.review = reviewDetailsFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.review = response;
                $scope.showReview = true;
                console.log("make= " + $scope.review.make);
                if ($scope.review.rating === 1) {
                    $scope.filterText = "Kepp Clear";
                } else if ($scope.review.rating === 2) {
                    $scope.filterText = "Needs some work";
                } else if ($scope.review.rating === 3) {
                    $scope.filterText = "Not too bad";
                } else if ($scope.review.rating === 4) {
                    $scope.filterText = "Pretty decent"; 
                } else {
                    $scope.filterText = "Pebble Beach";
                }
            },
            function (response) {
                $scope.message = "Error in reviewis: " + response.status + " " + response.statusText;
            }
        );

}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;