/**
 * Created with JetBrains WebStorm.
 * User: hvnt
 * Date: 4/24/13
 * Time: 8:32 PM
 * File: /core/config/prod.js
 */

'use strict';

angular.module('thotpod.config', [])
    .config(function ($logProvider) {
        $logProvider.debugEnabled(false);
    })
    .factory('Environment', function () {
        var url = {
            prod: '/api'
//            stage: 'https://api.maasive.net/v2/52956bfdc3034e4a0fe22ef9'
        };

        return {
            name: 'prod',
            path: url.prod,
            adminEmail: 'hunterbrennick@gmail.com',
            config: {}
//            walkscore: {
//                path:  '/score?'
//            }
        };
    });