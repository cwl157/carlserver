using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carlserver.Models.ViewModels
{
    public class PostViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public string PublishedDate { get; set; }
        public string FriendlyUri { get; set; }
        public bool IsPublished { get; set; }
        public string Tags { get; set; }
    }
}
