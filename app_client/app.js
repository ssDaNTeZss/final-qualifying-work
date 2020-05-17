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
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'logoutCtrl',
            controllerAs: 'vm'
        })
        .when('/admin-home', {
            templateUrl: 'views/adminHome.html',
            controller: 'adminHomeCtrl',
            controllerAs: 'vm'
        })
        .when('/governance', {
        templateUrl: 'views/governance.html',
        controller: 'governanceCtrl',
        controllerAs: 'vm'
        })
        .when('/structure-and-governing-bodies', {
            templateUrl: 'views/structureAndGoverningBodies.html',
            controller: 'structureAndGoverningBodiesCtrl',
            controllerAs: 'vm'
        })
        .when('/admin-governance', {
            templateUrl: 'views/adminGovernance.html',
            controller: 'adminGovernanceCtrl',
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
    .controller('logoutCtrl', logoutCtrl)
    .controller('adminHomeCtrl', adminHomeCtrl)
    .controller('governanceCtrl', governanceCtrl)
    .controller('structureAndGoverningBodiesCtrl', structureAndGoverningBodiesCtrl)
    .controller('scheduleCtrl', scheduleCtrl)
    .controller('adminGovernanceCtrl', adminGovernanceCtrl)
    .config(['$routeProvider', config])
    ;