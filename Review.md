# Review Questions

## What is Node.js?
    Node.js is a runtime environment that allows JavaScript to be run outside of the browser.
## What is Express?
    Express is a framework of Node.js which adds extra functionality for running server-side code.
## Mention two parts of Express that you learned about this week.
    Middleware - functions that can change the response or request and routing - changing the response based on the URL and HTTP method (GET, POST, PUT, DELETE, etc.).
## What is Middleware?
    Middleware is either using functions built into Express to intercept the response or request or writing a custom function to intercept. Some middleware changes the res or req, others may just log what it is or only change the res/req based on some criteria.
## What is a Resource?
    A Resource is data which is delivered by the server via a URL.
## What can the API return to help clients know if a request was successful?
    A status code, 200 means a successful operation.
## How can we partition our application into sub-applications?
    Through routers, making the server.js file cleaner and allowing endpoints that involve a specific set of data to live in their own file.
## What is express.json() and why do we need it?
    Express.json parses JSON content, we need it so that the API can return the data properly.
