using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using carlserver.Models.DomainModels;
using carlserver.Models.ViewModels;
using carlserver.Repositories;
using Microsoft.AspNetCore.Hosting;

namespace carlserver.Controllers
{
    public class EditController : Controller
    {
        IHostingEnvironment _app;
        IPostRepository _repo;

        public EditController(IHostingEnvironment a, IPostRepository r)
        {
            _app = a;
            _repo = r;
        }

        public IActionResult Index(string name = null)
        {
            PostViewModel pvm = new PostViewModel();
            if (name != null)
            {
                string filePath = _app.WebRootPath;
                pvm = _repo.GetPostByFriendlyName(filePath, name);
            }
            return View(pvm);
        }

        [HttpPost]
        public IActionResult UpdatePost(PostViewModel p)
        {
            string filePath = _app.WebRootPath;
            PostViewModel result = _repo.UpdatePost(filePath, p);

            return RedirectToAction("Index", new { name = result.FriendlyUri });
        }

        
    }
}