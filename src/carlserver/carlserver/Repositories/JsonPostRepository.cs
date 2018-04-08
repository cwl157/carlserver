using carlserver.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carlserver.Repositories
{
    public class JsonPostRepository : IPostRepository
    {
        public IEnumerable<Post> GetSummaries(string basePath)
        {

            string blogJsonString = System.IO.File.ReadAllText($@"{basePath}\data\blog\blogsummary.json");
            List<Post> posts = JsonConvert.DeserializeObject<List<Post>>(blogJsonString);

            return posts;
        }

        public Post GetPostByFriendlyName(string basePath, string name)
        {
            string jsonString = System.IO.File.ReadAllText($@"{basePath}\data\blog\posts\{name}.json");
            Post result = JsonConvert.DeserializeObject<Post>(jsonString);
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
    }
}
