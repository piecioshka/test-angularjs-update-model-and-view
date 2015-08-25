(function () {
    'use strict';

    var mod = angular.module('update', []);

    mod.controller('UpdateController', function ($scope) {
        var modelTime, viewTime, modelMicroTime, viewMicroTime;

        // Model
        $scope.title = 'Foo';

        $scope.$watch('title', function (newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                console.log('Model was updated on', modelTime = Date.now(), modelMicroTime = performance.now());
            }
        });

        // View
        setTimeout(function () {
            var $span = document.querySelector('#title-holder');
            var oldValue = $span.innerText;

            setInterval(function () {
                if (oldValue !== $span.innerText) {
                    oldValue = $span.innerText;

                    console.log('View was updated on', viewTime = Date.now(), viewMicroTime = performance.now());
                    console.debug('%s (%s) ms - number of milliseconds where view is slower than model in `update` process', viewTime - modelTime, viewMicroTime - modelMicroTime);
                }
            }, 0);
        }, 0);
    });

    angular.bootstrap(document, ['update']);
}());
