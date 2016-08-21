![peasy](https://www.dropbox.com/s/2yajr2x9yevvzbm/peasy3.png?dl=0&raw=1)

### Showcases a middle tier built with peasy-js.

A full implementation of a middle tier built using the [peasy-js framework](https://github.com/peasy/peasy-js) and consumed by nodejs can be found here.  You can clone the repo or download the entire solution as a [zip](https://github.com/peasy/peasy-js-samples/archive/master.zip).

The sample application is a ficticious order entry / inventory management system web api.  All efforts were made to keep this application as simple as possible to keep the focus on how a middle tier is written with peasy-js and consumed by multiple clients.

By default, this project is configured to use in-memory implementations of the [data proxies](https://github.com/peasy/peasy-js/wiki/Data-Proxy).  However, there is a multitude of configuration possibilities.  The [configurations](https://github.com/peasy/Samples#configurations) section provides details on setting up many potential configurations.

### Requirements

1. [nodejs](https://nodejs.org/) - this application is a nodejs application and requires nodejs to be installed
2. [postman](https://www.getpostman.com/), [fiddler](https://www.telerik.com/download/fiddler), [cURL](https://curl.haxx.se/download.html), or similar - these tools can help to easily hit http endpoints
3. [mongodb](https://www.mongodb.com/) (optional) - this application by default is configured to work with in-memory data proxies, however, you easily swap data proxies to interact with a mongodb instance if desired.

### Running the application

The sample web api is a nodejs application that consumes middle tier logic written with peasy-js.  

From a command line, navigate to the peasy-js-samples directory and run: ```node index.js```

### Mongodb Configuration

The sample applications can be configured to interact with a mongodb database.  Here are the steps to setup a setup the application to interact with one:

![sql-setup](https://www.dropbox.com/s/g7x7oss660iz1ms/sql-setup.png?dl=0&raw=1)

### Configurations

Because these clients consume a middle tier written with peasy, they can be configured in different ways to suit your needs.  Below are multiple available configurations that serve to showcase how you might run and/or deploy applications consuming your middle tier written with peasy.

* [WPF &#8594; In Memory](https://github.com/peasy/Samples/wiki/Configuring-WPF-%E2%86%92--In-Memory)
* [WPF &#8594; SQL Server](https://github.com/peasy/Samples/wiki/Configuring-WPF-%E2%86%92-SQL-Server)
* [WPF &#8594; Web API &#8594; In Memory](https://github.com/peasy/Samples/wiki/Configuring-WPF-%E2%86%92-Web-API-%E2%86%92-In-Memory)
* [WPF &#8594; Web API &#8594; SQL Server](https://github.com/peasy/Samples/wiki/Configuring-WPF-%E2%86%92-Web-API-%E2%86%92-SQL-Server)
* [ASP.NET MVC &#8594; In Memory](https://github.com/peasy/Samples/wiki/Configuring-ASP.NET-MVC-%E2%86%92-In-Memory)
* [ASP.NET MVC &#8594; SQL Server](https://github.com/peasy/Samples/wiki/Configuring-ASP.NET-MVC-%E2%86%92-SQL-Server)
* [ASP.NET MVC &#8594; Web API &#8594; In Memory](https://github.com/peasy/Samples/wiki/Configuring-ASP.NET-MVC-%E2%86%92-Web-API-%E2%86%92-In-Memory)
* [ASP.NET MVC &#8594; Web API &#8594; SQL Server](https://github.com/peasy/Samples/wiki/Configuring-ASP.NET-MVC-%E2%86%92-Web-API-%E2%86%92-SQL-Server)
* [Multiple Clients &#8594; Web API &#8594; (In Memory or SQL Server)](https://github.com/peasy/Samples/wiki/Configuring-Multiple-Clients-%E2%86%92-Web-API-%E2%86%92-(In-Memory-or-SQL-Server))

### Videos

Coming soon ...

### Solution and Project Structure

An overview of the solution and all of the projects can be viewed [here](https://github.com/peasy/Samples/wiki/Solution-and-project-structure).