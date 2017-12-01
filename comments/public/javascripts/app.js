angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.comments = [];
    $scope.addComment = function() {
      var newcomment = {title:$scope.formContent,upvotes:0};
      $scope.formContent='';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });
    };

     $scope.dovote = function() {
     angular.forEach($scope.comments, function(value,key) {
       if(value.selected) {
          $scope.upvote(value);
       //   $scope.comments.push(value);
        }
      });
     }



    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          comment.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    }; 
     $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
    $scope.getAll();

  }
]);
