using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carlserver.Models.DomainModels
{
    public class Post
    {
        public int id { get; set; }
        public string title { get; set; }
        public string summary { get; set; }
        public string body { get; set; }
        public string author { get; set; }
        public string publishedDate { get; set; }
        public string friendlyUri { get; set; }
        public bool isPublished { get; set; }
        public string previousPostUri { get; set; }
        public string previousPostTitle { get; set; }
        public string nextPostUri { get; set; }
        public string nextPostTitle { get; set; }
        public List<string> tags { get; set; }
    }
}
