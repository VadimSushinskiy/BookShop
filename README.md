## BookShop App

This is a simple pet-project created by **Vadym Sushynskyi**. 

As architecture choosen was a three-tier architecture, so the entire app was separeted to three layers: *User Interface Layer (UIL)*, which contains all UI or frontend part of the application; *Business Logic Layer (BLL)*, which contains all the business logic, such as API endpoints, authentication, authorization, validation, etc; *Data Access Layer (DAL)*, which is responsible for all access to the database.

Server API this is a RESTful API, server itself is created with *ASP.NET Core Web API*. *MS SQL* Server is selected as the DBMS, and ORM *Entity Framework Core* is used to connect to the database. UI created using *React*. The project also includes authentication and authorization using *JWT tokens*.

Project functionality: the ability to view books, add and remove them from the cart, view book reviews, place orders, register and log in to an account for unauthenticated users. Authenticated users can also perform CRUD operations on their reviews and view their past orders. Administrators have access to the admin panel and can perform CRUD operations on books, authors and publishers, view statistics, and can delete any reviews. Also, sorting, filtering and pagination are implemented in most places
