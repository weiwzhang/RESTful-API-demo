# RESTful-API-demo
a simple RESTful API service supporting CRUD operations (POST, GET, DELETE). 
Can access objects in database by their id and set/update UTC time, convert to appropriate time zone

- Tools & modules: Restify, MongoDB (with Mongoose), moment.js

- Instructions:
  - start database: navigate to directory ---> type "mongod" in terminal ---> in a seperate terminal window, in directory, type "mongo" to start mongo shell
  - start server: in a seperate terminal window, in directory, type "node/nodemon server.js"
  - send client requests: open Postman ---> type in request url:
    - POST: /times/id/UTCtime
    - GET: /times/id/timezone
    - DELETE: /times/id
    
- Commands
  - POST: /times/id/UTCtime
    - `id` - this is the unique identifier for the "Time" (so we can support multiple "Time"'s)
      - ** if the ID matches one on record, it should update instead
    - `UTCtime` - this is an optional UTC Date/Time string that is to be stored
  - GET: /times/id/zone
    - `id` - the unique identifier for the "Time"
    - `zone` - gets the "Time" but converted into the appropriate timezone (you can use a string representation as can be found http://en.wikipedia.org/wiki/List_of_tz_database_time_zones or just use a number offset if you choose)
  - DELETE: /times/id
    - `id` - deletes the "Time" identified by this id
