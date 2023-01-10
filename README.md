# Online-Store
#### Online store app
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
## Functionalities
* Browsing, sorting, searching and filtering products
* Creating a shopping cart with products
* Login and registration
* Placing orders
* Viewing placed orders
* Handling orders by the administrator
## Architecture
* ASP.NET Core Web API
* React
* Repository-Service pattern
* JSON Web Token
* Entity Framework Core
* Microsoft SQL Server
## Database (MS SQL Server)
![onlineStoreDiagram](https://user-images.githubusercontent.com/85680066/211432278-347ff798-6542-4b1f-b89f-3bc9d612c2df.png)


