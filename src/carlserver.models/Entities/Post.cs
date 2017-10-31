using System;
using System.Collections.Generic;

namespace carlserver.models.Entities
{
    public class Post
    {
        public int Id { get; set;  }
        public string Title { get; set; }
        public string Summary {get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public DateTime PublishedDate { get; set; }
        public string FriendlyUri { get { return Title.ToLower().Replace(' ', '-'); } }

        public bool IsPublished { get; set; }
        public List<Comment> Comments {get;set;}
    }
}
