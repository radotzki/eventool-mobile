(function() {
    'use strict';

    angular
        .module('eventool.friendship')
        .controller('AddFriend', AddFriend);

    /* @ngInject */
    function AddFriend($state, $stateParams, datacontext) {
        /*jshint validthis: true */
        var vm = this;

        vm.clientFriends = [];
        vm.clientClicked = clientClicked;

        activate();

        function activate() {
        	getClient();
            getClientFriends();
        }

        function getClientFriends() {
            return datacontext.friendship.index($stateParams.clientId).then(function(resp) {
                for (var i = resp.length - 1; i >= 0; i--) {
                    if (resp[i].client_one.id !== Number($stateParams.clientId)) {
                        vm.clientFriends.push(resp[i].client_one);
                    } else {
                        vm.clientFriends.push(resp[i].client_two);
                    }
                }
            });
        }

        function getClient() {
            return datacontext.client.show($stateParams.clientId).then(function(resp) {
            	vm.clientFriends.push(resp);
            });
        }

        function clientClicked(clientId) {
            datacontext.friendship.create($stateParams.clientId, clientId).then(function() {
                $state.go('app.clients.detail.friends', {
                    clientId: $stateParams.clientId
                });
            });
        }

    }
})();
