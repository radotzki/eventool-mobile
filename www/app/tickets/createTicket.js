(function() {
    'use strict';

    angular
        .module('eventool.tickets')
        .controller('CreateTicket', CreateTicket);

    /* @ngInject */
    function CreateTicket($state, $stateParams, datacontext) {
        /*jshint validthis: true */
        var vm = this;

        var MIDDLE_AVG = 1.5;
        var tickets, avgTicketsPrice;
        var clientId = $stateParams.clientId;

        vm.createTicket = createTicket;
        vm.calcBestPrice = calcBestPrice;

        activate();

        function activate() {
            getUpcomingEvents();
            getTickets().then(calcAvgTicketsPrice);
        }

        function getUpcomingEvents() {
            return datacontext.event.upcoming().then(function(data) {
                vm.events = data;
                return data;
            });
        }

        function createTicket() {
            var param = {
                event_id: vm.selectedEvent.id,
                event_price_id: vm.selectedPrice.id
            };

            datacontext.ticket.create(clientId, param).then(function(res) {
                $state.go('app.clients.detail.tickets', {
                    clientId: clientId
                });
            });
        }

        function calcBestPrice() {
        	vm.recommendTicket = null;
            if (avgTicketsPrice !== -1) {
                var sortedPrices = _.sortBy(vm.selectedEvent.prices, function(price) {
                    return price.price;
                });
                datacontext.client.freindsTicketsCount(clientId, vm.selectedEvent.id).then(function(resp) {
                    if (resp.current > resp.average) {
                        for (var i = 0; i < sortedPrices.length && !vm.recommendTicket; i++) {
                            if (sortedPrices[i].price > avgTicketsPrice) {
                                vm.recommendTicket = sortedPrices[i];
                            }
                        }
                    } else {
                        for (var j = sortedPrices.length - 1; j >= 0 && !vm.recommendTicket; j--) {
                            if (sortedPrices[j].price < avgTicketsPrice) {
                                vm.recommendTicket = sortedPrices[j];
                            }
                        }
                    }
                });
            }
        }

        function getTickets() {
            return datacontext.ticket.index(clientId).then(function(resp) {
                tickets = resp;
            });
        }

        function calcAvgTicketsPrice() {
            if (tickets && tickets.length) {
                var avg = _.reduce(tickets, function(sum, ticket) {
                    return sum + ticket.price.price;
                }, 0) / tickets.length;

                var middle = _.sortBy(tickets, function(ticket) {
                    return ticket.price.price;
                })[Math.floor(tickets.length / 2)].price.price;

                avgTicketsPrice = middle * MIDDLE_AVG >= avg ? middle : avg;
            } else {
                avgTicketsPrice = -1;
            }
        }

    }
})();
