angular.module('thotpod.powers', [])
    .run(['$window', '$rootScope', '$templateCache',
        function ($window, $rootScope, $templateCache) {
            angular.element($window).bind('resize', _.debounce(function () {
                $rootScope.$broadcast('window-resized')
            }, 300));
        }])
    .directive('powers', ['$window', '$timeout',
        function ($window, $timeout) {
            return {
                restrict: 'C',
                link: function (scope, element, attrs) {

                    var elHeight = element.prop('offsetHeight'),
                        elSibling = element.next(),
                        elParent = element.parent();

                    function setHeight(el) {
                        elHeight = element.prop('offsetHeight');
                        el.css({
                            height: elParent.height() - elHeight
                        });
                    }

                    scope.$on('window-resized', function () {
                        setHeight(elSibling);
                    });

                    $timeout(function () {
                        setHeight(elSibling);
                    }, 0);
                }
            }
        }]);