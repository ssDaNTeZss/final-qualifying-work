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
        })
        .when('/about-college', {
            templateUrl: 'views/aboutСollege.html',
            controller: 'aboutСollegeCtrl',
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
        .when('/admin-home', {
            templateUrl: 'views/adminHome.html',
            controller: 'adminHomeCtrl',
            controllerAs: 'vm'
        })
        .when('/testdata-schedules', {
        templateUrl: 'testdata/schedules.json',
        controllerAs: 'vm'
    })

        .otherwise({redirectTo: '/'});
}

angular
    .module('myApp', ['ngRoute'])
    .controller('homePageCtrl', homePageCtrl)
    .controller('aboutСollegeCtrl', aboutСollegeCtrl)
    .controller('loginCtrl', loginCtrl)
    .controller('adminHomeCtrl', adminHomeCtrl)
    .controller('scheduleCtrl', scheduleCtrl)
    .config(['$routeProvider', config])
    ;