'use strict';

angular.module('findareviewedcarApp', ['ui.router','ngResource','ngDialog','ngTable','angularUtils.directives.dirPagination'])

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                     //   controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the submitareview page
            .state('app.submitareview', {
                url:'submitareview',
                views: {
                    'content@': {
                        templateUrl : 'views/submitareview.html',
                        controller  : 'ReviewController'                  
                    }
                }
            })
        // route for the listallreviews page
            .state('app.listallreviews', {
                url:'listallreviews',
                views: {
                    'content@': {
                        templateUrl : 'views/listallreviews.html',
                        controller  : 'ListReviewsController'                  
                    }
                }
            })
        // route for review details
        .state('app.reviewdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/reviewdetails.html',
                        controller  : 'ReviewDetailsController'
                   }
                }
            });
        
        $urlRouterProvider.otherwise('/');
    })
;
