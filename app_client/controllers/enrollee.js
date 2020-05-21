function enrolleeCtrl($http, $location, $scope) {
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
        showEnrolleeNews(data);
    };

    function showEnrolleeNews(jsonObj) {
        let mas = jsonObj['MAS'];

        let masEnrolleeNews = mas[5].NewsForEnrollee;

        for (let a = masEnrolleeNews.length - 1; a >= 0; a--) {
            let newDiv = document.createElement("div");
            newDiv.className = 'col-12 block-SaGB';
            let idEnrolleeNews = 'EnrolleeNews' + a;

            newDiv.innerHTML = '<div data-toggle="collapse" data-target="#' + idEnrolleeNews + '" aria-expanded="false" aria-controls="collapseExample">' +
                '<div class="row header3-no-margin">'+ masEnrolleeNews[a].Title + '</div>' +
                '<div class="row text2vw">' + masEnrolleeNews[a].Subtitle + '</div>' +
                '<div class="row text2vw"><div class="collapse" id="' + idEnrolleeNews + '">' + masEnrolleeNews[a].Text + '</div></div></div>';

            document.getElementById("divContent").appendChild(newDiv);
        }
    }
}