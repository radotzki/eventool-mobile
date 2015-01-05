(function () {
    'use strict';

    angular
        .module('eventool.friendship')
        .controller('IndexFriends', IndexFriends);

    /* @ngInject */
    function IndexFriends($stateParams, friendsPrepSvc) {
        /*jshint validthis: true */
        var vm = this;
        vm.clientId = $stateParams.clientId;
        vm.friends = friendsPrepSvc;

        activate();

        function activate() {
            for (var i = vm.friends.length - 1; i >= 0; i--) {
                if (vm.friends[i].client_one.id != vm.clientId) {
                    vm.friends[i].myFriend = vm.friends[i].client_one;
                } else {
                    vm.friends[i].myFriend = vm.friends[i].client_two;
                }
            };
        }

    }
})();
