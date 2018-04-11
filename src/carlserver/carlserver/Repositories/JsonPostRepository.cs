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

        public PostViewModel UpdatePost(string basePath, PostViewModel vm)
        {
            PostViewModel result = null;
            string filePath = $@"{basePath}\data\blog\posts\{vm.FriendlyUri}.json";
            string summaryPath = $@"{basePath}\data\blog\blogsummary.json";
            string blogSummaryJson = System.IO.File.ReadAllText(summaryPath);
            List<Post> posts = JsonConvert.DeserializeObject<List<Post>>(blogSummaryJson);

            if (vm.Id == 0)
            {
                Post lastPost = posts.OrderByDescending(p => p.id).FirstOrDefault();
                // New Post
                Post newPost = new Post();
                newPost.id = lastPost.id + 1;
                newPost.title = vm.Title;
                newPost.author = "Carl Layton";
                newPost.summary = vm.Summary;
                newPost.body = vm.Body;
                newPost.isPublished = vm.IsPublished;
                newPost.publishedDate = vm.PublishedDate;
                newPost.friendlyUri = vm.FriendlyUri;
                newPost.tags = vm.Tags.Split(',').ToList();
                // Set next and previous
                Post previousPost = posts.FirstOrDefault(p => p.id == newPost.id - 1);
                if (previousPost != null)
                {
                    newPost.previousPostUri = previousPost.friendlyUri;
                    newPost.previousPostTitle = previousPost.title;
                }
                Post nextPost = posts.FirstOrDefault(p => p.id == newPost.id + 1);
                if (nextPost != null)
                {
                    newPost.nextPostUri = nextPost.friendlyUri;
                    newPost.nextPostTitle = nextPost.title;
                }
                // Serialize it
                string updatedPostJson = JsonConvert.SerializeObject(newPost);
                // Save it
                System.IO.File.WriteAllText(filePath, updatedPostJson);
                // Add summary   
                newPost.body = "";
                newPost.previousPostTitle = null;
                newPost.previousPostUri = null;
                newPost.nextPostTitle = null;
                newPost.nextPostUri = null;
                posts.Add(newPost);
                // Serialize it
                string updatedSummaryJson = JsonConvert.SerializeObject(posts);
                // Save it
                System.IO.File.WriteAllText(summaryPath, updatedSummaryJson);

                // Update Previous post's next url
                string previousFilePath = $@"{basePath}\data\blog\posts\{previousPost.friendlyUri}.json";
                string previousPostJsonString = System.IO.File.ReadAllText(previousFilePath);
                Post fullPreviousPost = JsonConvert.DeserializeObject<Post>(previousPostJsonString);
                fullPreviousPost.nextPostTitle = newPost.title;
                fullPreviousPost.nextPostUri = newPost.friendlyUri;
                string updatedPreviousPostJson = JsonConvert.SerializeObject(fullPreviousPost);
                System.IO.File.WriteAllText(previousFilePath, updatedPreviousPostJson);

                // Return it
                result = mapToViewModel(newPost);
            }
            else
            {
                // Read it
                string jsonString = System.IO.File.ReadAllText(filePath);
                Post p = JsonConvert.DeserializeObject<Post>(jsonString);
                // Update it
                p.body = vm.Body;
                p.title = vm.Title;
                p.isPublished = vm.IsPublished;
                p.summary = vm.Summary;
                p.publishedDate = vm.PublishedDate;
                p.tags = vm.Tags.Split(',').ToList();
                // Serialize it
                string updatedPostJson = JsonConvert.SerializeObject(p);
                // Save it
                System.IO.File.WriteAllText(filePath, updatedPostJson);
                // Update summary
                Post summaryPost = posts.FirstOrDefault(ps => ps.id == p.id);
                if (summaryPost != null)
                {
                    summaryPost.title = p.title;
                    summaryPost.summary = p.summary;
                    summaryPost.body = "";
                    summaryPost.publishedDate = p.publishedDate;
                    summaryPost.isPublished = p.isPublished;
                    summaryPost.tags = p.tags;
                    // Serialize it
                    string updatedSummaryJson = JsonConvert.SerializeObject(posts);
                    // Save it
                    System.IO.File.WriteAllText(summaryPath, updatedSummaryJson);
                }

                // Return it
                result = mapToViewModel(p);
            }
            
            return result;
        }

        private PostViewModel mapToViewModel(Post p)
        {
            PostViewModel pvm = new PostViewModel();
            pvm.Id = p.id;
            pvm.Title = p.title;
            pvm.FriendlyUri = p.friendlyUri;
            pvm.Summary = p.summary;
            pvm.Body = p.body;
            pvm.IsPublished = p.isPublished;
            pvm.PublishedDate = p.publishedDate;
            if (p.tags != null)
            {
                foreach (string t in p.tags)
                {
                    pvm.Tags += t + ",";
                }
                pvm.Tags = pvm.Tags.Substring(0, pvm.Tags.Length - 1);
            }

            return pvm;
        }
    }
}
