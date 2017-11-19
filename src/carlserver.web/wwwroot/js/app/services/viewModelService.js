app.service('ViewModelService',
[ function() {
    var _this = this;

    _this.createPostVm = function() {
        var postvm = {};

        postvm.responseCode = 0;
        postvm.error = '';
        postvm.id = 0;
        postvm.title = '';
        postvm.summary = '';
        postvm.publishedDate = null;
        postvm.body = '';
        postvm.author = '';
        postvm.friendlyUri = '';
        postvm.isPublished = false;
        postvm.comments = [];
        return postvm;
    };
    _this.createCommentVm = function() {
        var commentvm = {};
        commentvm.id = 0;
        commentvm.postUri = "";
        commentvm.name = "";
        commentvm.email = "";
        commentvm.message = "";
        commentvm.createDate = null;
        return commentvm;
    };
    _this.createBlogVm = function() {
        var blogvm = {}
        blogvm.posts = [];
        blogvm.responseCode = 0;
        blogvm.error = '';

        return blogvm;
    };
}]);