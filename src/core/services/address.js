/**
 * Created with WebStorm.
 * User: hunt
 * Date: 6/10/14
 * Time: 11:17 PM
 * File:
 */
angular.module('thotpod.services')
    .factory('Address', function ($http, $q, Environment) {
        /**
         * Address
         * @param data
         * @constructor
         */
        var Address = function (data) {
            /* longitude & latitude */
            this.lng = data.longitude || null;
            this.lat = data.latitude || null;
            this.posAccuracy = data.posAccuracy || null;

            /* physical address */
            this.street1 = data.street1 || null;
            this.street2 = data.street2 || null;
            this.neighborhood = data.neighborhood || null;
            this.city = data.city || null;
            this.state = data.state || null;
            this.stateAbbrev = data.stateAbbrev || null;
            this.zip = data.zip || null;
            this.county = data.county || null;

            /* status */
            this.status = data.status || Address.statuses[0];

            /* zillow shit */
            this.zpid = data.zpid || null;
            this.zillowComps = data.zillowComps || [];
        };

        /* Statuses
         None
         permissionDenied -> stay on this state
         permissionGiven -> fail after permissionGiven (stay on this state)
         reverseGeocoded -> success after permissionGiven
         confirmed -> their address
         */
        Address.statuses = ['None', 'pDenied', 'pGiven', 'rGeocoded', 'confirmed'];

        Address.prototype.mostPreciseForZillow = function () {
            return this.neighborhood || this.zip;
        };

        Address.prototype.transformAddress = function () {
            return this.street1 + ', ' + this.city + ', ' + this.stateAbbrev + ' ' + this.zip;
        };

        Address.prototype.getDeepCompsZillow = function () {
            var defer = $q.defer(),
                self = this,
                path = Environment.path + '/zillow_deep_comps/',
                config = angular.extend({ }, Environment.config);

            $http.get(path, config).then(
                function (response) {
                    // for mock data, set city, state and zip to this address
                    for (var i = 0; i < response.data.collection.length; i++) {
                        var prop = response.data.collection[i];
                        prop.address.city = self.city;
                        prop.address.state = self.state;
                        prop.address.stateAbbrev = self.stateAbbrev;
                        prop.address.zip = self.zip;
                    }
                    self.zillowComps = response.data.collection;
                    defer.resolve(self.zillowComps);
                },
                function (response) {
                    // set status code
                    defer.reject(response);
                }
            );
            return defer.promise;
        };

        Address.prototype.newVisit = function () {
            var defer = $q.defer(),
                self = this,
                path = 'http://10.0.1.16:9292/visits/?api_key='+
                    'fadd49642f3909e9b1f221d361d3920ff8a2ec01156a667d4b5b1866afa7ecc8', //lulz
                config = angular.extend({ }, Environment.config),
                data = JSON.stringify({
                    address: {
                        street: self.street1,
                        city: self.city,
                        state: self.state,
                        zip: self.zip,
                        longitude: self.lng,
                        latitude: self.lat
                    }
                });

            $http.post(path, data, config).then(
                function (response) {
                    defer.resolve(response);
                },
                function (response) {
                    //set status code
                    defer.reject(response);
                }
            );
            return defer.promise;
        };

        return Address;
    });