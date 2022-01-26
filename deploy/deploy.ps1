
Remove-Item ..\dist\* -Recurse
dotnet publish ..\src\carlserver\carlserver.blazor\Client\carlserver.blazor.Client.csproj -c Release -o ..\dist\output
cd ..\prerender
npx react-snap
Write-Host 'Delete last 2 script tags in index.html'
cd ..\deploy