angular.module("sumModule",["ngRoute"]).controller("sumCtrl",["$scope","$routeParams","$location",function(t,n,e){t.list={summand1:parseInt(n.summand1)||"",summand2:parseInt(n.summand2)||""},t.setUrl=function(){t.list.summand1&&t.list.summand2&&e.path("/"+t.list.summand1+"/"+t.list.summand2)},$http.get("http://api.fixer.io/latest").then(function(t){console.log(t)},function(t){console.log("Oops!")})}]).directive("laSum",function(){return{restrict:"E",scope:{list:"="},template:'<input type="text" readonly="true" value="{{ summarize() }}" />',link:function(t){function n(){return _.reduce(t.list,function(t,n){return t+n},0)}function e(t){return"sum is: "+t}function u(t){console.log(t)}var o=_.compose(u,e);t.summarize=function(){return o(n()),n()}}}}).config(["$routeProvider",function(t){t.when("/",{templateUrl:"partials/sum.html",controller:"sumCtrl"}).when("/:summand1/:summand2",{templateUrl:"partials/sum.html",controller:"sumCtrl"}).otherwise({redirectTo:"/"})}]);