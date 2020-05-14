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
        console.log(document.getElementById("formControlInput1").value);
    }

// console.log(document.getElementById("formControlInput1").value);

    $( "#test" ).click(function() {
        console.log('waiting...');
        let p1 = $http.put('/api/masData', {
            headerAboutCollege: document.getElementById("formControlInput1").value,
            textAboutCollege: document.getElementById("formControlTextarea1").value,
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });


    });


}