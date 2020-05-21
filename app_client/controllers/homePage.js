function homePageCtrl($http, $location, $scope) {
    monitoringInactivity ();
    clock ();

    document.getElementById("schedule").onclick = function () {
        window.location.href = '/#!/schedule';
    };

    document.getElementById("aboutCollege").onclick = function () {
        window.location.href = '/#!/about-college';
    };

    document.getElementById("enrollee").onclick = function () {
        window.location.href = '/#!/enrollee';
    };

    document.getElementById("student").onclick = function () {
        window.location.href = '/#!/student';
    };
}