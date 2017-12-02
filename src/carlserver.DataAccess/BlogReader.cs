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
            result = System.IO.File.ReadAllText(string.Format(FilePaths.BLOG_SUMMARIES_PATH, FilePaths.ENVIRONMENT));
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
                result = System.IO.File.ReadAllText(string.Format(FilePaths.BLOG_POST_PATH, FilePaths.ENVIRONMENT, postUri));
                Console.WriteLine("Post contents: "+result);
            }
            catch (Exception e)
            {
                result = "";
            }
            return result;
        }

        public bool DoesPostExist(string postUri)
        {
            bool result = false;
            try
            {
                string[] files = System.IO.Directory.GetFiles(string.Format(FilePaths.BLOG_FOLDER, FilePaths.ENVIRONMENT), postUri+".json");
                foreach (string s in files)
                {
                    Console.WriteLine(s);
                }
                if (files.Length > 0)
                {
                    result = true;
                }
            }
            catch (Exception e)
            {
                result = false;
            }

            return result;
        }
    }
}
