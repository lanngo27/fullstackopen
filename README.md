# [Full Stack Open 2020](https://fullstackopen.com/en/)

This course is held at the Department of Computer Science at the University of Helsinki in Spring 2022.

Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

GraphQL, a modern alternative to REST APIs is also covered by this course. As well as testing, configuration & environment management, and the use of MongoDB for storing the application’s data. A part on TypeScript can also be found on this year's edition. This repository contains my solutions for this course's exercises.

[Couse certificate](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/a5a88ab692f3b7b70a92b05530e1db8e)
[Couse certificate GraphQL](https://studies.cs.helsinki.fi/stats/api/certificate/fs-graphql/en/70bbb02f1a3eee7bd8a20058ffbf7484)

### [Part 0 - Fundamentals of Web apps](https://fullstackopen.com/en/part0)
In this part, we will familiarize ourselves with the practicalities of taking the course. After that we will have an overview of the basics of web development, and also talk about the advances in web application development during the last few decades.
- General info
- Fundamentals of Web apps

### [Part 1 - Introduction to React](https://fullstackopen.com/en/part1)
In this part, we will familiarize ourselves with the React-library, which we will be using to write the code that runs in the browser. We will also look at some features of JavaScript that are important for understanding React.
- Introduction to React
- Javascript
- Component state, event handlers
- A more complex state, debugging React apps

### [Part 2 - Communicating with server](https://fullstackopen.com/en/part2)
Let's continue our introduction to React. First, we will take a look at how to render a data collection, like a list of names, to the screen. After this, we will inspect how a user can submit data to a React application using HTML forms. Next, our focus shifts towards looking at how JavaScript code in the browser can fetch and handle data stored in a remote backend server. Lastly, we will take a quick look at a few simple ways of adding CSS styles to our React applications.
- Rendering a collection, modules
- Forms
- Getting data from server
- Altering data in server
- Adding styles to React app

### [Part 3 - Programming a server with NodeJS and Express](https://fullstackopen.com/en/part3)
In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.
- Node.js and Express
- Deploying app to internet
- Saving data to MongoDB
- Validation and ESLint

### [Part 4 - Testing Express servers, user administration](https://fullstackopen.com/en/part4)
In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.
- Structure of backend application, introduction to testing
- Testing the backend
- User administration
- Token authentication

### [Part 5 - Testing React apps](https://fullstackopen.com/en/part5)
In this part we return to the frontend, first looking at different possibilities for testing the React code. We will also implement token based authentication which will enable users to log in to our application.
- Login in frontend
- props.children and proptypes
- Testing React apps
- End to end -testing

### [Part 6 - State management with Redux](https://fullstackopen.com/en/part6)
So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In this part, we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.
- Flux-architecture and Redux
- Many reducers
- Communicating with server in a redux application
- connect

### [Part 7 - React router, custom hooks, styling app with CSS and webpack](https://fullstackopen.com/en/part7)
The seventh part of the course touches on several different themes. First, we'll get familiar with React router. React router helps us divide the application into different views that are shown based on the URL in the browser's address bar. After this, we'll look at a few more ways to add CSS styles to React applications. During the entire course, we've used create-react-app to generate the body of our applications. This time, we'll take a look under the hood: we'll learn how Webpack works and how we can use it to configure the application ourselves. We shall also have a look at hook functions and how to define a custom hook.
- React-router
- Custom hooks
- More about styles
- Webpack
- Class components, Miscellaneous
- Exercises: extending the bloglist

### [Part 8 - GraphQL](https://fullstackopen.com/en/part8)
This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and server.
- GraphQL-server
- React and GraphQL
- Database and user administration
- Login and updating the cache
- Fragments and subscriptions

### [Part 9 - Typescript](https://fullstackopen.com/en/part9)
This part is all about TypeScript: an open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.

In this part, we will be using the tools previously introduced to build end-to-end features to an existing ecosystem with linters predefined and an existing codebase writing TypeScript. After doing this part, you should be able to understand, develop and configure projects using TypeScript.

This part is created by Tuomo Torppa, Tuukka Peuraniemi and Jani Rapo, the awesome developers of Terveystalo, the largest private healthcare service provider in Finland. Terveystalo’s nationwide network covers 300 locations across Finland. The clinic network is supplemented by 24/7 digital services.
- Background and Introduction
- First Steps with Typescript
- Typing express app
- React with types

### [Part 10: React Native](https://fullstackopen.com/en/part10)
In this part, we will learn how to build native Android and iOS mobile applications with JavaScript and React using the React Native framework. We will dive into the React Native ecosystem by developing an entire mobile application from scratch. Along the way, we will learn concepts such as how to render native user interface components with React Native, how to create beautiful user interfaces, how to communicate with a server, and how to test a React Native application.
- Introduction to React Native
- React Native basics
- Communicating with server
- Testing and extending our application

### [Part 11: CI/CD](https://fullstackopen.com/en/part11)
So you have a fresh feature ready to be shipped. What happens next? Do you upload files to a server manually? How do you manage the version of your product running in the wild? How do you make sure it works, and roll back to a safe version if it doesn’t?

Doing all the above manually is a pain and doesn’t scale well for a larger team. That’s why we have Continuous Integration / Continuous Delivery systems, in short CI/CD systems. In this part, you will gain an understanding of why you should use a CI/CD system, what can one do for you, and how to get started with GitHub Actions which is available to all GitHub users by default.

This module was crafted by the Engineering Team at Smartly.io. At Smartly.io, we automate every step of social advertising to unlock greater performance and creativity. We make every day of advertising easy, effective, and enjoyable for more than 650 brands worldwide, including eBay, Uber, and Zalando. We are one of the early adopters of GitHub Actions in wide-scale production use. Contributors: Anna Osipova, Anton Rautio, Mircea Halmagiu, Tomi Hiltunen.
- Introduction to CI/CD
- Getting started with GitHub Actions
- Deployment
- Keeping green
- Expanding Further

### [Part 12: Containers](https://fullstackopen.com/en/part12)
In this part, we will learn how to package code into standard units of software called containers. These containers can help us develop software faster and easier than before. Along the way, we will also explore a completely new viewpoint for web development outside of the now-familiar Node.js backend and React frontend.

We will utilize containers to create immutable execution environments for our Node.js and React projects. Containers also make it easy to include multiple services with our projects. With the flexibility, we will explore and experiment with many different and popular tools by utilizing containers.

This section has been created by Jami Kousa in collaboration with the Helsinki-based Services Foundation team at Unity. The Services Foundation team works on providing platforms for other teams at Unity to succeed in their mission of building great services for their customers. The team is passionate about improving Unity’s developer experience and works on tools like the Unity Dashboard, the Unity Editor, and Unity.com.
- Introduction to Containers
- Building and configuring environments
- Basics of Orchestration

### [Part 13: Using relational databases](https://fullstackopen.com/en/part13)
In the previous sections of the course we used MongoDB for storing data, which is a so called NoSQL database. NoSQL databases became very common just over 10 years ago, when the scaling of the internet started to produce problems for relational databases that utilized the older generation SQL query language.

Relational databases have since then experienced a new beginning. Problems with scalability have been partially resolved and they have also adopted some of the features of NoSQL databases. In this section we explore different NodeJS applications that use relational databases, we will focus on using the database PostgreSQL which is the number one in the open source world.
- Using relational databases with Sequelize
- Join tables and queries
- Migrations, many-to-many relationships
