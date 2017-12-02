using System;

namespace carlserver.DataAccess
{
    public class BlogWriter
    {
        public void SavePost(string uri, string post)
        {
            System.IO.File.WriteAllText(string.Format(FilePaths.BLOG_POST_PATH, FilePaths.ENVIRONMENT, uri), post);
        }
    }
}