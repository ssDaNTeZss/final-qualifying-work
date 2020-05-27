function homePageCtrl($http, $location, $scope) {
    monitoringInactivity ();
    clock ();
    UniversalAccess();

    $( "#schedule" ).click(function() {
        window.location.href = '/#!/schedule';
    });

    $( "#aboutCollege" ).click(function() {
        window.location.href = '/#!/about-college';
    });

    $( "#enrollee" ).click(function() {
        window.location.href = '/#!/enrollee';
    });

    $( "#student" ).click(function() {
        window.location.href = '/#!/student';
    });
}