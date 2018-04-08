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
        JsonPostRepository _repo;

        public EditController(IHostingEnvironment a)
        {
            _app = a;
            _repo = new JsonPostRepository();
        }

        public IActionResult Index(string name)
        {
            string filePath = _app.WebRootPath;
            PostViewModel pvm = _repo.GetPostByFriendlyName(filePath, name);
            return View(pvm);
        }

        [HttpPost]
        public IActionResult UpdatePost(PostViewModel p)
        {
            Post result = _repo.UpdatePostByFriendlyName(p.FriendlyUri);

            return RedirectToAction("Index", new { name = result.FriendlyUri });
        }

        
    }
}