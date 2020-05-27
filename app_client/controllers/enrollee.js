function enrolleeCtrl($http, $location, $scope) {
    monitoringInactivity ();
    clock ();
    UniversalAccess();

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