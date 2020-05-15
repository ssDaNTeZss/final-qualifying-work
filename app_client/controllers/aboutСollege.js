function aboutСollegeCtrl($http, $location, $scope) {
    setInterval(function () {
        date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            h = (h < 10) ? '0' + h : h,
            m = (m < 10) ? '0' + m : m,
            document.getElementById('time').innerHTML = h + ':' + m;
    }, 1000);

    let d = new Date();
    let day = new Array("Воскресенье", "Понедельник", "Вторник",
        "Среда", "Четверг", "Пятница", "Суббота");
    let month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря");
    document.getElementById('date').innerHTML = day[d.getDay()] + ", " + d.getDate() + " " + month[d.getMonth()];

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });

    $( "#divGovernance" ).click(function() {
        window.location.href = '/#!/governance';
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