function studentCtrl($http, $location, $scope) {
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
        showNewsForStudents(data);
    };

    function showNewsForStudents(jsonObj) {
        let mas = jsonObj['MAS'];

        let masNewsForStudents = mas[6].NewsForStudents;

        //Создание и заполениение блоков "Новости"
        for (let a = masNewsForStudents.length - 1; a >= 0; a++) {
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