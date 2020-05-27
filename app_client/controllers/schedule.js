function scheduleCtrl($http, $location, $scope) {
    monitoringInactivity ();
    clock ();
    UniversalAccess();

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
                id_row_date + "\">Расписание на </div><hr></div></div>" + "<div class=\"row no-margin\" id=\"" + id_row_schedule + "\">";
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
                        innerDiv1 = '<div class="row no-margin course-number-1">1 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '2':
                        innerDiv1 = '<div class="row no-margin course-number-1">2 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '3':
                        innerDiv1 = '<div class="row no-margin course-number-1">3 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '4':
                        innerDiv1 = '<div class="row no-margin course-number-1">4 Курс</div>';
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