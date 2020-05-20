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
}