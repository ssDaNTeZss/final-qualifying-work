function enrolleeCtrl($http, $location, $scope) {
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

                $("div.text2vw").addClass('text2-5vw-mftvi');
                $("div.text2vw").removeClass('text2vw');
                $("div.header3-no-margin").addClass('header3-no-margin-mftvi');
                $("div.header3-no-margin").removeClass('header3-no-margin');
                $("table.text1-5vw").addClass('text2-5vw-mftvi');
                $("table.text1-5vw").removeClass('text1-5vw');
                $("thead.thead-light").addClass('thead-dark');
                $("thead.thead-light").removeClass('thead-light');
                break;

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

                $("hr.hr-mftvi").addClass('hr');
                $("hr.hr-mftvi").removeClass('hr-mftvi');

                $("div.header1-mftvi").addClass('header1');
                $("div.header1-mftvi").removeClass('header1-mftvi');
                $("div.block-SaGB-mftvi").addClass('block-SaGB');
                $("div.block-SaGB-mftvi").removeClass('block-SaGB-mftvi');

                $("div.text2-5vw-mftvi").addClass('text2vw');
                $("div.text2-5vw-mftvi").removeClass('text2-5vw-mftvi');
                $("div.header3-no-margin-mftvi").addClass('header3-no-margin');
                $("div.header3-no-margin-mftvi").removeClass('header3-no-margin-mftvi');
                $("table.text2-5vw-mftvi").addClass('text1-5vw');
                $("table.text2-5vw-mftvi").removeClass('text2-5vw-mftvi');
                $("thead.thead-dark").addClass('thead-light');
                $("thead.thead-dark").removeClass('thead-dark');

                break;
        }
    }, 100);

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
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
        showEnrolleeNews(data);
    };

    function showEnrolleeNews(jsonObj) {
        let mas = jsonObj['MAS'];

        let masEnrolleeNews = mas[5].NewsForEnrollee;

        //Создание и заполениение блоков "Новости"
        for (let a = masEnrolleeNews.length - 1; a >= 0; a--) {
            let newDiv = document.createElement("div");
            newDiv.className = 'col-12 block-SaGB';
            let idEnrolleeNews = 'EnrolleeNews' + a;

            newDiv.innerHTML = '<div data-toggle="collapse" data-target="#' + idEnrolleeNews + '" aria-expanded="false" aria-controls="collapseExample">' +
                '<div class="row header3-no-margin">'+ masEnrolleeNews[a].Title + '</div>' +
                '<div class="row text2vw">' + masEnrolleeNews[a].Subtitle + '</div>' +
                '<div class="row text2vw"><div class="collapse" id="' + idEnrolleeNews + '">' + masEnrolleeNews[a].Text + '</div></div></div>';

            document.getElementById("divContent").appendChild(newDiv);
        }
    }
}