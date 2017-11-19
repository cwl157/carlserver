app.controller('postCtrl', ['$scope', 'BlogService', 'ViewModelService', function($scope, BlogService, ViewModelService) {
    var locationParts = window.location.pathname.split('/');
    var uri = locationParts[locationParts.length-1];
    $scope.commenter = ViewModelService.createCommentVm();
    var postPromise = BlogService.fetchSingle(uri);
    postPromise.then(
        function (success) {
           
            var data = success;
            if (data.responseCode === 200) 
            {
                if (data.isPublished === true) {
                    $scope.postData = data;
                }
                else
                {
                    // 404? Emtpty
                }
            }
        },
        function (failure) {
            $scope.error = failure.error;
        }
    );

    $scope.addComment = function() {
        $scope.commenter.postUri = uri;
        $scope.commenter.createDate = new Date();

        BlogService.createComment(uri, $scope.commenter).then(function(success){
            var newComment = ViewModelService.createCommentVm();
            newComment.name = $scope.commenter.name;
            newComment.message = $scope.commenter.message;
            newComment.email = $scope.commenter.email;
            newComment.postUri = $scope.commenter.postUri;
            newComment.createDate = $scope.commenter.createDate;
            $scope.postData.comments.unshift(newComment);
            $scope.commenter.name = "";
            $scope.commenter.email = "";
            $scope.commenter.message = "";
            $scope.commenter.postUri = "";
            $scope.commenter.createDate = null;
        }, function(failure){
            $scope.commenter.name = "";
            $scope.commenter.email = "";
            $scope.commenter.message = "";
            $scope.commenter.postUri = "";
            $scope.commenter.createDate = null;
        });
    };
}]);