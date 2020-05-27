function adminGovernanceCtrl($http, $location, $scope) {
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
        showGovernance(data);
    };

    function showGovernance(jsonObj) {
        mas = jsonObj['MAS'];

        objSel.options[0] = new Option(mas[2].Governance[0].Director.FullName, "str0");

        for (let a = 1; a < mas[2].Governance.length; a++) {
            objSelValue = "str" + a;
            objSel.options[a] = new Option(mas[2].Governance[a].FullName, objSelValue);
        }
    }

    $( "#searchDataGovernance" ).click(function() {
        if (status == 1) {
            document.getElementById("form-governance").remove();
        }

        let newForm = document.createElement('form');
        newForm.id = 'form-governance';

        if (objSel.options.selectedIndex == 0) {
            let director = mas[2].Governance[0].Director;
            newForm.innerHTML = '<form><div class="form-group"><label for="formControlInput0">Текст блока "Должность"</label>' +
                '<input type="text" class="form-control" id="formControlInput0"></div><div class="form-group">' +
                '<label for="formControlInput1">Текст блока "ФИО"</label><input type="text" class="form-control" id="formControlInput1"></div>' +
                '<div class="form-group"><label for="formControlInputAdditionally">Текст блока "Дополнительно"</label>' +
                '<input type="text" class="form-control" id="formControlInputAdditionally"></div><div class="form-group">' +
                '<label for="formControlInput2">Текст блока "Телефон"</label><input type="text" class="form-control" id="formControlInput2"></div>' +
                '<div class="form-group"><label for="formControlInput3">Текст блока "Email"</label><input type="text" class="form-control" id="formControlInput3">' +
                '<div class="form-group"><label for="formControlInput4">Текст блока "Место нахождения"</label>' +
                '<input type="text" class="form-control" id="formControlInput4"></div></div></form>';

            document.getElementById("divUpdateGovernance").appendChild(newForm);

            document.getElementById("formControlInput0").value = director.Position;
            document.getElementById("formControlInput1").value = director.FullName;
            document.getElementById("formControlInputAdditionally").value = director.Additionally;
            document.getElementById("formControlInput2").value = director.Telephone;
            document.getElementById("formControlInput3").value = director.Email;
            document.getElementById("formControlInput4").value = director.Location;
        } else {
            newForm.innerHTML = '<form><div class="form-group"><label for="formControlInput0">Текст блока "Должность"</label>' +
                '<input type="text" class="form-control" id="formControlInput0"></div><div class="form-group">' +
                '<label for="formControlInput1">Текст блока "ФИО"</label><input type="text" class="form-control" id="formControlInput1"></div>' +
                '<div class="form-group"><label for="formControlInput2">Текст блока "Телефон"</label>' +
                '<input type="text" class="form-control" id="formControlInput2"></div><div class="form-group">' +
                '<label for="formControlInput3">Текст блока "Email"</label><input type="text" class="form-control" id="formControlInput3"></div>' +
                '<div class="form-group"><label for="formControlInput4">Текст блока "Место нахождения"</label>' +
                '<input type="text" class="form-control" id="formControlInput4"></div></form>';

            document.getElementById("divUpdateGovernance").appendChild(newForm);

            document.getElementById("formControlInput0").value = mas[2].Governance[objSel.options.selectedIndex].Position;
            document.getElementById("formControlInput1").value = mas[2].Governance[objSel.options.selectedIndex].FullName;
            document.getElementById("formControlInput2").value = mas[2].Governance[objSel.options.selectedIndex].Telephone;
            document.getElementById("formControlInput3").value = mas[2].Governance[objSel.options.selectedIndex].Email;
            document.getElementById("formControlInput4").value = mas[2].Governance[objSel.options.selectedIndex].Location;
        }
        status = 1;
        document.getElementById('updateDataGovernance' ).style.display = 'block';
    });

    $( "#updateDataGovernance" ).click(function() {
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            if (objSel.options.selectedIndex == 0) {
                let p1 = $http.put('/api/masData', {
                    indexGovernance: objSel.options.selectedIndex,
                    positionGovernance: document.getElementById("formControlInput0").value,
                    fullNameGovernance: document.getElementById("formControlInput1").value,
                    telephoneGovernance: document.getElementById("formControlInput2").value,
                    emailGovernance: document.getElementById("formControlInput3").value,
                    locationGovernance: document.getElementById("formControlInput4").value,
                    additionallyGovernance: document.getElementById("formControlInputAdditionally").value
                }, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
            } else {
                let p2 = $http.put('/api/masData', {
                    indexGovernance: objSel.options.selectedIndex,
                    positionGovernance: document.getElementById("formControlInput0").value,
                    fullNameGovernance: document.getElementById("formControlInput1").value,
                    telephoneGovernance: document.getElementById("formControlInput2").value,
                    emailGovernance: document.getElementById("formControlInput3").value,
                    locationGovernance: document.getElementById("formControlInput4").value,
                }, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
            }
        }
    });
}