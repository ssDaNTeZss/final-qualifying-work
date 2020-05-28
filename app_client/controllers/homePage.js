function homePageCtrl($http, $location, $scope) {
    monitoringInactivity ();
    clock ();
    UniversalAccess();

    setInterval (function () {
        switch (modeForTheVisuallyImpaired) {
            case 'on':
                $("div.main").addClass('main-black');
                $("div.main").removeClass('main');
                $("div.container-bg").addClass('container-bg-mftvi');
                $("div.container-bg").removeClass('container-bg');
                $("div.info").addClass('info-mftvi');
                $("div.info").removeClass('info');
                $("td.td-vertical-align-middle").addClass('td-vertical-align-middle-mftvi');
                $("td.td-vertical-align-middle").removeClass('td-vertical-align-middle');
                break;

            case 'off':
                $("div.main-black").addClass('main');
                $("div.main-black").removeClass('main-black');
                $("div.container-bg-mftvi").addClass('container-bg');
                $("div.container-bg-mftvi").removeClass('container-bg-mftvi');
                $("div.info-mftvi").addClass('info');
                $("div.info-mftvi").removeClass('info-mftvi');
                $("td.td-vertical-align-middle-mftvi").addClass('td-vertical-align-middle');
                $("td.td-vertical-align-middle-mftvi").removeClass('td-vertical-align-middle-mftvi');
                break;
        }
    }, 100);


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