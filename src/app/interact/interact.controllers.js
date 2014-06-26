/**
 * Created with WebStorm.
 * User: hunt
 * Date: 6/9/14
 * Time: 8:07 PM
 * File:
 */
angular.module('thotpod.toma')
    .controller('InteractCtrl', function ($scope, $window, $state, $http, $q, Environment, Geocoder, Address, $modal) {
        //vars
        $scope.title = {
            confirmLead: 'Click allow to see how much your neighbor\'s home sold for!',
            confirmAxn: 'Click here',
            correctLead: 'Our system returned ',
            correctEnd: ' as your address.',
            correctAxn: 'Did we get your address right?'
        };

        $scope.showingEditGeoAddress = false;
        $scope.toggleEditGeoAddress = function () {
            $scope.showingEditGeoAddress = !$scope.showingEditGeoAddress;
        };

        //begin
        initialize();

        function initialize() {
            if (!$scope.session && !$scope.activeAddress) {
                initVars();
            }
        }

        function initVars() {
            //or's are reduntant but fuck it better be safer than sorry

            //session geoSupport
            $scope.session = $scope.session || { geoSupport: $window.navigator};
            //active Address
            $scope.activeAddress = $scope.activeAddress || new Address({});

        }

        window.navigator.geolocation.getCurrentPosition(function (position) {

            $scope.$apply(function () {
                //set returned vals to active model
                $scope.activeAddress.lat = position.coords.latitude;
                $scope.activeAddress.lng = position.coords.longitude;
                $scope.activeAddress.posAccuracy = position.coords.accuracy;

                //set status
                $scope.activeAddress.status = 'rGeocoded'; // fuck it just trust that shit will work
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
                    //set status
//                        $scope.activeAddress.status = 'rGeocoded';

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

        $scope.confirmAddress = function () {
            $scope.showingEditGeoAddress = false;
            $scope.activeAddress.activated = true; // reduntant to do every time but fuck it whatever 4nowz

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

        $scope.openInteractModal = function () {
            $modal.open({
                backdrop: true,
                templateUrl: '/app/interact/templates/interact.modal.html',
                controller: 'InteractModalCtrl',
                resolve: {
                    activeAddress: function () {
                        return $scope.activeAddress;
                    }
                }
            }).result.then(function () {
                })
        };



    })
    .controller('InteractModalCtrl',
    function ($scope, $http, $modalInstance, $timeout, activeAddress) {
        // vars
        $scope.activeAddress = activeAddress;

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

        //modal macro controls
        $scope.interactModalClose = function () {
            $modalInstance.close();
        };
    });
