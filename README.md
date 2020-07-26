# Tater
A potato blog. Written by a potato.

This was a quick exercise I did in a weekend to learn Angular and MongoDB (I had never used either before). 
It isn't fancy and in fact does not have a login system, but should serve as an example how an application 
like this could be built on both the client and server sides. It also features 2 backend systems which integrate
with the frontend. First, a C# WebAPI .NET Core 3.1 and MSSQL server, and second the aformentioned Node/MongoDB. 
The idea was to implement the same backend using different tech stacks.

Using this application requires that the client be running as well as *one* of the two available backends.

## Tater Client
The Angular-based client side of the application. Complete with unit/integration tests.

### Building the Client
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running the Client
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Running Client Unit Tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Note that the unit tests are by no means exhaustive or complete at this time.

## Tater Server 1 (C# WebAPI .NET Core 3.1/MSSQL)
The first server-side implementation of the application. This should compile and run out of the box. It also contains a suite of unit tests for the post controller. A SQL project is also included, which contains the required queries, users and stored procedures to setup a database as needed.

### Building the Server 1 (C# WebAPI .NET Core 3.1/MSSQL)
Simply build the server by opening the solution in Visual Studio and choosing Build->Build Solution.

### Running the Server 1 (C# WebAPI .NET Core 3.1/MSSQL)
Simply run the server from Visual Studio by opening the solution in `CSServer` and pressing F5.

### Note about SQL backend:
An in-memory-only data provider may be selected by navigating to the project's `appsettings.json` file and changing `UseInMemoryDataProvider` to true. This is the default option. If this is false, the `ConnectionStrings.Development` string must point to a valid MSSQL database. Setup of this database may be done using Schema Compare utility, in the contained Tater_DB project, which contains all the SQL needed to stand up the database. Note that a login called [tater] must be created at the server, and a user of the same name created in the database with CONNECT and EXECUTE permissions granted. Alternatively, you may edit the connection string to use a Windows user if so desired.

## Tater Server 2 (Node/MongoDB)
The second server-side implementation of the application. Runs on node and currently supports MongoDB. Uses Express. Extensible so another 
database backend could be plugged in. Note that an instance of MongoDB will need to be running at the location indicated in `server.ts`.

### Building the Server 2 (Node/MongoDB)
Navigate to the `server` folder in a terminal and execute `npm run build`.

### Running the Server 2 (Node/MongoDB)
Navigate to the `server` folder in a terminal and execute `npm run start`.