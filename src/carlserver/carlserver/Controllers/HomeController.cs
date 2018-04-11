using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using carlserver.Models.DomainModels;
using carlserver.Models.ViewModels;
using carlserver.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace carlserver.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _appEnvironment;
        private IPostRepository _repo;

        public HomeController(IHostingEnvironment e, IPostRepository r)
        {
            _repo = r;
            _appEnvironment = e;
        }

        // GET: /<controller>/
        // Admin
        public IActionResult Index()
        {
            string filePath = _appEnvironment.WebRootPath;
            List<PostViewModel> model = _repo.GetSummaries(filePath).ToList();
            return View(model);
        }

        // Client
        public IActionResult Spa()
        {
            return File("~/index.html", "text/html");
        }
    }
}