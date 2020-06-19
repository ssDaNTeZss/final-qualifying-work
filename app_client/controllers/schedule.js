function scheduleCtrl($http, $location, $scope) {
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

                $("hr.hr").addClass('hr-mftvi');
                $("hr.hr").removeClass('hr');

                $("div.schedule-for-the-day").addClass('schedule-for-the-day-mftvi');
                $("div.schedule-for-the-day").removeClass('schedule-for-the-day');
                $("div.course-number").addClass('course-number-mftvi');
                $("div.course-number").removeClass('course-number');

                $("div.sq-content").addClass('sq-content-mftvi');
                $("div.sq-content").removeClass('sq-content');
                $("div.sq-wrapper").addClass('sq-wrapper-mftvi');
                $("div.sq-wrapper").removeClass('sq-wrapper');
                $("div.text-for-sq-gr").addClass('text-for-sq-gr-mftvi');
                $("div.text-for-sq-gr").removeClass('text-for-sq-gr');
                $("div.text-for-sq").addClass('text-for-sq-mftvi');
                $("div.text-for-sq").removeClass('text-for-sq');

                $("div.cardd").addClass('cardd-mftvi');
                $("div.cardd").removeClass('cardd');

                $("div.text-for-sq-g").addClass('text-for-sq-g-mftvi');
                $("div.text-for-sq-g").removeClass('text-for-sq-g');
                $("div.text-for-sq-gn").addClass('text-for-sq-gn-mftvi');
                $("div.text-for-sq-gn").removeClass('text-for-sq-gn');

                $("table.table-bordered").addClass('table-striped');
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

                $("hr.hr-mftvi").addClass('hr');
                $("hr.hr-mftvi").removeClass('hr-mftvi');

                $("div.schedule-for-the-day-mftvi").addClass('schedule-for-the-day');
                $("div.schedule-for-the-day-mftvi").removeClass('schedule-for-the-day-mftvi');
                $("div.course-number-mftvi").addClass('course-number');
                $("div.course-number-mftvi").removeClass('course-number-mftvi');

                $("div.sq-content-mftvi").addClass('sq-content');
                $("div.sq-content-mftvi").removeClass('sq-content-mftvi');
                $("div.sq-wrapper-mftvi").addClass('sq-wrapper');
                $("div.sq-wrapper-mftvi").removeClass('sq-wrapper-mftvi');
                $("div.text-for-sq-gr-mftvi").addClass('text-for-sq-gr');
                $("div.text-for-sq-gr-mftvi").removeClass('text-for-sq-gr-mftvi');
                $("div.text-for-sq-mftvi").addClass('text-for-sq');
                $("div.text-for-sq-mftvi").removeClass('text-for-sq-mftvi');

                $("div.cardd-mftvi").addClass('cardd');
                $("div.cardd-mftvi").removeClass('cardd-mftvi');

                $("div.text-for-sq-g-mftvi").addClass('text-for-sq-g');
                $("div.text-for-sq-g-mftvi").removeClass('text-for-sq-g-mftvi');
                $("div.text-for-sq-gn-mftvi").addClass('text-for-sq-gn');
                $("div.text-for-sq-gn-mftvi").removeClass('text-for-sq-gn-mftvi');

                $("table.table-striped").removeClass('table-striped');
                break;
        }
    }, 100);

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });

    //URL-адрес JSON
    let requestURLDATA = 'testdata/masData.json';

    let requestDATA = new XMLHttpRequest();
    //Открываем новый запрос
    requestDATA.open('GET', requestURLDATA);
    //Устанавлливаем возврат в JSON
    requestDATA.responseType = 'json';
    requestDATA.send();

    requestDATA.onload = function() {
        urlForSchedule = requestDATA.response;

        //URL-адрес расписания
        let requestURL = urlForSchedule.ConnectionSetup.UrlForSchedule;

        let request = new XMLHttpRequest();
        //Открываем новый запрос
        request.open('GET', requestURL);
        //Устанавлливаем возврат в JSON
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            let data = request.response;
            showSchedule(data);
        };
    };

    function showSchedule(jsonObj) {
        let mas = jsonObj['MAS'];

        for (let a = 0; a < mas.length; a++) {
            let id_row_date = 'rowDate' + a;
            let id_row_schedule = 'rowSchedule' + a;

            //Создание блока с датой расписания
            let newDiv = document.createElement("div");
            let innerDiv = "<div class=\"row no-margin\"><div class=\"col-12 schedule-for-the-day no-margin no-padding\" id=\"" +
                id_row_date + "\">Расписание на </div><hr class='hr'></div></div>" + "<div class=\"row no-margin\" id=\"" + id_row_schedule + "\">";
            newDiv.innerHTML = innerDiv;
            document.getElementById("div-schedule").appendChild(newDiv);

            let element = document.getElementById(id_row_date);
            $(element).append(mas[a].Date);

            for (let b = 0; b < mas[a].Course.length; b++) {
                let classSq = 1;
                let test;
                let newDiv1 = document.createElement('div');
                let id_row_course_number = id_row_date + 'CourseNumber' + b;
                let innerDiv1;

                newDiv1.className = 'row no-margin course-number';
                newDiv1.id = id_row_course_number;

                document.getElementById(id_row_schedule).appendChild(newDiv1);

                let element1 = document.getElementById(id_row_course_number);
                let nCourse = mas[a].Course[b].CourseNumber;

                //Создания блока курса
                switch (nCourse) {
                    case '1':
                        innerDiv1 = '<div class="row no-margin course-number">1 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '2':
                        innerDiv1 = '<div class="row no-margin course-number">2 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '3':
                        innerDiv1 = '<div class="row no-margin course-number">3 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '4':
                        innerDiv1 = '<div class="row no-margin course-number">4 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                }

                let newDiv2 = document.createElement('div');
                let id_row_course_number_schedule = id_row_course_number + 'Schedule' + b;

                newDiv2.className = 'row no-margin w-100';
                newDiv2.id = id_row_course_number_schedule;

                document.getElementById(id_row_course_number).appendChild(newDiv2);

                //Добавление блока
                for (let c = 0; c < mas[a].Course[b].Group.length; c++) {
                    let newDiv3 = document.createElement('div');
                    let id_for_newDiv3 = id_row_course_number + 'Sq' + c;

                    //Определения класса в зависимости от расположения блока
                    switch (classSq) {
                        case 1:
                            newDiv3.className = 'sq sq-l';
                            classSq++;
                            test = 0;
                            break;
                        case 2:
                            newDiv3.className = 'sq sq-m';
                            classSq++;
                            test = 1;
                            break;
                        case 3:
                            newDiv3.className = 'sq sq-m';
                            classSq++;
                            test = 2;
                            break;
                        case 4:
                            newDiv3.className = 'sq sq-r';
                            classSq = 1;
                            test = 3;
                            break;
                    }

                    let id_div_schedule_group_name = id_for_newDiv3 + 'scheduleGroupName' + c;

                    //Добавления Группы с названием
                    let innerDiv3 = '<div class="sq-wrapper type="button" data-toggle="collapse" data-target="#' +
                        (id_row_course_number + 'collapseSchedule' + c) + '" aria-expanded="false" aria-controls="collapseExample"">' +
                        '<div class="sq-content"><div class="row no-margin"><div class="text-for-sq-gr">Группа</div></div>' +
                        '<div class="row no-margin"><div class="text-for-sq" id="' + id_div_schedule_group_name + '"></div></div>' +
                        '</div></div>';
                    newDiv3.innerHTML = innerDiv3;

                    document.getElementById(id_row_course_number_schedule).appendChild(newDiv3);

                    let element2 = document.getElementById(id_div_schedule_group_name);
                    $(element2).append(mas[a].Course[b].Group[c].GroupName);

                    //Определения заполнения строки, если строк заполнена, то
                    //добавляется новая строка для таблиц с расписанием
                    if ((c + 1) == mas[a].Course[b].Group.length) {
                        let newDiv5 = document.createElement('div');
                        let id_row_schedule_schedule = id_row_course_number_schedule + 'SchedulePlus' + c;

                        newDiv5.className = 'row no-margin w-100';
                        newDiv5.id = id_row_schedule_schedule;

                        document.getElementById(id_row_course_number_schedule).appendChild(newDiv5);

                        let h = c;
                        let g = h - test;

                        //Добавляется новая строка для таблиц с расписанием,
                        //для частично заполненной строки
                        for (h; h >= g; h--) {
                            let newDiv7 = document.createElement('div');
                            newDiv7.className = 'collapse';
                            newDiv7.id = id_row_course_number + 'collapseSchedule' + h;

                            let innerDiv7 = '<div class="cardd card-body"><div class="row no-margin">' +
                                '<div class="text-for-sq-g">Группа&nbsp;</div><div class="text-for-sq-gn">' +
                                mas[a].Course[b].Group[h].GroupName + '</div></div><table class="table table-bordered no-margin">' +
                                '<thead><tr><th scope="col"></th><th scope="col">Расписание занятий с учетом замен</th>' +
                                '<th scope="col">Дисциплина, МДК</th> <th scope="col">Пара</th> <th scope="col">Аудитория</th>' +
                                '</tr></thead><tbody>';

                            if (mas[a].Course[b].Group[h].Discipline.LessonNumber1 != undefined) {
                                innerDiv7 = innerDiv7 + '<tr><td></td><td>' +
                                    mas[a].Course[b].Group[h].Discipline.LessonNumber1.Teacher +
                                    '</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber1.DisciplineName +
                                    '</td><td>1</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber1.LectureRoom +
                                    '</td></tr>';
                            }
                            if (mas[a].Course[b].Group[h].Discipline.LessonNumber2 != undefined) {
                                innerDiv7 = innerDiv7 + '<tr><td></td><td>' +
                                    mas[a].Course[b].Group[h].Discipline.LessonNumber2.Teacher +
                                    '</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber2.DisciplineName +
                                    '</td><td>2</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber2.LectureRoom +
                                    '</td></tr>';
                            }
                            if (mas[a].Course[b].Group[h].Discipline.LessonNumber3 != undefined) {
                                innerDiv7 = innerDiv7 + '<tr><td></td><td>' +
                                    mas[a].Course[b].Group[h].Discipline.LessonNumber3.Teacher +
                                    '</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber3.DisciplineName +
                                    '</td><td>3</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber3.LectureRoom +
                                    '</td></tr>';
                            }
                            if (mas[a].Course[b].Group[h].Discipline.LessonNumber4 != undefined) {
                                innerDiv7 = innerDiv7 + '<tr><td></td><td>' +
                                    mas[a].Course[b].Group[h].Discipline.LessonNumber4.Teacher +
                                    '</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber4.DisciplineName +
                                    '</td><td>4</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber4.LectureRoom +
                                    '</td></tr>';
                            }
                            if (mas[a].Course[b].Group[h].Discipline.LessonNumber5 != undefined) {
                                innerDiv7 = innerDiv7 + '<tr><td></td><td>' +
                                    mas[a].Course[b].Group[h].Discipline.LessonNumber5.Teacher +
                                    '</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber5.DisciplineName +
                                    '</td><td>5</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber5.LectureRoom +
                                    '</td></tr>';
                            }
                            if (mas[a].Course[b].Group[h].Discipline.LessonNumber6 != undefined) {
                                innerDiv7 = innerDiv7 + '<tr><td></td><td>' +
                                    mas[a].Course[b].Group[h].Discipline.LessonNumber6.Teacher +
                                    '</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber6.DisciplineName +
                                    '</td><td>6</td><td>' + mas[a].Course[b].Group[h].Discipline.LessonNumber6.LectureRoom +
                                    '</td></tr>';
                            }

                            innerDiv7 = innerDiv7 + '</tbody></table>';
                            newDiv7.innerHTML = innerDiv7;
                            document.getElementById(id_row_schedule_schedule).appendChild(newDiv7);
                        }
                    } else {
                        //Добавляется новая строка для таблиц с расписанием,
                        //для полностью заполненной строки
                        if (test == 3) {
                            let newDiv4 = document.createElement('div');
                            let id_row_schedule_schedule = id_row_course_number_schedule + 'SchedulePlus' + c;

                            newDiv4.className = 'row no-margin w-100';
                            newDiv4.id = id_row_schedule_schedule;

                            document.getElementById(id_row_course_number_schedule).appendChild(newDiv4);

                            let k = c;
                            let j = k-3;

                            for (k; k >= j; k--) {
                                let newDiv6 = document.createElement('div');
                                newDiv6.className = 'collapse';
                                newDiv6.id = id_row_course_number + 'collapseSchedule' + k;

                                let innerDiv6 = '<div class="cardd card-body"><div class="row no-margin">' +
                                    '<div class="text-for-sq-g">Группа&nbsp;</div><div class="text-for-sq-gn">' +
                                    mas[a].Course[b].Group[k].GroupName + '</div></div><table class="table table-bordered no-margin">' +
                                    '<thead><tr><th scope="col"></th><th scope="col">Расписание занятий с учетом замен</th>' +
                                    '<th scope="col">Дисциплина, МДК</th> <th scope="col">Пара</th> <th scope="col">Аудитория</th>' +
                                    '</tr></thead> <tbody>';

                                if (mas[a].Course[b].Group[k].Discipline.LessonNumber1 != undefined) {
                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' +
                                        mas[a].Course[b].Group[k].Discipline.LessonNumber1.Teacher +
                                        '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber1.DisciplineName +
                                        '</td><td>1</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber1.LectureRoom +
                                        '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[k].Discipline.LessonNumber2 != undefined) {
                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' +
                                        mas[a].Course[b].Group[k].Discipline.LessonNumber2.Teacher +
                                        '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber2.DisciplineName +
                                        '</td><td>2</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber2.LectureRoom +
                                        '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[k].Discipline.LessonNumber3 != undefined) {
                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' +
                                        mas[a].Course[b].Group[k].Discipline.LessonNumber3.Teacher +
                                        '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber3.DisciplineName +
                                        '</td><td>3</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber3.LectureRoom +
                                        '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[k].Discipline.LessonNumber4 != undefined) {
                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' +
                                        mas[a].Course[b].Group[k].Discipline.LessonNumber4.Teacher +
                                        '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber4.DisciplineName +
                                        '</td><td>4</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber4.LectureRoom +
                                        '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[k].Discipline.LessonNumber5 != undefined) {
                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' +
                                        mas[a].Course[b].Group[k].Discipline.LessonNumber5.Teacher +
                                        '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber5.DisciplineName +
                                        '</td><td>5</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber5.LectureRoom +
                                        '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[k].Discipline.LessonNumber6 != undefined) {
                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' +
                                        mas[a].Course[b].Group[k].Discipline.LessonNumber6.Teacher +
                                        '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber6.DisciplineName +
                                        '</td><td>6</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber6.LectureRoom +
                                        '</td></tr>';
                                }

                                innerDiv6 = innerDiv6 + '</tbody></table>';
                                newDiv6.innerHTML = innerDiv6;
                                document.getElementById(id_row_schedule_schedule).appendChild(newDiv6);
                            }
                        }
                    }
                }
            }
        }
    }
}