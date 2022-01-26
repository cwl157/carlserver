namespace carlserver.blazor.Client.Models
{
    public class PostModel
    {
        public int ResponseCode { get; set; }
        public string Error { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public Nullable<DateTime> PublishedDate { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public string FriendlyUri { get; set; }
        public bool IsPublished { get; set; }
        public bool IsFeatured { get; set; }
        public string PreviousPostUri { get; set; }
        public string PreviousPostTitle { get; set; }
        public string NextPostUri { get; set; }
        public string NextPostTitle { get; set; }
        public List<string> Tags { get; set; }

        public PostModel()
        {
            ResponseCode = 0;
            Error = "";
            Id = 0;
            Title = "";
            Summary = "";
            PublishedDate = null;
            Body = "";
            Author = "";
            FriendlyUri = "";
            IsPublished = false;
            IsFeatured = false;
            PreviousPostUri = "";
            PreviousPostTitle = "";
            NextPostUri = "";
            NextPostTitle = "";
            Tags = new List<string>();
        }
    }



    /*
     *  postvm.responseCode = 0;
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
     */
}
