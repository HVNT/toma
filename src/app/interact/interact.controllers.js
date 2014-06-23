/**
 * Created with WebStorm.
 * User: hunt
 * Date: 6/9/14
 * Time: 8:07 PM
 * File:
 */
angular.module('thotpod.toma')
    .controller('InteractCtrl', function ($scope, $window, $state, $http, $q, Environment, Geocoder, Address) {

        $scope.activeAddress = new Address({}); // init empty activeAddress

        $scope.session = {
            geoSupport: $window.navigator
        };

        function initialize() {
            reverseGeocode();
        }

        initialize();

        function reverseGeocode() {

            window.navigator.geolocation.getCurrentPosition(function (position) {

                $scope.$apply(function () {
                    //set returned vals to active model
                    $scope.activeAddress.lat = position.coords.latitude;
                    $scope.activeAddress.lng = position.coords.longitude;
                    $scope.activeAddress.posAccuracy = position.coords.accuracy;

                    //set status
                    $scope.activeAddress.status = 'pGiven';
                });

                Geocoder.reverseGeocode(
                    {
                        latitude: $scope.activeAddress.lat,
                        longitude: $scope.activeAddress.lng
                    }).then(function (response) {
                        //set returned vals to active model
                        $scope.activeAddress.street1 = response.street1;
                        $scope.activeAddress.city = response.city;
                        $scope.activeAddress.state = response.state;
                        $scope.activeAddress.stateAbbrev = response.stateAbbrev;
                        $scope.activeAddress.zip = response.zip;
                        $scope.activeAddress.county = response.county;

                        //transform address for textarea
                        $scope.transformedAddress = $scope.activeAddress.transformAddress();

                        //set status
                        $scope.activeAddress.status = 'rGeocoded';

                        console.log($scope.activeAddress);
                    }, function (err) {
                        //status stays at pGiven
                        console.log(err);
                    });
            }, function (err) {
                //set status
                $scope.activeAddress.status = 'pDenied'; //?
                console.log(err);
            });
        }

        // list view shit
        $scope.interactHidden = false;
        $scope.toggleHiddenComps = function () {
            $scope.interactHidden = !$scope.interactHidden;
            console.log($scope.interactHidden);
        };

        $scope.confirmAddress = function () {

            //post to craigg
            $scope.activeAddress.newVisit().then(
                function (response) {
                    console.log('shits good');

                    $scope.activeAddress.getDeepCompsZillow().then(function (response) {
                        console.log(response);
                        //set status
                        $scope.activeAddress.status = 'confirmed';
                    }, function (response) {
                        console.log('fucked');
                        console.log(response);
                    });
                },
                function (response) {
                    console.log('shits fucked');
                }
            );
        };

        // details view shit
        $scope.showCompDetails = false;
        $scope.activeComp = {};

        $scope.goInteractCompDetails = function (comp) {
            $scope.activeComp = comp;
            $scope.showCompDetails = true;
            $scope.activeCompImg = $scope.activeComp.imgs[0];
        };

        $scope.selectCompImg = function (img) {
            $scope.activeCompImg = img;
        };

        $scope.goInteractList = function () {
            $scope.activeComp = {};
            $scope.showCompDetails = false;
        };

        $scope.editActiveAddress = function () {
            $scope.activeAddress.status = 'rGeocoded';
        };

    });
