# Online-Store
## Configuration
* Change database ConnectingString in [appsettings.json](OnlineStore.API/appsettings.json)
````json
"ConnectionStrings": {
    "OnlineStoreConnection": "Server=(localdb)\\mssqllocaldb;Database=OnlineStoreDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
````
* In Package Manager Console run `update-database` command
* Run the program to load sample data to the database and start the server
* Navigate in the terminal to the folder "reading-list-frontend"
* Run two commands: `npm install` and `npm start`
## Architecture
* ASP.NET Core Web API
* React
* Repository-Service pattern
* JSON Web Token
* Entity Framework Core
* Microsoft SQL Server
## Database (MS SQL Server)
![onlineStoreDiagram](https://user-images.githubusercontent.com/85680066/209131440-6cecdf29-a24e-4da1-9f81-b6520c60c215.png)
