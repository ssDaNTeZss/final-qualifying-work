function scheduleCtrl($http, $location, $scope) {
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

    let requestURL = 'testdata/schedules.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let data = request.response;
        populateHeader(data);
        // console.log(data);
    };

    function populateHeader(jsonObj) {
        // let myH1 = document.createElement('h1');
        // myH1.textContent = jsonObj['squadName'];
        // header.appendChild(myH1);
        //
        // let myPara = document.createElement('p');
        // myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
        // header.appendChild(myPara);



        // let newdiv = document.createElement('div');
        // newdiv.innerHTML = "<div class=\"sq sq-l\"> <div class=\"sq-wrapper\"> <div class=\"sq-content\"> <div class=\"row no-margin\"> <div class=\"img-for-sq\"> <img src=\"/img/k.jpg\" class=\"k\"> </div> <div class=\"space-for-sq\"></div> <div class=\"text-for-sq\" id='text-for-sq'></div> </div> </div></div></div>";
        // document.getElementById("div-shedule").appendChild(newdiv);
        // let group = jsonObj['Group'];
        // $('#text-for-sq').append(group[0].GroupName);

        let mas = jsonObj['MAS'];

        // newDiv.innerHTML = "<div class=\"row no-margin\"><div class=\"col-12 schedule-for-the-day no-margin no-padding\">Расписание на </div><hr></div>";
        // document.getElementById("div-shedule").appendChild(newdiv);



        for (let i = 0; i < mas.length; i++) {
            let id_div_schedule_date = 'scheduleDate' + i;
            let id_schedule_row = 'scheduleRow' + i;
            let a = 1;
            let newDiv = document.createElement("div");
            let innerDiv = "<div class=\"row no-margin\"><div class=\"col-12 schedule-for-the-day no-margin no-padding\" id=\"" + id_div_schedule_date + "\">Расписание на </div><hr></div></div>" + "<div class=\"row no-margin\" id=\"" + id_schedule_row + "\">";
            newDiv.innerHTML = innerDiv;
            document.getElementById("div-schedule").appendChild(newDiv);

            let element = document.getElementById(id_div_schedule_date);
            $(element).append(mas[i].Date);

            newDiv = null;

            for (let j = 0; j < mas[i].Group.length; j++) {
                let newDiv2 = document.createElement('div');
                //newDiv2.className = 'sq';
                //let innerDiv2 = "<div class=\"sq sq-";

                switch (a) {
                    case 1:
                        newDiv2.className = 'sq sq-l';
                        //innerDiv2 = innerDiv2 + 'l';
                        a++;
                        break;
                    case 2:
                    case 3:
                        newDiv2.className = 'sq sq-m';
                        //innerDiv2 = innerDiv2 + 'm';
                        a++;
                        break;
                    case 4:
                        newDiv2.className = 'sq sq-r';
                        //innerDiv2 = innerDiv2 + 'r';
                        a = 1;
                        break;
                }

                let innerDiv2  = '<div class="sq-wrapper"><div class="sq-content"><div class="row no-margin"><div class="text-for-sq-gr">Группа</div><div class="text-for-sq" id="';
                let id_div_schedule_group_name = id_div_schedule_date + 'scheduleGroupName' + j;
                innerDiv2 = innerDiv2 + id_div_schedule_group_name;
                innerDiv2 = innerDiv2 + '"></div></div></div></div>';
                console.log(innerDiv2);
                newDiv2.innerHTML = innerDiv2;
                document.getElementById(id_schedule_row).appendChild(newDiv2);
                let element2 = document.getElementById(id_div_schedule_group_name);
                $(element2).append(mas[i].Group[j].GroupName);
            }
        }
    }
}