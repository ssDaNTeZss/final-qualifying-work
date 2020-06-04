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
        .when('/enrollee', {
            templateUrl: 'views/enrollee.html',
            controller: 'enrolleeCtrl',
            controllerAs: 'vm'
        })
        .when('/student', {
            templateUrl: 'views/student.html',
            controller: 'studentCtrl',
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
        .when('/admin-home', {
            templateUrl: 'views/adminHome.html',
            controller: 'adminHomeCtrl',
            controllerAs: 'vm'
        })
        .when('/admin-governance', {
            templateUrl: 'views/adminGovernance.html',
            controller: 'adminGovernanceCtrl',
            controllerAs: 'vm'
        })
        // .when('/admin-enrollee', {
        //     templateUrl: 'views/adminEnrollee.html',
        //     controller: 'adminEnrolleeCtrl',
        //     controllerAs: 'vm'
        // })
        // .when('/admin-student', {
        //     templateUrl: 'views/adminStudent.html',
        //     controller: 'adminStudentCtrl',
        //     controllerAs: 'vm'
        // })
        .when('/admin-other-settings', {
            templateUrl: 'views/adminOtherSettings.html',
            controller: 'adminOtherSettingsCtrl',
            controllerAs: 'vm'
        })
        .when('/admin-structure-and-governing-bodies', {
            templateUrl: 'views/adminStructureAndGoverningBodies.html',
            controller: 'adminStructureAndGoverningBodiesCtrl',
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
    .controller('enrolleeCtrl', enrolleeCtrl)
    .controller('studentCtrl', studentCtrl)
    .controller('governanceCtrl', governanceCtrl)
    .controller('structureAndGoverningBodiesCtrl', structureAndGoverningBodiesCtrl)
    .controller('scheduleCtrl', scheduleCtrl)
    .controller('adminHomeCtrl', adminHomeCtrl)
    .controller('adminGovernanceCtrl', adminGovernanceCtrl)
    // .controller('adminEnrolleeCtrl', adminEnrolleeCtrl)
    // .controller('adminStudentCtrl', adminStudentCtrl)
    .controller('adminStructureAndGoverningBodiesCtrl', adminStructureAndGoverningBodiesCtrl)
    .controller('adminOtherSettingsCtrl', adminOtherSettingsCtrl)
    .config(['$routeProvider', config])
    ;