using System;


public class Comment
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public string Name { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public DateTime CreateDate { get; set; }
}