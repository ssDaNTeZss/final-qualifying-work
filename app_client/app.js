function config($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/homePage.html',
            controller: 'homePageCtrl',
            controllerAs: 'vm'
        })
        .when('/schedule', {
            templateUrl: 'views/schedule.html',
            controller: 'scheduleCtrl',
            controllerAs: 'vm'
        }).when('/testdata-schedules', {
        templateUrl: 'testdata/schedules.json',
        controllerAs: 'vm'
    })

        .otherwise({redirectTo: '/'});
}

angular
    .module('myApp', ['ngRoute'])
    .controller('homePageCtrl', homePageCtrl)
    .controller('scheduleCtrl', scheduleCtrl)
    .config(['$routeProvider', config])
    ;