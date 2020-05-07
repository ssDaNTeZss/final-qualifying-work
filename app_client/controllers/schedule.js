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
        let mas = jsonObj['MAS'];

        for (let a = 0; a < mas.length; a++) {
            let id_row_date = 'rowDate' + a;
            let id_row_schedule = 'rowSchedule' + a;

            let newDiv = document.createElement("div");
            let innerDiv = "<div class=\"row no-margin\"><div class=\"col-12 schedule-for-the-day no-margin no-padding\" id=\"" + id_row_date + "\">Расписание на </div><hr></div></div>" + "<div class=\"row no-margin\" id=\"" + id_row_schedule + "\">";
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

                switch (nCourse) {
                    case '1':
                        // $(element1).append('1 Курс');
                        innerDiv1 = '<div class="row no-margin course-number-1">1 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;

                        break;
                    case '2':
                        // $(element1).append('2 Курс');
                        innerDiv1 = '<div class="row no-margin course-number-1">2 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '3':
                        // $(element1).append('3 Курс');
                        innerDiv1 = '<div class="row no-margin course-number-1">3 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                    case '4':
                        // $(element1).append('4 Курс');
                        innerDiv1 = '<div class="row no-margin course-number-1">4 Курс</div>';
                        newDiv1.innerHTML = innerDiv1;
                        break;
                }

                let newDiv2 = document.createElement('div');
                let id_row_course_number_schedule = id_row_course_number + 'Schedule' + b;

                newDiv2.className = 'row no-margin w-100';
                newDiv2.id = id_row_course_number_schedule;

                document.getElementById(id_row_course_number).appendChild(newDiv2);

                for (let c = 0; c < mas[a].Course[b].Group.length; c++) {
                    //console.log(mas[a].Course[b].Group.length);
                    //console.log(c);
                    let newDiv3 = document.createElement('div');
                    let id_for_newDiv3 = id_row_course_number + 'Sq' + c;
                    switch (classSq) {
                        case 1:
                            newDiv3.className = 'sq sq-l';
                            classSq++;
                            test = 1;
                            break;
                        case 2:
                            newDiv3.className = 'sq sq-m';
                            classSq++;
                            test = 2;
                            break;
                        case 3:
                            newDiv3.className = 'sq sq-m';
                            classSq++;
                            test = 3;
                            break;
                        case 4:
                            newDiv3.className = 'sq sq-r';
                            classSq = 1;
                            test = 4;
                            //zx = 'go';
                            break;
                    }

                    let id_div_schedule_group_name = id_for_newDiv3 + 'scheduleGroupName' + c;

                    let innerDiv3 = '<div class="sq-wrapper type="button" data-toggle="collapse" data-target="#' + (id_row_course_number + 'collapseSchedule' + c) + '" aria-expanded="false" aria-controls="collapseExample""><div class="sq-content"><div class="row no-margin"><div class="text-for-sq-gr">Группа</div></div><div class="row no-margin"><div class="text-for-sq" id="' + id_div_schedule_group_name + '"></div></div></div></div>';
                    newDiv3.innerHTML = innerDiv3;

                    document.getElementById(id_row_course_number_schedule).appendChild(newDiv3);

                    let element2 = document.getElementById(id_div_schedule_group_name);
                    $(element2).append(mas[a].Course[b].Group[c].GroupName);

                    if ((c + 1) == mas[a].Course[b].Group.length) {
                        //console.log('TEST1');
                        console.log(mas[a].Course[b].Group[c].Discipline.LessonNumber7);
                        let newDiv5 = document.createElement('div');
                        let id_row_schedule_schedule = id_row_course_number_schedule + 'SchedulePlus' + c;

                        newDiv5.className = 'row no-margin w-100';
                        newDiv5.id = id_row_schedule_schedule;

                        document.getElementById(id_row_course_number_schedule).appendChild(newDiv5);
                    } else {
                        if (test == 4) {
                           // console.log('TEST4');
                            let newDiv4 = document.createElement('div');
                            let id_row_schedule_schedule = id_row_course_number_schedule + 'SchedulePlus' + c;

                            newDiv4.className = 'row no-margin w-100';
                            newDiv4.id = id_row_schedule_schedule;

                            document.getElementById(id_row_course_number_schedule).appendChild(newDiv4);

                            let k = c;
                            let j = k-3;

                            for (k; k >= j; k--) {
                                //console.log(k);

                                let newDiv6 = document.createElement('div');
                                newDiv6.className = 'collapse';
                                newDiv6.id = id_row_course_number + 'collapseSchedule' + k;

                               // let innerDiv6 = '<div class="cardd card-body"><table class="table table-bordered"> <thead> <tr> <th scope="col"></th><th scope="col">Расписание занятий с учетом замен</th> <th scope="col">Дисциплина, МДК</th> <th scope="col">Пара</th> <th scope="col">Аудитория</th> </tr> </thead> <tbody> </tbody> </table></div>';
                                let innerDiv6 = '<div class="cardd card-body"><div class="row no-margin"><div class="text-for-sq-g">Группа&nbsp;</div><div class="text-for-sq-gn">' + mas[a].Course[b].Group[k].GroupName + '</div></div><table class="table table-bordered no-margin"> <thead> <tr> <th scope="col"></th><th scope="col">Расписание занятий с учетом замен</th> <th scope="col">Дисциплина, МДК</th> <th scope="col">Пара</th> <th scope="col">Аудитория</th> </tr> </thead> <tbody>';
                                //newDiv6.innerHTML = innerDiv6;

                                //document.getElementById(id_row_schedule_schedule).appendChild(newDiv6);

                                if (mas[a].Course[b].Group[c].Discipline.LessonNumber1 != undefined) {
                                    console.log(mas[a].Course[b].Group[c].Discipline);
                                     innerDiv6 = innerDiv6 + '<tr><td></td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber1.Teacher + '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber1.DisciplineName + '</td><td>1</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber1.LectureRoom + '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[c].Discipline.LessonNumber2 != undefined) {
                                    console.log('ERR');
                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber2.Teacher + '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber2.DisciplineName + '</td><td>2</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber2.LectureRoom + '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[c].Discipline.LessonNumber3 != undefined) {

                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber3.Teacher + '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber3.DisciplineName + '</td><td>3</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber3.LectureRoom + '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[c].Discipline.LessonNumber4 != undefined) {

                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber4.Teacher + '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber4.DisciplineName + '</td><td>4</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber4.LectureRoom + '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[c].Discipline.LessonNumber5 != undefined) {

                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber5.Teacher + '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber5.DisciplineName + '</td><td>5</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber5.LectureRoom + '</td></tr>';
                                }
                                if (mas[a].Course[b].Group[c].Discipline.LessonNumber6 != undefined) {

                                    innerDiv6 = innerDiv6 + '<tr><td></td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber6.Teacher + '</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber6.DisciplineName + '</td><td>6</td><td>' + mas[a].Course[b].Group[k].Discipline.LessonNumber6.LectureRoom + '</td></tr>';
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


        // for (let i = 0; i < mas.length; i++) {
        //     let zx;
        //     let id_div_schedule_date = 'scheduleDate' + i;
        //     let id_schedule_row = 'scheduleRow' + i;
        //     let a = 1;
        //     let newDiv = document.createElement("div");
        //     let innerDiv = "<div class=\"row no-margin\"><div class=\"col-12 schedule-for-the-day no-margin no-padding\" id=\"" + id_div_schedule_date + "\">Расписание на </div><hr></div></div>" + "<div class=\"row no-margin\" id=\"" + id_schedule_row + "\">";
        //     newDiv.innerHTML = innerDiv;
        //     document.getElementById("div-schedule").appendChild(newDiv);
        //
        //     let element = document.getElementById(id_div_schedule_date);
        //     $(element).append(mas[i].Date);
        //
        //     newDiv = null;
        //
        //     for (let l = 0; l < mas[i].Course.length; l++) {
        //         let newDiv1 = document.createElement('div');
        //         let id_div_course_number = id_div_schedule_date + 'scheduleCourseNumber' + l;
        //
        //         newDiv1.className = 'row no-margin сourse-number';
        //         newDiv1.id = id_div_course_number;
        //
        //         document.getElementById(id_schedule_row).appendChild(newDiv1);
        //
        //         let element1 = document.getElementById(id_div_course_number);
        //         let n = mas[i].Course[l].CourseNumber;
        //
        //         switch (n) {
        //             case '1':
        //                 $(element1).append('1 Курс');
        //                 break;
        //             case '2':
        //                 $(element1).append('2 Курс');
        //                 break;
        //             case '3':
        //                 $(element1).append('3 Курс');
        //                 break;
        //             case '4':
        //                 $(element1).append('4 Курс');
        //                 break;
        //         }
        //
        //         for (let j = 0; j < mas[i].Course[0].Group.length; j++) {
        //             let newDiv2 = document.createElement('div');
        //             let id_for_newDiv2 = id_div_schedule_date +'Sq' + j;
        //             switch (a) {
        //                 case 1:
        //                     newDiv2.className = 'sq sq-l';
        //                     //innerDiv2 = innerDiv2 + 'l';
        //
        //                     a++;
        //                     break;
        //                 case 2:
        //                 case 3:
        //                     newDiv2.className = 'sq sq-m';
        //                     //innerDiv2 = innerDiv2 + 'm';
        //                     a++;
        //                     break;
        //                 case 4:
        //                     newDiv2.className = 'sq sq-r';
        //                     //innerDiv2 = innerDiv2 + 'r';
        //                     newDiv2.id = id_for_newDiv2;
        //                     a = 1;
        //                     zx = 'go';
        //                     // let newDiv3 = document.createElement('div');
        //                     // newDiv3.className = 'collapse';
        //                     // newDiv3.id = 'collapseExample';
        //                     // let innerDiv3 = '<div class="card card-body"> Anim pariatur </div>';
        //                     // newDiv3.innerHTML = innerDiv3;
        //                     // document.getElementById('qwerty').appendChild(newDiv3);
        //
        //
        //                     break;
        //             }
        //
        //             let innerDiv2 = '<div class="sq-wrapper" type="button" data-toggle="collapse" data-target="#' + (id_div_schedule_date + 'collapseSchedule' + j) + '" aria-expanded="false" aria-controls="collapseExample"><div class="sq-content"><div class="row no-margin"><div class="text-for-sq-gr">Группа</div></div><div class="row no-margin"><div class="text-for-sq" id="';
        //             let id_div_schedule_group_name = id_div_schedule_date + 'scheduleGroupName' + j;
        //                 innerDiv2 = innerDiv2 + id_div_schedule_group_name;
        //                 innerDiv2 = innerDiv2 + '"></div></div></div></div>';
        //                 newDiv2.innerHTML = innerDiv2;
        //
        //             document.getElementById(id_schedule_row).appendChild(newDiv2);
        //
        //             let element2 = document.getElementById(id_div_schedule_group_name);
        //                 $(element2).append(mas[i].Course[0].Group[j].GroupName);
        //
        //             if (zx == 'go') {
        //                 let k = j;
        //                 let c = k-3;
        //                 zx = 'stop';
        //                 // let newDiv4 = document.createElement('div');
        //                 // newDiv4.className = 'row no-margin';
        //                 // newDiv4.id = 'test';
        //                 // document.getElementById(id_schedule_row).appendChild(newDiv4);
        //                 for (k; k >= c; k--) {
        //                     console.log(k);
        //
        //                     let newDiv3 = document.createElement('div');
        //                     newDiv3.className = 'collapse';
        //                     newDiv3.id = id_div_schedule_date + 'collapseSchedule' + k;
        //                     let innerDiv3 = '<div class="cardd card-body"><table class="table table-bordered"> <thead> <tr> <th scope="col">Расписание занятий с учетом замен</th> <th scope="col">Дисциплина, МДК</th> <th scope="col">Пара</th> <th scope="col">Аудитория</th> </tr> </thead> <tbody> <tr> <th scope="row">1</th> <td>Mark</td> <td>Otto</td> <td>@mdo</td> </tr> <tr> <th scope="row">2</th> <td>Jacob</td> <td>Thornton</td> <td>@fat</td> </tr> <tr> <th scope="row">3</th> <td colspan="2">Larry the Bird</td> <td>@twitter</td> </tr> </tbody> </table></div>';
        //                     newDiv3.innerHTML = innerDiv3;
        //                     document.getElementById(id_schedule_row).appendChild(newDiv3);
        //                     // document.getElementById('test').appendChild(newDiv3);
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}