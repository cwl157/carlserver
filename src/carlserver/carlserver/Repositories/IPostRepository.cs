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
        PostViewModel GetPostByFriendlyName(string basePath, string name);
        PostViewModel UpdatePost(string basePath, PostViewModel vm);
    }
}
