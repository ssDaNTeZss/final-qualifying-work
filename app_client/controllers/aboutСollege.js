function aboutСollegeCtrl($http, $location, $scope) {
    clock ();

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });

    $( "#divGovernance" ).click(function() {
        window.location.href = '/#!/governance';
    });

    $( "#divStructureAndGoverningBodies" ).click(function() {
        window.location.href = '/#!/structure-and-governing-bodies';
    });

    $( "#containerBgPlus" ).click(function() {
        $( "#hb1" ).animate({
            width: "40mm",
        }, 500 );
    });


    let requestURL = 'testdata/masData.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let data = request.response;
        showAboutCollege(data);
    };

    function showAboutCollege(jsonObj) {
        let mas = jsonObj['MAS'];

        document.getElementById("divHeaderAboutCollege").innerHTML += mas[1].DataWorkSchedule.HeaderWorkSchedule;
        document.getElementById("divTextWorkSchedule").innerHTML += mas[1].DataWorkSchedule.TextWorkSchedule;

        let newDiv = document.createElement("div");
        newDiv.className = 'row-12 headerAboutCollege';
        let idDiv = 'divHeaderAboutCollege';
        newDiv.id = idDiv;
        let innerDiv = mas[0].DataAboutCollege.HeaderAboutCollege;
        newDiv.innerHTML = innerDiv;
        document.getElementById("div-aboutCollege").appendChild(newDiv);

        let newDiv2 = document.createElement("div");
        newDiv2.className = 'row-12 textAboutCollege';
        newDiv2.id = 'divTextAboutCollege';
        let innerDiv2 = mas[0].DataAboutCollege.TextAboutCollege;
        newDiv2.innerHTML = innerDiv2;
        document.getElementById("div-aboutCollege").appendChild(newDiv2);
    }

}