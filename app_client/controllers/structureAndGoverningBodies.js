function structureAndGoverningBodiesCtrl($http, $location, $scope) {
    clock ();

    $("#undo").click(function () {
        window.location.href = '/#!/about-college';
    });

    let requestURL = 'testdata/masData.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let data = request.response;
        showStructureAndGoverningBodies(data);
    };

    function showStructureAndGoverningBodies(jsonObj) {
        let mas = jsonObj['MAS'];
        let masSaGB1 = mas[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization;
        let masSaGB2 = mas[3].StructureAndGoverningBodies.StructuralUnits;

        let newDiv = document.createElement("div");
        newDiv.className = 'col-12 block-SaGB';
        newDiv.id = 'divStructureOfTheEducationalOrganization';
        newDiv.innerHTML = '<div class="row header2">Структура образовательной организации</div>' +
            '<div class="row header3">' + masSaGB1.HeadFirstBuilding + '</div><div class="row text2vw">' +
            masSaGB1.TextFirstBuilding + '</div><div class="row header3">' + masSaGB1.HeadSecondBuilding +
            '</div><div class="row text2vw">' + masSaGB1.TextSecondBuilding + '</div><div class="row header3">' +
            masSaGB1.HeadCollegeGoverningBodies + '</div><div class="row text2vw">' + masSaGB1.TextCollegeGoverningBodies + '</div>';
        document.getElementById("divContent").appendChild(newDiv);

        let newHr = document.createElement("hr");
        document.getElementById("divContent").appendChild(newHr);

        let newDiv1 = document.createElement("div");
        newDiv1.className = "row header2-W";
        newDiv1.innerHTML = 'Структура образовательной организации';
        document.getElementById("divContent").appendChild(newDiv1);

        for (let a = 0; a < masSaGB2.length; a++) {
            let newDiv2 = document.createElement("div");
            newDiv2.className = 'col-12 block-SaGB';

            newDiv2.innerHTML = '<div class="row header3-no-margin">' + masSaGB2[a].Name + '</div><div class="row text2vw">' + masSaGB2[a].Manager + '</div>' +
                '<div class="row text2vw"><b>Электронная почта:&nbsp;</b>' + masSaGB2[a].Email + '</div>' +
                '<div class="row text2vw"><b>Телефоны:&nbsp;</b>' + masSaGB2[a].Telephone + '</div>' +
                '<div class="row text2vw"><b>Место нахождения:&nbsp;</b>' + masSaGB2[a].Location + '</div>';

            document.getElementById("divContent").appendChild(newDiv2);
        }
    }
}