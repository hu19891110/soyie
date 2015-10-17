/**
 * Created by evio on 15/9/14.
 */
require('./test.html');
var soyie = require('../src/index');

window.s = {
    a:1,
    b:2,
    dist: {
        a:1
    }
};

soyie.component('t', {
    props: ['dist']
});
soyie.component('s', {
    props: ['supper']
});

soyie.ready(() => {
    soyie.bootstrap('app', s, function(scope){
        setTimeout(function(){
            scope.dist.supper = {};
            scope.dist.supper.a = function(){return 2;};
            scope.dist.supper.list = [
                { a:3, b:4, c: [1,2,3,4,5] },
                { a:5, b:6, c: [6,7,8,9,1] },
                { a:7, b:8, c: [324,4543,657,86] }
            ];
            setTimeout(function(){
                scope.dist.supper.list = [
                    { a:6, b:4, c: [1,2,3,4,5] },
                    { a:7, b:6, c: [6,7,8,9,1] },
                    { a:8, b:8, c: [324,4543,657,86] }
                ];
            }, 3000);
        }, 1000);
    });
});