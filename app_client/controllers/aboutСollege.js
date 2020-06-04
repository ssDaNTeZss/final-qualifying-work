function aboutСollegeCtrl($http, $location, $scope) {
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

                $("div.block-work-schedule-SE-l").addClass('block-work-schedule-SE-l-mftvi');
                $("div.block-work-schedule-SE-l").removeClass('block-work-schedule-SE-l');
                $("div.header-work-schedule").addClass('header-work-schedule-mftvi');
                $("div.header-work-schedule").removeClass('header-work-schedule');
                $("div.block-work-schedule-r").addClass('block-work-schedule-r-mftvi');
                $("div.block-work-schedule-r").removeClass('block-work-schedule-r');
                $("div.block-work-schedule-r-down").addClass('block-work-schedule-r-down-mftvi');
                $("div.block-work-schedule-r-down").removeClass('block-work-schedule-r-down');

                $("div.div-aboutCollege").addClass('div-aboutCollege-mftvi');
                $("div.div-aboutCollege").removeClass('div-aboutCollege');

                $("div.headerAboutCollege").addClass('headerAboutCollege-mftvi');
                $("div.headerAboutCollege").removeClass('headerAboutCollege');
                $("div.text-work-schedule").addClass('text-work-schedule-mftvi');
                $("div.text-work-schedule").removeClass('text-work-schedule');
                $("p.header2-5-B").addClass('header3-5-B-mftvi');
                $("p.header2-5-B").removeClass('header2-5-B');

                $("div.text1-8vw-AC-noti").addClass('text-2vw-AC-noti-mftvi');
                $("div.text1-8vw-AC-noti").removeClass('text1-8vw-AC-noti');
                $("div.text2vw-AC").addClass('text2-8vw-AC');
                $("div.text2vw-AC").removeClass('text2vw-AC');
                $("div.text1-8vw-AC").addClass('text2vw-AC-mftvi');
                $("div.text1-8vw-AC").removeClass('text1-8vw-AC');
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

                $("div.block-work-schedule-SE-l-mftvi").addClass('block-work-schedule-SE-l');
                $("div.block-work-schedule-SE-l-mftvi").removeClass('block-work-schedule-SE-l-mftvi');
                $("div.header-work-schedule-mftvi").addClass('header-work-schedule');
                $("div.header-work-schedule-mftvi").removeClass('header-work-schedule');
                $("div.block-work-schedule-r-mftvi").addClass('block-work-schedule-r');
                $("div.block-work-schedule-r-mftvi").removeClass('block-work-schedule-r-mftvi');
                $("div.block-work-schedule-r-down-mftvi").addClass('block-work-schedule-r-down');
                $("div.block-work-schedule-r-down-mftvi").removeClass('block-work-schedule-r-down-mftvi');

                $("div.div-aboutCollege-mftvi").addClass('div-aboutCollege');
                $("div.div-aboutCollege-mftvi").removeClass('div-aboutCollege-mftvi');

                $("div.headerAboutCollege-mftvi").addClass('headerAboutCollege');
                $("div.headerAboutCollege-mftvi").removeClass('headerAboutCollege-mftvi');
                $("div.text-work-schedule-mftvi").addClass('text-work-schedule');
                $("div.text-work-schedule-mftvi").removeClass('text-work-schedule-mftvi');
                $("p.header3-5-B-mftvi").addClass('header2-5-B');
                $("p.header3-5-B-mftvi").removeClass('header3-5-B-mftvi');

                $("div.text-2vw-AC-noti-mftvi").addClass('text1-8vw-AC-noti');
                $("div.text-2vw-AC-noti-mftvi").removeClass('text-2vw-AC-noti-mftvi');
                $("div.text2-8vw-AC").addClass('text2vw-AC');
                $("div.text2-8vw-AC").removeClass('text2-8vw-AC');
                $("div.text2vw-AC-mftvi").addClass('text1-8vw-AC');
                $("div.text2vw-AC-mftvi").removeClass('text2vw-AC-mftvi');
                break;
        }
    }, 100);

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });

    $( "#divGovernance" ).click(function() {
        window.location.href = '/#!/governance';
    });

    $( "#divStructureAndGoverningBodies" ).click(function() {
        window.location.href = '/#!/structure-and-governing-bodies';
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
        showAboutCollege(data);
    };

    function showAboutCollege(jsonObj) {
        let mas = jsonObj['MAS'];

        //Добавление в блок "Режим и график работы" информации из masData.json
        document.getElementById("divHeaderAboutCollege").innerHTML += mas[1].DataWorkSchedule.HeaderWorkSchedule;
        document.getElementById("divTextWorkSchedule").innerHTML += mas[1].DataWorkSchedule.TextWorkSchedule;

        //Добавление в блок "Основные сведения" информации из masData.json
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