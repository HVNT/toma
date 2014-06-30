/**
 * Created with JetBrains WebStorm.
 * User: hvnt
 * Date: 4/24/13
 * Time: 8:34 PM
 * File: /core/config/local.js
 */

'use strict';

angular.module('thotpod.config', [])
    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .factory('Environment', function () {
        return {
            name: 'mock',
            path: '/api/',
            config: {},
            adminEmail: 'hunterbrennick@gmail.com'
        };
    });
