function adminOtherSettingsCtrl($http, $location, $scope) {
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
        showData(data);
    };

    function showData(jsonObj) {
        ConnectionSetup = jsonObj['ConnectionSetup'];

        document.getElementById("formControlInput0").value = ConnectionSetup.UrlForSchedule;
        document.getElementById("formControlInput1").value = ConnectionSetup.TimeToReturn;
        document.getElementById("formControlInput2").value = ConnectionSetup.UrlForNewsEnrollee;
        document.getElementById("formControlInput3").value = ConnectionSetup.UrlForNewsStudent;
    }

    $( "#updateConnectionSetup" ).click(function() {
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            let p1 = $http.put('/api/masData', {
                urlForSchedule: document.getElementById("formControlInput0").value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });

    $( "#updateConnectionSetup2" ).click(function() {
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            let p1 = $http.put('/api/masData', {
                urlForNewsEnrollee: document.getElementById("formControlInput2").value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });

    $( "#updateConnectionSetup3" ).click(function() {
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            let p1 = $http.put('/api/masData', {
                urlForNewsStudent: document.getElementById("formControlInput3").value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });

    let vm = this;
    vm.error = '';

    vm.formWasValidated = false;

    vm.formModel = {
        time: {
            valid: true,
            value: ''
        }
    };

    vm.validate = function () {
        vm.formWasValidated = true;
        const onlyLettersAndDigits = /^[0-9]*[.,]?[0-9]+$/i ;
        for (let field in vm.formModel) {
            vm.formModel[field].valid = onlyLettersAndDigits.test(vm.formModel[field].value);
            vm.formModel[field].infoText = (vm.formModel[field].valid) ? 'Введено верно' : 'Допускаются только целые числа и числа с плавающей точкой (разделитель точка)';
            vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
        }
    };

    $( "#updateTimeUpdate" ).click(function() {
        //console.log('updateTimeUpdate');
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            let p1 = $http.put('/api/masData', {
                timeToReturn: document.getElementById("formControlInput1").value
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });
}