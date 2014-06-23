/**
 * Created with WebStorm.
 * User: hunt
 * Date: 6/9/14
 * Time: 8:06 PM
 * File:
 */
/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 3:00 PM
 * File:
 */

angular.module('thotpod.toma')
    .config(function ($stateProvider, $tooltipProvider, $urlRouterProvider) {
        $tooltipProvider.options({
            appendToBody: true
        });

        $tooltipProvider.setTriggers({
            'mouseover': 'click mouseleave',
            'mouseenter': 'mouseleave'
        });

        $urlRouterProvider
            .when('/interact/', '/interact');

        $stateProvider
            .state('interact', {
                templateUrl: '/app/interact/views/interact.html',
                url: '/interact',
                controller: 'InteractCtrl'
            });

    });
