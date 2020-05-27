function adminHomeCtrl($http, $location, $scope) {
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

    let requestURL = 'testdata/masData.json';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        let data = request.response;
        showText(data);
    };

    function showText(jsonObj) {
        let mas = jsonObj['MAS'];
        document.getElementById("formControlInput1").value = mas[0].DataAboutCollege.HeaderAboutCollege;
        document.getElementById("formControlTextarea1").value = mas[0].DataAboutCollege.TextAboutCollege;
        document.getElementById("formControlInput2").value = mas[1].DataWorkSchedule.HeaderWorkSchedule;
        document.getElementById("formControlTextarea2").value = mas[1].DataWorkSchedule.TextWorkSchedule;
    }

    $( "#updateDataAboutCollege" ).click(function() {
        let isQ = confirm("Вы уверены? Это внесет изменения...");
        if (isQ) {
            let p1 = $http.put('/api/masData', {
                headerAboutCollege: document.getElementById("formControlInput1").value,
                textAboutCollege: document.getElementById("formControlTextarea1").value,
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });

    $( "#updateDataWorkSchedule" ).click(function() {
        let isQ2 = confirm("Вы уверены? Это внесет изменения...");

        if (isQ2) {
            let p1 = $http.put('/api/masData', {
                headerWorkSchedule: document.getElementById("formControlInput2").value,
                textWorkSchedule: document.getElementById("formControlTextarea2").value,
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        }
    });
}