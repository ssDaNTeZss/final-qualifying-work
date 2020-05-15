function governanceCtrl($http, $location, $scope) {
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
        window.location.href = '/#!/about-college';
    });

    let requestURL = 'testdata/masData.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let data = request.response;
        showgGovernance(data);
    };

    function showgGovernance(jsonObj) {
        let mas = jsonObj['MAS'];
        let director = mas[2].Governance[0].Director;

        document.getElementById("directorPosition").innerHTML += director.Position;
        document.getElementById("directorFullName").innerHTML += director.FullName;
        document.getElementById("directorAdditionally").innerHTML += director.Additionally;
        document.getElementById("directorTelephone").innerHTML += director.Telephone;
        document.getElementById("directorEmail").innerHTML += director.Email;
        document.getElementById("directorLocation").innerHTML += director.Location;

console.log(mas[2].Governance.length);
        for (let a = 1; a < mas[2].Governance.length; a++) {
            let newDiv = document.createElement('div');
            newDiv.className = 'block-governance';
            newDiv.id = 'block-governance' + a;
            let innerDiv = '<div class="header-for-governance">' + mas[2].Governance[a].Position + '</div><div class="name-governance">' + mas[2].Governance[a].FullName + '</div><div class="row no-margin"><div class="col-3 info-governance">' + mas[2].Governance[a].Telephone + '</div> <div class="col-3 info-governance">' + mas[2].Governance[a].Email + '</div> <div class="col-6 info-governance-place"><b>Место нахождения</b><br />' + mas[2].Governance[a].Location + '</div> </div>';
            newDiv.innerHTML = innerDiv;
            document.getElementById("content").appendChild(newDiv);
        }
    }
}