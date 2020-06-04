function studentCtrl($http, $location, $scope) {
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

                $("div.header1").addClass('header1-mftvi');
                $("div.header1").removeClass('header1');
                $("div.block-SaGB").addClass('block-SaGB-mftvi');
                $("div.block-SaGB").removeClass('block-SaGB');

                $("div.text2vw").addClass('text2-5vw-mftvi');
                $("div.text2vw").removeClass('text2vw');
                $("div.header3-no-margin").addClass('header3-no-margin-mftvi');
                $("div.header3-no-margin").removeClass('header3-no-margin');

                $("div.text1-8vw").addClass('text2-5vw-mftvi');
                $("div.text1-8vw").removeClass('text1-8vw');
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

                $("div.header1-mftvi").addClass('header1');
                $("div.header1-mftvi").removeClass('header1-mftvi');
                $("div.block-SaGB-mftvi").addClass('block-SaGB');
                $("div.block-SaGB-mftvi").removeClass('block-SaGB-mftvi');

                $("div.text2-5vw-mftvi").addClass('text2vw');
                $("div.text2-5vw-mftvi").removeClass('text2-5vw-mftvi');
                $("div.header3-no-margin-mftvi").addClass('header3-no-margin');
                $("div.header3-no-margin-mftvi").removeClass('header3-no-margin-mftvi');

                $("div.text2-5vw-mftvi").addClass('text1-8vw');
                $("div.text2-5vw-mftvi").removeClass('text2-5vw-mftvi');
                break;
        }
    }, 100);

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });

    // //URL-адрес JSON
    // let requestURL = 'testdata/masData.json';
    //
    // let request = new XMLHttpRequest();
    // //Открываем новый запрос
    // request.open('GET', requestURL);
    // //Устанавлливаем возврат в JSON
    // request.responseType = 'json';
    // request.send();
    //
    // //Ожидание ответа на возврат с сервера, а затем обращение с данными
    // request.onload = function() {
    //     let data = request.response;
    //     showNewsForStudents(data);
    // };

    //URL-адрес JSON
    let requestURLDATA = 'testdata/masData.json';

    let requestDATA = new XMLHttpRequest();
    //Открываем новый запрос
    requestDATA.open('GET', requestURLDATA);
    //Устанавлливаем возврат в JSON
    requestDATA.responseType = 'json';
    requestDATA.send();

    requestDATA.onload = function() {
        urlForNewsStudent = requestDATA.response;

        //URL-адрес расписания
        let requestURL = urlForNewsStudent.ConnectionSetup.UrlForNewsStudent;

        let request = new XMLHttpRequest();
        //Открываем новый запрос
        request.open('GET', requestURL);
        //Устанавлливаем возврат в JSON
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            let data = request.response;
            showNewsForStudents(data);
        };
    };

    function showNewsForStudents(jsonObj) {
        let masNewsForStudents = jsonObj['NewsForStudents'];

        //Создание и заполениение блоков "Новости"
        for (let a = masNewsForStudents.length - 1; a >= 0; a--) {
            let newDiv = document.createElement("div");
            newDiv.className = 'col-12 block-SaGB';
            let idNewsForStudents = 'NewsForStudents' + a;

            newDiv.innerHTML = '<div data-toggle="collapse" data-target="#' + idNewsForStudents + '" aria-expanded="false" aria-controls="collapseExample">' +
                '<div class="row header3-no-margin">'+ masNewsForStudents[a].Title + '</div>' +
                '<div class="row text2vw">' + masNewsForStudents[a].Subtitle + '</div>' +
                '<div class="row text1-8vw"><div class="collapse" id="' + idNewsForStudents + '">' + masNewsForStudents[a].Text + '</div></div></div>';

            document.getElementById("divContent").appendChild(newDiv);
        }
    }
}