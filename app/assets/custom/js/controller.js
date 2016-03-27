/**
 * Created by Constantine Podlesny on 27.03.16.
 */

(function(){
    function HeroCtrl ($scope, $http) {
        this.$scope = $scope;
        this.header = {
            title: 'Three lock',
            style: 'md-display-3'

        }
        this.title = 'Please send us feedback!';
        this.userName = '';

        $scope.project = {
            description: 'Nuclear Missile Defense System',
            rate: 500
        };

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
