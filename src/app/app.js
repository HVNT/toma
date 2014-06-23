/**
 * Created with JetBrains WebStorm.
 * User: hvnt
 * Date: 5/13/14
 * Time: 9:43 AM
 * File:
 */

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {
};
angular.module('thotpod.toma',
    [
        'ui.router',
        'ui.utils',
        'ui.bootstrap',
        'ngAnimate',
        'chieffancypants.loadingBar',
        'thotpod.config',
        'thotpod.core'
    ])
    .config(function ($httpProvider, $locationProvider, $urlRouterProvider, $stateProvider, cfpLoadingBarProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common = {
            'Content-Type': 'application/json'
        };
        $locationProvider.html5Mode(true);
        cfpLoadingBarProvider.includeSpinner = false;

        $urlRouterProvider
            .when('', '/interact')
            .when('/', '/interact');
    })
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.rootState = {
            loading: false,
            loaded: false,
            failured: false
        };

        // my zillow ID @ global l0l
        Z_ID = 'X1-ZWz1duf5uhpcln_6sext';

        $rootScope.alert = null;
        $rootScope.setAlert = function (alert) {
            $rootScope.alert = alert;
        };
        $rootScope.clearAlert = function () {
            $rootScope.alert = null;
        };

        $rootScope.isRootLoading = function () {
            return $rootScope.rootState.loading;
        };

        $rootScope.isRootLoaded = function () {
            return $rootScope.rootState.loaded;
        };

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var toStateRoot = toState.name.split('.')[0],
                fromStateRoot = fromState.name.split('.')[0];

            if (toStateRoot !== fromStateRoot) {
                $rootScope.rootState.loading = true;
                $rootScope.rootState.loaded = false;
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.rootState.loading = false;
            $rootScope.rootState.loaded = true;
        });
    })
    .controller('AppCtrl',
    function ($scope, $modal) {
        $scope.openFeedbackModal = function () {
            $modal.open({
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                dialogFade: true,
                backdropFade: true,
                templateUrl: '/app/interact/templates/interact.modal.html?v=' + Date.now().feedback,
                controller: 'InteractModalCtrl'
            });
        };
    })
    .controller('InteractModalCtrl',
        function ($scope, $http, $modalInstance, $timeout, Environment, User) {

            $scope.close = function () {
                $modalInstance.close();
            };
        });
