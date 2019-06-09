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
		postvm.isFeatured = false;
        postvm.previousPostUri = '';
        postvm.previousPostTitle = '';
        postvm.nextPostUri = '';
        postvm.nextPostTitle = '';
        postvm.tags = [];
        return postvm;
    };
    _this.createBlogVm = function() {
        var blogvm = {}
        blogvm.posts = [];
        blogvm.responseCode = 0;
        blogvm.error = '';

        return blogvm;
    };
}]);