using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace carlserver.Controllers
{
    [Route("api/[controller]")]
    public class BlogController : Controller
    {
        // GET api/values
        [HttpGet]
        public ActionResult Get()
        {
            var s = SetupTestData();
            s = s.OrderByDescending(p => p.PublishedDate).ToList<Post>();
            return Ok(s);
        }

        // GET api/values/5
        [HttpGet("{uri}")]
        public ActionResult Get(string uri)
        {
            var s = SetupTestData();
            Console.WriteLine("Inside get");
            Console.WriteLine(uri);
            foreach (var p in s)
            {
                Console.WriteLine(p.FriendlyUri);
            }
            var entry = s.FirstOrDefault(p => p.FriendlyUri == uri);

            if (entry != null)
            {
                return Ok(entry);
            }

            return NotFound();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private List<Post> SetupTestData()
        {
            List<Post> result = new List<Post>();

            result.Add(new Post {Id = 1, Title = "Welcome", Summary = "Summary goes here. <a href='https://google.com'>Test embedding html</a>", Body = "Body of first post. <a href='https://google.com'>Test embedded html</a>", Author = "Carl Layton", PublishedDate = new DateTime(2017, 09, 25), IsPublished = true});

            result.Add(new Post {Id = 2, Title = "Welcome 2nd post", Summary = "2nd summary goes here", Body = "Body of second post", Author = "Alyssa Layton", PublishedDate = new DateTime(2017, 09, 26), IsPublished = true });

            return result;
        }
    }

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
    }
}
