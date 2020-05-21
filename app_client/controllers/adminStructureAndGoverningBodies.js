function adminStructureAndGoverningBodiesCtrl($http, $location, $scope) {
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
        showgGovernance(data);
    };

    function showgGovernance(jsonObj) {
        mas = jsonObj['MAS'];

        objSel.options[0] = new Option(mas[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization.HeadFirstBuilding, "1str0");

        for (let a = 1; a < mas[3].StructureAndGoverningBodies.StructuralUnits.length+1; a++) {
            objSelValue = "2str" + a;
                objSel.options[a] = new Option(mas[3].StructureAndGoverningBodies.StructuralUnits[a-1].Name, objSelValue);
        }
    }

    $( "#searchDataStructureAndGoverningBodies" ).click(function() {
        if (status == 1) {
            document.getElementById("form-governance").remove();
        }

        let newForm = document.createElement('form');
        newForm.id = 'form-governance';

        if (objSel.options.selectedIndex == 0) {
            let StructureOfTheEducationalOrganization = mas[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization;

            newForm.innerHTML = '<form><div class="form-group"><label for="formControlInput0">Заголовок первого блока</label>' +
                '<input type="text" class="form-control" id="formControlInput0"></div>' +
                '<div class="form-group"><label for="formControlTextarea0">Текст первого блока</label>' +
                '<textarea type="text" class="form-control" id="formControlTextarea0" rows="4"></textarea></div>' +
                '<div class="form-group"><label for="formControlInput1">Заголовок второго блока</label>' +
                '<input type="text" class="form-control" id="formControlInput1"></div>' +
                '<div class="form-group"><label for="formControlTextarea1">Текст второго блока</label>' +
                '<textarea type="text" class="form-control" id="formControlTextarea1" rows="4"></textarea></div>' +
                '<div class="form-group"><label for="formControlInput2">Заголовок третьего блока</label>' +
                '<input type="text" class="form-control" id="formControlInput2"></div>' +
                '<div class="form-group"><label for="formControlTextarea2">Текст третьего блока</label>' +
                '<textarea type="text" class="form-control" id="formControlTextarea2" rows="8"></textarea></div>' +
                '</form>';

            document.getElementById("divUpdateGovernance").appendChild(newForm);

            document.getElementById("formControlInput0").value = StructureOfTheEducationalOrganization.HeadFirstBuilding;
            document.getElementById("formControlTextarea0").value = StructureOfTheEducationalOrganization.TextFirstBuilding;
            document.getElementById("formControlInput1").value = StructureOfTheEducationalOrganization.HeadSecondBuilding;
            document.getElementById("formControlTextarea1").value = StructureOfTheEducationalOrganization.TextSecondBuilding;
            document.getElementById("formControlInput2").value = StructureOfTheEducationalOrganization.HeadCollegeGoverningBodies;
            document.getElementById("formControlTextarea2").value = StructureOfTheEducationalOrganization.TextCollegeGoverningBodies;
        } else {
            let StructuralUnits = mas[3].StructureAndGoverningBodies.StructuralUnits;

            newForm.innerHTML = '<form><div class="form-group"><label for="formControlInput0">Текст блока "Название подразделения"</label>' +
                '<input type="text" class="form-control" id="formControlInput0"></div>' +
                '<div class="form-group"><label for="formControlInput1">Текст блока "Руководитель подразделения"</label>' +
                '<input type="text" class="form-control" id="formControlInput1"></div>' +
                '<div class="form-group"><label for="formControlInput2">Текст блока "Email"</label>' +
                '<input type="text" class="form-control" id="formControlInput2"></div>' +
                '<div class="form-group"><label for="formControlInput3">Текст блока "Телефон"</label>' +
                '<input type="text" class="form-control" id="formControlInput3"></div>' +
                '<div class="form-group"><label for="formControlInput4">Текст блока "Место нахождения"</label>' +
                '<input type="text" class="form-control" id="formControlInput4"></div></form>';

            document.getElementById("divUpdateGovernance").appendChild(newForm);

            document.getElementById("formControlInput0").value = StructuralUnits[objSel.options.selectedIndex - 1].Name;
            document.getElementById("formControlInput1").value = StructuralUnits[objSel.options.selectedIndex - 1].Manager;
            document.getElementById("formControlInput2").value = StructuralUnits[objSel.options.selectedIndex - 1].Email;
            document.getElementById("formControlInput3").value = StructuralUnits[objSel.options.selectedIndex - 1].Telephone;
            document.getElementById("formControlInput4").value = StructuralUnits[objSel.options.selectedIndex - 1].Location;
        }
        status = 1;
        document.getElementById('updateDataStructureAndGoverningBodies' ).style.display = 'block';
    });

    $( "#updateDataStructureAndGoverningBodies" ).click(function() {
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            if (objSel.options.selectedIndex == 0) {
                let p1 = $http.put('/api/masData', {
                    index: objSel.options.selectedIndex,
                    headFirstBuilding: document.getElementById("formControlInput0").value,
                    textFirstBuilding: document.getElementById("formControlTextarea0").value,
                    headSecondBuilding: document.getElementById("formControlInput1").value,
                    textSecondBuilding: document.getElementById("formControlTextarea1").value,
                    headCollegeGoverningBodies: document.getElementById("formControlInput2").value,
                    textCollegeGoverningBodies: document.getElementById("formControlTextarea2").value,
                }, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
            } else {
                let p2 = $http.put('/api/masData', {
                    index: objSel.options.selectedIndex - 1,
                    name: document.getElementById("formControlInput0").value,
                    manager: document.getElementById("formControlInput1").value,
                    email: document.getElementById("formControlInput2").value,
                    telephone: document.getElementById("formControlInput3").value,
                    location: document.getElementById("formControlInput4").value,
                }, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });
            }
        }
    });
}