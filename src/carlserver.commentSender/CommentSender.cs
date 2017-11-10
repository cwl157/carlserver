using System;
using carlserver.models.Entities;
using RabbitMQ.Client;
using System.Text;

namespace carlserver.commentSender
{
    public class CommentSender
    {
        private ConnectionFactory _factory;

        public CommentSender()
        {
            _factory = new ConnectionFactory() {HostName = "localhost" };
        }

        public void SendComment(string friendlyUri, string commentToSend)
        {
            using(var connection = _factory.CreateConnection())
            using(var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "task_queue", durable: true, exclusive: false, autoDelete: false, arguments: null);
                var properties = channel.CreateBasicProperties();
                properties.Persistent = true;
                string msg = commentToSend;
                var body = Encoding.UTF8.GetBytes(msg);

                channel.BasicPublish(exchange: "", routingKey: "task_queue", basicProperties: properties, body: body);
                Console.WriteLine(" [x] Sent {0}", msg);
                
            }
        }
    }
}
