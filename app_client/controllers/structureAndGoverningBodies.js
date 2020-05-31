function structureAndGoverningBodiesCtrl($http, $location, $scope) {
    monitoringInactivity ();
    clock ();
    UniversalAccess();

    setInterval (function () {
        switch (modeForTheVisuallyImpaired) {
            case 'on':
                $("div.main").addClass('main-black');
                $("div.main").removeClass('main');
                $("b.time-sm").addClass('time-sm-mftvi');
                $("b.time-sm").removeClass('time-sm');
                $("p.date-sm").addClass('date-sm-mftvi');
                $("p.date-sm").removeClass('date-sm');
                $("div.container-bg-plus").addClass('container-bg-plus-mftvi');
                $("div.container-bg-plus").removeClass('container-bg-plus');

                $("div.undo").addClass('undo-mftvi');
                $("div.undo").removeClass('undo');

                $("hr.hr").addClass('hr-mftvi');
                $("hr.hr").removeClass('hr');

                $("div.header1").addClass('header1-mftvi');
                $("div.header1").removeClass('header1');
                $("div.block-SaGB").addClass('block-SaGB-mftvi');
                $("div.block-SaGB").removeClass('block-SaGB');
                $("div.header2-W").addClass('header2-W-mftvi');
                $("div.header2-W").removeClass('header2-W');
                $("div.header2").addClass('header2-mftvi');
                $("div.header2").removeClass('header2');
                $("div.header3").addClass('header3-mftvi');
                $("div.header3").removeClass('header3');
                $("div.text2vw").addClass('text2-5vw-mftvi');
                $("div.text2vw").removeClass('text2vw');
                $("div.header3-no-margin").addClass('header3-no-margin-mftvi');
                $("div.header3-no-margin").removeClass('header3-no-margin');

                break;
        }
    }, 100);

    $( "#undo" ).click(function() {
        window.location.href = '/#!/about-college';
    });

    //URL-адрес JSON
    let requestURL = 'testdata/masData.json';

    let request = new XMLHttpRequest();
    //Открываем новый запрос
    request.open('GET', requestURL);
    //Устанавлливаем возврат в JSON
    request.responseType = 'json';
    request.send();

    //Ожидание ответа на возврат с сервера, а затем обращение с данными
    request.onload = function() {
        let data = request.response;
        showStructureAndGoverningBodies(data);
    };

    function showStructureAndGoverningBodies(jsonObj) {
        let mas = jsonObj['MAS'];
        let masSaGB1 = mas[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization;
        let masSaGB2 = mas[3].StructureAndGoverningBodies.StructuralUnits;

        //Создание и заполнение блока "Структура образовательной организации"
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
        newHr.className = 'hr';
        document.getElementById("divContent").appendChild(newHr);

        let newDiv1 = document.createElement("div");
        newDiv1.className = "row header2-W";
        newDiv1.innerHTML = 'Структурные подразделения';
        document.getElementById("divContent").appendChild(newDiv1);

        //Создание и заполнение блоков "Структурные подразделения"
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