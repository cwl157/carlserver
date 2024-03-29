using carlserver.blazor.Client;
using carlserver.blazor.Client.Models;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton(s => new BlogService());

var host = builder.Build();

var blobService = host.Services.GetRequiredService<BlogService>();
var httpClient = host.Services.GetRequiredService<HttpClient>();
await blobService.InitializeBlogService(httpClient);

await host.RunAsync();
