/**
 * Created with JetBrains WebStorm.
 * User: hvnt
 * Date: 4/24/13
 * Time: 8:32 PM
 * File: /core/config/dev.js
 */

'use strict';

angular.module('thotpod.config', [])
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .factory('Environment', function () {
        var url = {
            local: 'http://10.0.1.16:9292'
//            remote: 'http://dev.maasive.net/v2/528a7eae53d4c940a0a4190d',
//            test: 'http://test.maasive.net/v2.4/52956bfdc3034e4a0fe22ef9'
        };

        return {
            name: 'local',
            adminEmail: 'hunterbrennick@gmail.com',
            path: url.local,
            config: {}
//            walkscore: {
//                path: 'http://app-dev.rescour.com/score?'
//            },
//            stripe: {
//                token: 'pk_test_wSAqQNQKI7QqPmBpDcQLgGM7'
//            },
//            rentMetrics: {
//                token: 'u8LNVTAcLns6ypPmXt82iw',
//                path: 'http://www.rentmetrics.com/api/v1/apartments.json?',
//                method: 'JSONP'
//            }
        };
    });