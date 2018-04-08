using carlserver.Models.DomainModels;
using carlserver.Models.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carlserver.Repositories
{
    public class JsonPostRepository : IPostRepository
    {
        public IEnumerable<PostViewModel> GetSummaries(string basePath)
        {

            string blogJsonString = System.IO.File.ReadAllText($@"{basePath}\data\blog\blogsummary.json");
            List<Post> posts = JsonConvert.DeserializeObject<List<Post>>(blogJsonString);
            List<PostViewModel> result = new List<PostViewModel>();
            foreach (Post p in posts)
            {
                result.Add(mapToViewModel(p));
            }
            return result;
        }

        public PostViewModel GetPostByFriendlyName(string basePath, string name)
        {
            string jsonString = System.IO.File.ReadAllText($@"{basePath}\data\blog\posts\{name}.json");
            Post p = JsonConvert.DeserializeObject<Post>(jsonString);
            PostViewModel result = mapToViewModel(p);
            return result;
        }

        public Post GetPostById(int id)
        {
            throw new NotImplementedException();
        }

        public Post UpdatePostByFriendlyName(string name)
        {
            //string jsonString = System.IO.File.ReadAllText($@"{basePath}\data\blog\posts\{name}.json");
            return null;
        }

        public Post UpdatePostById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Post> UpdateSummaries(IEnumerable<Post> posts)
        {
            throw new NotImplementedException();
        }

        private PostViewModel mapToViewModel(Post p)
        {
            PostViewModel pvm = new PostViewModel();
            pvm.Id = p.Id;
            pvm.Title = p.Title;
            pvm.FriendlyUri = p.FriendlyUri;
            pvm.Summary = p.Summary;
            pvm.Body = p.Body;
            pvm.IsPublished = p.IsPublished;
            pvm.PublishedDate = p.PublishedDate;

            return pvm;
        }
    }
}
