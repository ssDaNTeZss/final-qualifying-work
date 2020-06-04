function governanceCtrl($http, $location, $scope) {
    monitoringInactivity ();
    clock ();
    UniversalAccess();

    setInterval (function () {
        switch (modeForTheVisuallyImpaired) {
            //Вкл. «режим для слабовидящих»
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

                $("div.div-header").addClass('div-header-mftvi');
                $("div.div-header").removeClass('div-header');
                $("hr.hr").addClass('hr-mftvi');
                $("hr.hr").removeClass('hr');

                $("div.div-header-2").addClass('div-header-2-mftvi');
                $("div.div-header-2").removeClass('div-header-2');
                $("div.block-governance").addClass('block-governance-mftvi');
                $("div.block-governance").removeClass('block-governance');
                $("div.header-for-governance").addClass('header-for-governance-mftvi');
                $("div.header-for-governance").removeClass('header-for-governance');

                $("div.name-governance").addClass('name-governance-mftvi');
                $("div.name-governance").removeClass('name-governance');
                $("div.info-governance-pl").addClass('info-governance-pl-mftvi');
                $("div.info-governance-pl").removeClass('info-governance-pl');
                $("div.info-governance-place").addClass('info-governance-place-mftvi');
                $("div.info-governance-place").removeClass('info-governance-place');
                $("div.info-governance").addClass('info-governance-mftvi');
                $("div.info-governance").removeClass('info-governance');
                break;

            //Выкл. «режим для слабовидящих»
            case 'off':
                $("div.main-black").addClass('main');
                $("div.main-black").removeClass('main-black');
                $("div.container-bg-plus-mftvi").addClass('container-bg-plus');
                $("div.container-bg-plus-mftvi").removeClass('container-bg-plus-mftvi');
                $("b.time-sm-mftvi").addClass('time-sm');
                $("b.time-sm-mftvi").removeClass('time-sm-mftvi');
                $("p.date-sm-mftvi").addClass('date-sm');
                $("p.date-sm-mftvi").removeClass('date-sm');

                $("div.undo-mftvi").addClass('undo');
                $("div.undo-mftvi").removeClass('undo-mftvi');

                $("div.div-header-mftvi").addClass('div-header');
                $("div.div-header-mftvi").removeClass('div-header-mftvi');
                $("hr.hr-mftvi").addClass('hr');
                $("hr.hr-mftvi").removeClass('hr-mftvi');

                $("div.div-header-2-mftvi").addClass('div-header-2');
                $("div.div-header-2-mftvi").removeClass('div-header-2-mftvi');
                $("div.block-governance-mftvi").addClass('block-governance');
                $("div.block-governance-mftvi").removeClass('block-governance-mftvi');
                $("div.header-for-governance-mftvi").addClass('header-for-governance');
                $("div.header-for-governance-mftvi").removeClass('header-for-governance-mftvi');

                $("div.name-governance-mftvi").addClass('name-governance');
                $("div.name-governance-mftvi").removeClass('name-governance-mftvi');
                $("div.info-governance-pl-mftvi").addClass('info-governance-pl');
                $("div.info-governance-pl-mftvi").removeClass('info-governance-pl-mftvi');
                $("div.info-governance-place-mftvi").addClass('info-governance-place');
                $("div.info-governance-place-mftvi").removeClass('info-governance-place-mftvi');
                $("div.info-governance-mftvi").addClass('info-governance');
                $("div.info-governance-mftvi").removeClass('info-governance-mftvi');
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
        showgGovernance(data);
    };

    function showgGovernance(jsonObj) {
        let mas = jsonObj['MAS'];
        let director = mas[2].Governance[0].Director;

        //Заполнение блока "Руководитель образовательной организации"
        document.getElementById("directorPosition").innerHTML += director.Position;
        document.getElementById("directorFullName").innerHTML += director.FullName;
        document.getElementById("directorAdditionally").innerHTML += director.Additionally;
        document.getElementById("directorTelephone").innerHTML += director.Telephone;
        document.getElementById("directorEmail").innerHTML += director.Email;
        document.getElementById("directorLocation").innerHTML += director.Location;

        //Заполнение последующих блоков информацией из masData.json
        for (let a = 1; a < mas[2].Governance.length; a++) {
            if (mas[2].Governance[a].TheStatusOfVisibility === true) {
                let newDiv = document.createElement('div');
                newDiv.className = 'block-governance';
                newDiv.id = 'block-governance' + a;
                let innerDiv = '<div class="header-for-governance">' + mas[2].Governance[a].Position +
                    '</div><div class="name-governance">' + mas[2].Governance[a].FullName +
                    '</div><div class="row no-margin"><div class="col-3 info-governance">' +
                    mas[2].Governance[a].Telephone + '</div> <div class="col-3 info-governance">' +
                    mas[2].Governance[a].Email + '</div> <div class="col-6 info-governance-place">' +
                    '<b>Место нахождения</b><br />' + mas[2].Governance[a].Location + '</div> </div>';
                newDiv.innerHTML = innerDiv;
                document.getElementById("content").appendChild(newDiv);
            }
        }
    }
}