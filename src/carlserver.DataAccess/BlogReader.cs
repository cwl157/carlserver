using System;

namespace carlserver.DataAccess
{
    public class BlogReader
    {
        public string GetSummaries()
        {
            string result = "";
            try
            {
            result = System.IO.File.ReadAllText(FilePaths.BLOG_SUMMARIES_PATH);
            Console.WriteLine("Blog Summary: "+result);
            }
            catch (Exception e)
            {
                result = "";
            }
            return result;
        }

        public string GetPost(string postUri)
        {
            string result = "";
            try
            {
                result = System.IO.File.ReadAllText(string.Format(FilePaths.BLOG_POST_PATH, postUri));
                Console.WriteLine("Post contents: "+result);
            }
            catch (Exception e)
            {
                result = "";
            }
            return result;
        }
    }
}
