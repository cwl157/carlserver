using carlserver.blazor.Client.Models;
using System.Net.Http.Json;

namespace carlserver.blazor.Client
{
    public class BlogService
    {
        private List<PostModel> _posts;
        private string _initError;

        public BlogService()
        {
            _posts = new List<PostModel>();
            _initError = "";
        }

        public async Task InitializeBlogService(HttpClient http)
        {
            try
            {
                // _posts = await http.GetFromJsonAsync<List<PostModel>>("/data/blog/blogsummary.json") ?? new List<PostModel>();
                _posts = await http.GetFromJsonAsync<List<PostModel>>("/data/blog.json") ?? new List<PostModel>();
            }
            catch (Exception e)
            {
                _initError = "Error retrieving data";
            }
        }

        public List<PostModel> Posts { get { return _posts; } }

        public string ErrorMessage { get { return _initError; } }
        public bool IsError { get { return !string.IsNullOrEmpty(ErrorMessage); } }
    }
}
