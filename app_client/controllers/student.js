function studentCtrl($http, $location, $scope) {
    clock ();

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });

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
        let mas = jsonObj['MAS'];

        let masNewsForStudents = mas[6].NewsForStudents;

        for (let a = masNewsForStudents.length - 1; a >= 0; a++) {
            let newDiv = document.createElement("div");
            newDiv.className = 'col-12 block-SaGB';
            let idNewsForStudents = 'NewsForStudents' + a;

            newDiv.innerHTML = '<div data-toggle="collapse" data-target="#' + idNewsForStudents + '" aria-expanded="false" aria-controls="collapseExample">' +
                '<div class="row header3-no-margin">'+ masNewsForStudents[a].Title + '</div>' +
                '<div class="row text2vw">' + masNewsForStudents[a].Subtitle + '</div>' +
                '<div class="row text1-8vw"><div class="collapse" id="' + idNewsForStudents + '">' + masNewsForStudents[a].Text + '</div></div></div>';

            document.getElementById("divContent").appendChild(newDiv);
        }
    }
}