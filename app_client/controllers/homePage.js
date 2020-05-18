function homePageCtrl($http, $location, $scope) {

    setInterval(function () {
        date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            h = (h < 10) ? '0' + h : h,
            m = (m < 10) ? '0' + m : m,
            document.getElementById('time').innerHTML = h + ':' + m;
    }, 2000);

    var d = new Date();
    var day = new Array("Воскресенье", "Понедельник", "Вторник",
        "Среда", "Четверг", "Пятница", "Суббота");
    var month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря");
    document.getElementById('date').innerHTML = day[d.getDay()] + ", " + d.getDate() + " " + month[d.getMonth()];

    document.getElementById("schedule").onclick = function () {
        window.location.href = '/#!/schedule';
    };

    document.getElementById("aboutCollege").onclick = function () {
        window.location.href = '/#!/about-college';
    };

    document.getElementById("enrollee").onclick = function () {
        window.location.href = '/#!/enrollee';
    };
    // $(document).ready(function(){
    //
    //     $('#button').click(function(){
    //         var toAdd= $('input[name=checkListItem]').val();
    //         $('.list').append("<div class='item'>" + toAdd + "</div>");
    //     });
    //
    //     $(document).on('click', '.item', function(){
    //         $(this).remove();
    //     })
    //
    // });
    //
    //
    //
    //     let vm = this;
    // vm.error = '';
    //
    // vm.formWasValidated = false;
    //
    // vm.formModel = {
    //     login: {
    //         valid: true,
    //         infoText: '',
    //         value: ''
    //     },
    //     password: {
    //         valid: true,
    //         infoText: '',
    //         value: ''
    //     }
    // };
    //
    // vm.validate = function () {
    //     vm.formWasValidated = true;
    //     const onlyLettersAndDigits = /^([-\.a-zа-яё \d]+)$/i;
    //
    //     for (let field in vm.formModel) {
    //         vm.formModel[field].valid = onlyLettersAndDigits.test(vm.formModel[field].value);
    //         vm.formModel[field].infoText = (vm.formModel[field].valid) ? 'Введено верно' : 'Допускаются только буквы и цифры';
    //         vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
    //     }
    // };
    //
    // vm.sendForm = function () {
    //
    //     vm.error = '';
    //
    //     console.log('waiting...');
    //     let p1 = $http.post('/api/login', {
    //         login: vm.formModel.login.value,
    //         password: vm.formModel.password.value,
    //     });
    //
    //     p1.then(res => {
    //         const data = res.data;
    //         localStorage.setItem('token', data.token);
    //         $location.path('/');
    //     }, err => {
    //         console.log('error add practic: ', err);
    //         vm.error = 'Неверно указан логин или пароль!';
    //     });
    // };
}