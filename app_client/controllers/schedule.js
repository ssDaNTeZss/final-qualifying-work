function scheduleCtrl($http, $location, $scope) {
    setInterval(function () {
        date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            h = (h < 10) ? '0' + h : h,
            m = (m < 10) ? '0' + m : m,
            document.getElementById('time').innerHTML = h + ':' + m;
    }, 1000);
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
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
            let zx;
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

            for (let l = 0; l < mas[i].Course.length; l++) {
                let newDiv1 = document.createElement('div');
                let id_div_course_number = id_div_schedule_date + 'scheduleCourseNumber' + l;

                newDiv1.className = 'row no-margin сourse-number';
                newDiv1.id = id_div_course_number;

                document.getElementById(id_schedule_row).appendChild(newDiv1);

                let element1 = document.getElementById(id_div_course_number);
                let n = mas[i].Course[l].CourseNumber;

                switch (n) {
                    case '1':
                        $(element1).append('1 Курс');
                        break;
                    case '2':
                        $(element1).append('2 Курс');
                        break;
                    case '3':
                        $(element1).append('3 Курс');
                        break;
                    case '4':
                        $(element1).append('4 Курс');
                        break;
                }

                for (let j = 0; j < mas[i].Course[0].Group.length; j++) {
                    let newDiv2 = document.createElement('div');
                    let id_for_newDiv2 = id_div_schedule_date +'Sq' + j;
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
                            newDiv2.id = id_for_newDiv2;
                            a = 1;
                            zx = 'go';
                            // let newDiv3 = document.createElement('div');
                            // newDiv3.className = 'collapse';
                            // newDiv3.id = 'collapseExample';
                            // let innerDiv3 = '<div class="card card-body"> Anim pariatur </div>';
                            // newDiv3.innerHTML = innerDiv3;
                            // document.getElementById('qwerty').appendChild(newDiv3);


                            break;
                    }

                    let innerDiv2 = '<div class="sq-wrapper" type="button" data-toggle="collapse" data-target="#' + (id_div_schedule_date + 'collapseSchedule' + j) + '" aria-expanded="false" aria-controls="collapseExample"><div class="sq-content"><div class="row no-margin"><div class="text-for-sq-gr">Группа</div></div><div class="row no-margin"><div class="text-for-sq" id="';
                    let id_div_schedule_group_name = id_div_schedule_date + 'scheduleGroupName' + j;
                        innerDiv2 = innerDiv2 + id_div_schedule_group_name;
                        innerDiv2 = innerDiv2 + '"></div></div></div></div>';
                        newDiv2.innerHTML = innerDiv2;

                    document.getElementById(id_schedule_row).appendChild(newDiv2);

                    let element2 = document.getElementById(id_div_schedule_group_name);
                        $(element2).append(mas[i].Course[0].Group[j].GroupName);

                    if (zx == 'go') {
                        let k = j;
                        let c = k-3;
                        zx = 'stop';
                        // let newDiv4 = document.createElement('div');
                        // newDiv4.className = 'row no-margin';
                        // newDiv4.id = 'test';
                        // document.getElementById(id_schedule_row).appendChild(newDiv4);
                        for (k; k >= c; k--) {
                            console.log(k);

                            let newDiv3 = document.createElement('div');
                            newDiv3.className = 'collapse';
                            newDiv3.id = id_div_schedule_date + 'collapseSchedule' + k;
                            let innerDiv3 = '<div class="cardd card-body"><table class="table table-bordered"> <thead> <tr> <th scope="col">Расписание занятий с учетом замен</th> <th scope="col">Дисциплина, МДК</th> <th scope="col">Пара</th> <th scope="col">Аудитория</th> </tr> </thead> <tbody> <tr> <th scope="row">1</th> <td>Mark</td> <td>Otto</td> <td>@mdo</td> </tr> <tr> <th scope="row">2</th> <td>Jacob</td> <td>Thornton</td> <td>@fat</td> </tr> <tr> <th scope="row">3</th> <td colspan="2">Larry the Bird</td> <td>@twitter</td> </tr> </tbody> </table></div>';
                            newDiv3.innerHTML = innerDiv3;
                            document.getElementById(id_schedule_row).appendChild(newDiv3);
                            // document.getElementById('test').appendChild(newDiv3);
                        }
                    }
                }
            }
        }
    }
}