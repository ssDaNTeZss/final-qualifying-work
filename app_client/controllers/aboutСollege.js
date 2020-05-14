function aboutСollegeCtrl($http, $location, $scope) {
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

    $( "#undo" ).click(function() {
        window.location.href = '/#!/';
    });


    // let p1 = $http.get('/api/packs', {
    //     headers: {
    //         token: localStorage.getItem('token')
    //     }
    // });
    //
    // p1.then(res => {
    //     },
    //     err => {
    //         $location.path('/login');
    //     }
    // );

}