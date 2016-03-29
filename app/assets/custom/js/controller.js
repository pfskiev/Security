(function(){
    function HeroCtrl ($scope, $http) {
        this.$scope = $scope;
        this.header = {
            title: 'Three lock',
        }
        this.title = 'Please send us feedback!';
        this.userName = '';

        $scope.project = {
            description: 'Nuclear Missile Defense System',
            rate: 500
        };

        var sidenav = $('#sidenavToggle')
        var toggleSidenav = Rx.Observable.fromEvent(sidenav, 'click');
        toggleSidenav.subscribe(
            function (x) {
                $mdSidenav('left').toggle();
                console.log('Next: %s', x);
            },
            function (err) {
                console.log('Error: %s', err);
            },
            function () {
                console.log('Completed');
            });

        sidenav.trigger('click')

        //$scope.openLeftMenu = function() {
        //    $mdSidenav('left').toggle();
        //};

        var source = Rx.Observable.ofObjectChanges($scope.project);

        var update = $('#sendRequest');

        var watch = Rx.Observable.fromEvent(update, 'click');

        var subscription = watch.subscribe(
            function (x) {
                $http.get('http://localhost:8000/snippets/').success(function(res){
                    debugger
                })
                console.log('Next: Clicked!');
            },
            function (err) {
                console.log('Error: %s', err);
            },
            function () {
                console.log('Completed');
            });

        update.trigger('click');

        source.subscribe(
            function (x) {
                console.log('Next: %s', JSON.stringify(x));
            },
            function (err) {
                console.log('Error: %s', err);
            },
            function () {
                console.log('Completed');

            });

    }

    HeroCtrl.$inject = ['$scope', '$http'];

    angular
        .module('App')
        .controller('HeroCtrl', HeroCtrl)
}());
