(function () {
    'use strict';

    angular
        .module('eventool.tickets')
        .factory('separatorTickets', separatorTickets);

    /* @ngInject */
    function separatorTickets() {
        var service = {
            separateForEvent: separateForEvent,
            separateForClient: separateForClient,
            separateForUser: separateForUser
        };
        return service;

        ////////////////

        function separateForEvent(tickets) {
            console.log(tickets);
            return _.chain(tickets)
                .groupBy(function (item) {
                    return item.client.first_name + ' ' + item.client.last_name;
                })
                .transform(function (result, tickets, key) {
                    result[key] = {
                        separatorName: key,
                        tickets: tickets
                    };
                })
                .toArray()
                .value();
        }

        function separateForClient(tickets) {
            return _.chain(tickets)
                .groupBy(function (item) {
                    return item.event.name;
                })
                .transform(function (result, tickets, key) {
                    result[key] = {
                        separatorName: key,
                        tickets: tickets,
                        when: tickets[0].event.when
                    };
                })
                .toArray()
                .value();
        }

        function separateForUser(tickets) {
            return _.chain(tickets)
                .groupBy(function (item) {
                    return item.event.name;
                })
                .transform(function (result, tickets, key) {
                    var income = _.reduce(tickets, function (sum, ticket) {
                        ticket.arrived ? sum += ticket.price.price : null;
                        return sum;
                    }, 0);

                    var arriveCount = _.reduce(tickets, function (sum, ticket) {
                        ticket.arrived ? sum++ : null;
                        return sum;
                    }, 0);

                    result[key] = {
                        separatorName: key,
                        tickets: tickets,
                        income: income,
                        arriveCount: arriveCount,
                        when: tickets[0].event.when
                    };
                })
                .toArray()
                .value();
        }

    }
})();
