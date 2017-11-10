using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Threading;
using carlserver.DataAccess;
using Newtonsoft.Json;
using carlserver.models.Entities;

namespace carlserver.commentReceiver
{
    class Program
    {
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
        using(var connection = factory.CreateConnection())
        using(var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: "task_queue", durable: true, exclusive: false, autoDelete: false, arguments: null);

            channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);

            Console.WriteLine(" [*] Waiting for messages.");

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0}", message);
                
                // Lost post
                Comment c = JsonConvert.DeserializeObject<Comment>(message);
                BlogReader br = new BlogReader();
                string serializedPost = br.GetPost(c.PostUri);
                Post p = JsonConvert.DeserializeObject<Post>(serializedPost);

                // Add comment, figure out comment id
                c.Id = p.Comments.Count+1;
                p.Comments.Add(c);

                // Serialize
                string postString = JsonConvert.SerializeObject(p);
                Console.WriteLine("Post to save " + postString);
                
                // Save post
                BlogWriter bw = new BlogWriter();
                bw.SavePost(p.FriendlyUri, postString); 

                Console.WriteLine(" [x] Done");

                channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            };
            channel.BasicConsume(queue: "task_queue", autoAck: false, consumer: consumer);

            Console.WriteLine(" Press [enter] to exit.");
            Console.ReadLine();
        }
        }
    }
}
