using carlserver.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carlserver.Repositories
{
    public interface IPostRepository
    {
        IEnumerable<Post> GetSummaries(string basePath);
        Post GetPostById(int id);
        Post GetPostByFriendlyName(string basePath, string name);
        Post UpdatePostById(int id);
        Post UpdatePostByFriendlyName(string name);

        IEnumerable<Post> UpdateSummaries(IEnumerable<Post> posts);
    }
}
