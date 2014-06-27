/**
 * Created with WebStorm.
 * User: hunt
 * Date: 5/13/14
 * Time: 10:54 AM
 * File:
 */


angular.module('thotpod.mock', ['thotpod.toma', 'ngMockE2E'])
    .run(function ($httpBackend, $http, $timeout, $log, Utilities) {
        var mockZillowComps = [
            { //1
                address: {
                    street1: '2114 Bigelow Ave N',
                    street2: null,
                    city: null,
                    state: null,
                    stateAbbrev: null,
                    zip: null,
                    lng: null,
                    lat: null
                },
                imgs: [
                    'http://photos3.zillow.com/p_d/IShn1suye844b81000000000.jpg',
                    'http://photos2.zillow.com/p_d/IShjq0vatv8jq11000000000.jpg',
                    'http://photos2.zillow.com/p_d/ISt0k0crg7krq11000000000.jpg'
                ],
                taxAssessmentYear: 2008,
                taxAssessment: 105400,
                yearBuilt: 1924,
                lotSizeSqFt: 4680,
                finishedSqFt: 3470,
                bathrooms: 3.0,
                bedrooms: 4,
                lastSoldDate: new Date(2008, 11, 26),
                lastSoldPrice: 995000,
                zestimate: 1219500,
                lastUpdated: new Date(1969, 31, 12),
                valuationRange: {
                    low: 1024380,
                    high: 1378035,
                    percentile: 95
                }
            },
            { //2
                address: {
                    street1: '1511 10th Ave W',
                    street2: null,
                    city: null,
                    state: null,
                    stateAbbrev: null,
                    zip: null,
                    lng: null,
                    lat: null
                },
                imgs: [
                    'http://photos2.zillow.com/p_d/ISyryt7ket85gj.jpg',
                    'http://photos1.zillow.com/p_d/ISdgtxa84t18hj0000000000.jpg',
                    'http://photos3.zillow.com/p_d/ISletai2b0416i0000000000.jpg'

                ],
                taxAssessmentYear: 2008,
                taxAssessment: 804000,
                yearBuilt: 2006,
                lotSizeSqFt: 3750,
                finishedSqFt: 2520,
                bathrooms: 4.0,
                bedrooms: 4,
                lastSoldDate: new Date(2009, 9, 24),
                lastSoldPrice: 832500,
                zestimate: 836500,
                lastUpdated: new Date(2009, 3, 11),
                valuationRange: {
                    low: 777945,
                    high: 883390,
                    percentile: 83
                }
            },
            { //3
                address: {
                    street1: '2928 Queen Anne Ave',
                    street2: null,
                    city: null,
                    state: null,
                    stateAbbrev: null,
                    zip: null,
                    lng: null,
                    lat: null
                },
                imgs: [
                    'http://photos1.zillow.com/p_d/ISxfykigoq586m0000000000.jpg'
                ],
                taxAssessmentYear: 2008,
                taxAssessment: 633000,
                yearBuilt: 1927,
                lotSizeSqFt: 3240,
                finishedSqFt: 1920,
                bathrooms: 2.0,
                bedrooms: 4,
                lastSoldDate: new Date(2009, 8, 20),
                lastSoldPrice: 595000,
                zestimate: 608000,
                lastUpdated: new Date(2009, 3, 11),
                valuationRange: {
                    low: 559360,
                    high: 656640,
                    percentile: 68
                }
            },
            { //4
                address: {
                    street1: '1713 Warren Ave N',
                    street2: null,
                    city: null,
                    state: null,
                    stateAbbrev: null,
                    zip: null,
                    lng: null,
                    lat: null
                },
                imgs: [
                    'http://photos3.zillow.com/p_d/IShntl8vx4ztmt0000000000.jpg',
                    'http://photos2.zillow.com/p_d/IS1bpx7ipoizmt0000000000.jpg',
                    'http://photos3.zillow.com/p_d/ISt4nlpblga2nt0000000000.jpg',
                    'http://photos1.zillow.com/p_d/ISle19mif70unt0000000000.jpg'
                ],
                taxAssessmentYear: 2008,
                taxAssessment: 628000,
                yearBuilt: 1905,
                lotSizeSqFt: 6000,
                finishedSqFt: 2100,
                bathrooms: 1.0,
                bedrooms: 3,
                lastSoldDate: new Date(2009, 5, 12),
                lastSoldPrice: 637500,
                zestimate: 696500,
                lastUpdated: new Date(2009, 3, 11),
                valuationRange: {
                    low: 592025,
                    high: 787045,
                    percentile: 77
                }
            },
            { //5
                address: {
                    street1: '2583 7th Ave W',
                    street2: null,
                    city: null,
                    state: null,
                    stateAbbrev: null,
                    zip: null,
                    lng: null,
                    lat: null
                },
                imgs: [
                    'http://photos3.zillow.com/p_d/IStsda9wzjb3jk1000000000.jpg'
                ],
                taxAssessmentYear: 2008,
                taxAssessment: 638000,
                yearBuilt: 1940,
                lotSizeSqFt: 5520,
                finishedSqFt: 2400,
                bathrooms: 2.5,
                bedrooms: 3,
                lastSoldDate: new Date(2009, 7, 31),
                lastSoldPrice: 900000,
                zestimate: 831500,
                lastUpdated: new Date(2009, 3, 11),
                valuationRange: {
                    low: 740035,
                    high: 898020,
                    percentile: 83
                }
            }
        ];
        $httpBackend.whenGET(/\/zillow_deep_comps\/$/).respond(function (method, url, data, headers) {
            return [200,
                {
                    status: 'N/A',
                    collection: mockZillowComps
                }, {}];
        });

        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/assets\//).passThrough();
        $httpBackend.whenGET(/templates\//).passThrough();
        $httpBackend.whenPOST('http://10.0.1.16:9292/visits/?api_key=fadd49642f3909e9b1f221d361d3920ff8a2ec01156a667d4b5b1866afa7ecc8').respond(function (method, url, data, headers) {
            return [200,
                {
                    status: 'N/A',
                    collection: mockZillowComps
                }, {}];
        });
        $httpBackend.whenPOST('http://localhost:9292/visits/?api_key=fadd49642f3909e9b1f221d361d3920ff8a2ec01156a667d4b5b1866afa7ecc8').respond(function (method, url, data, headers) {
            return [200, {}];
        });
//        $httpBackend.whenPOST('http://10.0.1.16:9292/visits/?api_key=fadd49642f3909e9b1f221d361d3920ff8a2ec01156a667d4b5b1866afa7ecc8').passThrough();
//        $httpBackend.whenPOST('http://localhost:9292/visits/?api_key=fadd49642f3909e9b1f221d361d3920ff8a2ec01156a667d4b5b1866afa7ecc8').passThrough();
    });

angular.bootstrap(document, ['thotpod.mock']);



