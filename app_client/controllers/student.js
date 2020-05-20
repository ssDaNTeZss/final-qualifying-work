function studentCtrl($http, $location, $scope) {
    setInterval(function () {
        date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            h = (h < 10) ? '0' + h : h,
            m = (m < 10) ? '0' + m : m,
            document.getElementById('time').innerHTML = h + ':' + m;
    }, 500);

    let d = new Date();
    let day = new Array("Воскресенье", "Понедельник", "Вторник",
        "Среда", "Четверг", "Пятница", "Суббота");
    let month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря");
    document.getElementById('date').innerHTML = day[d.getDay()] + ", " + d.getDate() + " " + month[d.getMonth()];

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });

    let requestURL = 'testdata/masData.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let data = request.response;
        showNewsForStudents(data);
    };

    function showNewsForStudents(jsonObj) {
        let mas = jsonObj['MAS'];

        let masNewsForStudents = mas[6].NewsForStudents;

        for (let a = 0; a < masNewsForStudents.length; a++) {
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