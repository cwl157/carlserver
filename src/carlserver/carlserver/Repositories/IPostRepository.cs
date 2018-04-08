using carlserver.Models.DomainModels;
using carlserver.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carlserver.Repositories
{
    public interface IPostRepository
    {
        IEnumerable<PostViewModel> GetSummaries(string basePath);
        Post GetPostById(int id);
        PostViewModel GetPostByFriendlyName(string basePath, string name);
        Post UpdatePostById(int id);
        Post UpdatePostByFriendlyName(string name);

        IEnumerable<Post> UpdateSummaries(IEnumerable<Post> posts);
    }
}
