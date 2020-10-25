# Test project using microservices

## Built With
* [Node.js](https://nodejs.org/en/) - JavaScript environment  
* [Docker](https://www.docker.com/) - Container technology used to package up an application with all of the parts it needs  
* [Express](http://expressjs.com/) - The web framework used  
* [Nginx](https://nginx.org/en/) - Web server used as a reverse proxy

## Installation
`git clone https://github.com/RV8V/microservices`  

`cd microservices && npm i`  

`docker-compose up -d`  

* Check port 3000

## Dependency
Used my npm package 'dependency-for-microservice' for better security.
 * [dependency-for-microservice](https://www.npmjs.com/package/dependency-for-microservice)

## Description

I have done this project in order to understand what microservices are, how I can make them and how actually orchestrate them together. That is basically what I'm going for here  

You see that I have a directory called: books, search, videos, web. Each of there are full-fledged applications, each one of these directories is actually an entire system in of itself. It has its own server, source, its own dependancies - all that.
So that my project is a project of projects and that's where the micro part of all this comes in.  

I like to call these directories: books, videos and this type of very natural domain-driven terms which are very closely tied to different entities within your system, I'd like to think of them as a domain services that handle every specific data structure or a data type in your system. And microservice search which is like an aggregate or a consumer that just talks througth other services to provide some type of value. 

Instead of putting all of that code into one single project, I have sliced these natural pieces up to very small projects and then make them work together as a distributed system  

I have made it just for learning. If this is a small project, all of this code should be in a monolithic application there is no reason to slice up something this small into microservices.  
It is not really proportional to this problem.
