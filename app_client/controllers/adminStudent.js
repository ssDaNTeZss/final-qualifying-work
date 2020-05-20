function adminStudentCtrl($http, $location, $scope) {
    let p1 = $http.get('/api/packs', {
        headers: {
            token: localStorage.getItem('token')
        }
    });

    p1.then(res => {
        },
        err => {
            $location.path('/login');
        }
    );

    document.getElementById('hb1' ).style.display = 'none';
    let objSel  = document.getElementById('exampleFormControlSelect1' );
    let objSelValue;
    status = 0;

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
        mas = jsonObj['MAS'];

        for (let a = 0; a < mas[6].NewsForStudents.length; a++) {
            objSelValue = "str" + a;
            objSel.options[a] = new Option(mas[6].NewsForStudents[a].Title, objSelValue);
        }
    }

    $( "#searchForNews" ).click(function() {
        if (status == 1) {
            document.getElementById("formNewsForStudents").remove();
        }

        let newForm = document.createElement('form');
        newForm.id = 'formNewsForStudents';

        newForm.innerHTML = '<form><div class="form-group"><label for="formControlInput0">Текст блока "Заголовок новости"</label><input type="text" class="form-control" id="formControlInput0"></div>' +
            '<div class="form-group"><label for="formControlTextarea0">Текст блока "Подзаголовок новости"</label>' +
            '<textarea class="form-control" id="formControlTextarea0" name="nameFormControlTextarea2" rows="7"></textarea></div>' +
            '<div class="form-group"><label for="formControlTextarea1">Текст блока "Основной текст новости"</label>' +
            '<textarea class="form-control" id="formControlTextarea1" name="nameFormControlTextarea2" rows="16"></textarea></div></form>';

        document.getElementById("divUpdateGovernance").appendChild(newForm);

        document.getElementById("formControlInput0").value = mas[6].NewsForStudents[objSel.options.selectedIndex].Title;
        document.getElementById("formControlTextarea0").value = mas[6].NewsForStudents[objSel.options.selectedIndex].Subtitle;
        document.getElementById("formControlTextarea1").value = mas[6].NewsForStudents[objSel.options.selectedIndex].Text;

        status = 1;
        document.getElementById('updateDataStudentNews' ).style.display = 'block';
    });

    $( "#updateDataEnrolleeNews" ).click(function() {
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            let p1 = $http.put('/api/masData', {
                indexStudentNews: objSel.options.selectedIndex,
                titleStudentNews: document.getElementById("formControlInput0").value,
                subtitleStudentNews: document.getElementById("formControlTextarea0").value,
                textStudentNews: document.getElementById("formControlTextarea1").value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });

    $( "#delDataEnrolleeNews" ).click(function() {
        let isQ = confirm("Вы уверены? Это удалит запись...");
        let index = objSel.options.selectedIndex;
        if (isQ) {
            let p1 = $http.delete('/api/masData/' + index, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });
}