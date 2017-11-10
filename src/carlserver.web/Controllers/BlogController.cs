using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using carlserver.models.Entities;
using carlserver.DataAccess;
using Newtonsoft.Json;
using carlserver.commentSender;

namespace carlserver.web.Controllers
{
    [Route("api/[controller]")]
    public class BlogController : Controller
    {
        private BlogReader _br;
        private CommentSender _commentSender;

        public BlogController()
        {
            _br = new BlogReader();
            _commentSender = new CommentSender();
        }

        // GET api/values
        [HttpGet]
        public ActionResult Get()
        {
            string summaries = _br.GetSummaries();
            if (string.IsNullOrWhiteSpace(summaries))
            {
                return NotFound();
            }
            Console.WriteLine("Got summaries in controller: "+summaries);
            var s = JsonConvert.DeserializeObject<List<Post>>(summaries);
           // var s = SetupTestData();
            s = s.OrderByDescending(p => p.PublishedDate).ToList<Post>();
            return Ok(s);
        }

        // GET api/blog/title
        [HttpGet("{uri}")]
        public ActionResult Get(string uri)
        {
           string postJson = _br.GetPost(uri);
           if (string.IsNullOrWhiteSpace(postJson))
           {
               return NotFound();
           }
           Post entry = JsonConvert.DeserializeObject<Post>(postJson);
           return Ok(entry);
        }

        // POST api/values
        // [HttpPost]
        // public void Post([FromBody]string value)
        // {
        // }

        [HttpPost]
        [Route("{friendlyUri}/addcomment")]
        public Comment PostComment(string friendlyUri, [FromBody]Comment requestComment)
        {
            Console.WriteLine("Inside PostComment");
            Console.WriteLine("Friendly = "+friendlyUri);
            string commentToSend = JsonConvert.SerializeObject(requestComment);
            _commentSender.SendComment(friendlyUri, commentToSend);
             return requestComment;
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
    }
}
