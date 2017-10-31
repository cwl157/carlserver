using System;
using carlserver.commentSender;
using carlserver.models.Entities;

namespace carlserver.commentSenderTester
{
    class Program
    {
        static void Main(string[] args)
        {
            Comment c = new Comment();
            c.Name = "Carl";
            c.Subject = "Test Subject";
            c.Body = "Test Body";
            c.CreateDate = DateTime.Now;

            CommentSender cs = new CommentSender();

            cs.SendComment(c);

            
        }
    }
}
