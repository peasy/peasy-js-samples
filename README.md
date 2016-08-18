![peasy](https://www.dropbox.com/s/2yajr2x9yevvzbm/peasy3.png?dl=0&raw=1)

### Showcases a middle tier built with peasy-js.

A full implementation of a middle tier built using the [peasy-js framework](https://github.com/peasy/peasy-js) and consumed by nodejs can be found here.  You can clone the repo (```git clone https://github.com/peasy/peasy-js-samples.git```) or download the entire solution as a [zip](https://github.com/peasy/peasy-js-samples/archive/master.zip).

The sample application is a ficticious order entry / inventory management system web api.  All efforts were made to keep this application as simple as possible to keep the focus on how a middle tier is written with peasy-js and consumed by multiple clients (client and server).

By default, this project is configured to use in-memory implementations of the [data proxies](https://github.com/peasy/peasy-js/wiki/Data-Proxy).  However, there is a multitude of configuration possibilities.  The [configurations](https://github.com/peasy/peasy-js-samples#configurations) section provides details on setting up many potential configurations.

### Requirements

1. [nodejs](https://nodejs.org/) - this application is a nodejs application and requires nodejs to be installed.
2. [postman](https://www.getpostman.com/), [fiddler](https://www.telerik.com/download/fiddler), [cURL](https://curl.haxx.se/download.html), or similar - these tools help to facilitate hitting http endpoints.
3. [mongodb](https://www.mongodb.com/) (optional) - this application by default is configured to work with in-memory data proxies, however, you can easily swap data proxies to interact with a mongodb instance if desired.

### Running the application

From a command line, navigate to the peasy-js-samples directory and run:

1. ``` npm install ```
2. ```node index.js```

### Testing out the application

To ensure that the application is up and running, navigate to the following url in your browser of choice:

<img src="https://www.dropbox.com/s/0h5z21e8o891cp2/Screen%20Shot%202016-08-18%20at%202.42.53%20PM.png?dl=0&raw=1" width="300">

The above response ensures that the app is operational.  You may also test these end points:
* http://localhost:3000/orders
* http://localhost:3000/orderitems
* http://localhost:3000/products
* http://localhost:3000/categories
* http://localhost:3000/inventoryitems

### Application Walkthrough

This walkthrough will cover creating a customer, category, product, and placing an order on behalf of the new customer.  Further, you will ship an order and see how it affects inventory as well.


### Mongodb Configuration

The sample applications can be configured to interact with a mongodb database.  With mongodb installed and running, here are the steps to setup the application to interact with it:

* Open wireUpRoutes.js
* Locate and comment out the following line: ```javascript var proxyFactory =require('./data_proxies/in-memory/inMemoryDataProxyFactory');```
* Locate and uncomment the following line:
```javascript
var proxyFactory = require('./data_proxies/mongo/mongoDataProxyFactory');
```
* Restart the application to ensure that the new proxies are consumed
* Test the app according to [these](https://github.com/peasy/peasy-js-samples/blob/master/README.md#testing-out-the-application) steps 

<img src="https://www.dropbox.com/s/wi7uskhfhnj23xc/Screen%20Shot%202016-08-18%20at%203.05.52%20PM.png?dl=0&raw=1" width=600 />

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
