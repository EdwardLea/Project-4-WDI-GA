# General Assembly WDI Project 4 : Full Stack Application

## Goal: To create a full stack web application with a Python backend, SQL Database and React.js frontend.
### Timeframe
7 days

## Technologies used

* Python, Flask, SQLAlchemy, Marshmallow, PostgreSQL, Pipenv
* React.js, Webpack, Babel, Axios,
* HTML5
* CSS, CSS Animation, SCSS & Bulma
* Insomnia, Mocha, Chai & Enzyme
* Citymapper & Darksky
* Git,GitHub
* Heroku

## My Application - Bee Social

A hosted version of the app can be found here ----> [wdi-bee-social.herokuapp.com](https://wdi-bee-social.herokuapp.com/)

### Application overview
Bee Social is a platform where users can create and discover social events in their local area. The idea came from organising sporting activities and finding other people with the same interests, for example organising a five-a-side football game or running a book club.

The app uses React.js on the client-side and Python with a PostgreSQL database on the server-side. External APIs were utilised to add additional functionality to the app. These included Citymapper to give indicative travel times for events and Darksky to give weather information for the date and location of events.

### Application Instructions
1. From the application home page users can discover future 'Events' that have been posted by users. A search feature can be used to search by location or category.

![screenshot - Placement of ships](https://user-images.githubusercontent.com/39096986/51031907-01bdbb80-1596-11e9-9362-0d82b07aae44.png)

2. From the 'Event' show page information is displayed regarding the event including other events from the organiser, number of attendees, location details with estimated journey time from the user's current location, and weather information for the date and location of the event. If a user is logged in they can attend this event by clicking the Attend button.

![screenshot - Start Play](https://user-images.githubusercontent.com/39096986/51031879-eb176480-1595-11e9-976e-ca95307c13fd.png)

3. Users can browser and search for clubs of interest from the 'Club' Index page.

![Screenshot - Play Mode](https://user-images.githubusercontent.com/39096986/51035269-5b77b300-15a1-11e9-82ca-d8dc0051c88f.png)

4. The 'Club' show page displays information regarding the 'Club' including members and future and past 'Events'. A user can follow the 'Club' by clicking the 'Follow' button. Once a follower of the 'Club' and chat facility is show on the page.

![Screenshot - Mid way through game](https://user-images.githubusercontent.com/39096986/51035605-6bdc5d80-15a2-11e9-9223-7927e319575f.png)

5. The user page displays future and past 'Events' the user is attending, 'Clubs' they following and 'Clubs' and 'Events' they have created.

![Screenshot - Win screen](https://user-images.githubusercontent.com/39096986/51034760-b01a2e80-159f-11e9-8a0a-e395434b50f3.png)

6. A logged in user can create 'Events' and 'Clubs' from the Organise tab in the navbar.

![Screenshot - Win screen](https://user-images.githubusercontent.com/39096986/51034760-b01a2e80-159f-11e9-8a0a-e395434b50f3.png)

7. The user page displays future and past 'Events' the user is attending, 'Clubs' they following and 'Clubs' and 'Events' they have created.

![Screenshot - Win screen](https://user-images.githubusercontent.com/39096986/54681591-aa434b00-4b04-11e9-93d1-c5eb7bf80dc4.png)

## Process

This project was delivered with one other developer. We managed the project with an agile methodology with a clear timeframe for us to deliver as much of the scope as possible. To assist this process we used an Kanban Board in the form of Trello to plan and manage our task, utilising daily standups to track progress and understand blockers. Working in a group also gave me further experience using Git workflows to manage the development of the project using branches for feature development

The requirement to use an SQL Database meant we had to plan our database structure rigorously at the beginning of the project. We designed the ERD for the application, which included primary Database Tables for User, Event and Clubs. A number of joined tables were required to allow for attending and following associated with Events and Club respectively.

We created wireframes to capture the layout of the application prior to any development taking place. This gave us a clear understand of how each page would work together and a basic layout which would could apply consistently across the application.

Once our database structure was confirmed the first step was to develop the backend functionality of the app. Models and Controllers were created for 'Event', 'Club' and 'User'. For the Event and Club routes CRUD routes were created to allow users to manage 'Events' and 'Clubs' they have created. For the User route this focused on Register and Login to allow a user to have a profile where they could view and manage 'Events' or 'Clubs' they were attending or following.

Once the backend routes had been created they were tested using Insomnia to highlight bugs and to confirm the correct data was been returned or stored to the database.

The frontend of the application was built using React. I developed the 'Club' show page, user page, 'Club' and 'Event' Create and Edit pages. The application was styled using Bulma which was customised using Scss to inject consistent branding across the application

### Challenges
Working with SQL Database compared to NoSQL was a great experience but provided some challenges when using different data types. For example when using the time data type for the database to accept the data. These caused some issues on the front end as the built in time capture does not provide seconds. To overcome this problem I used a dropdown for hours and minutes on the front end and stored these values as two separate integers in the database.

### Wins
Using the external APIs Citymapper and Darksky to display travel time and weather information for the event was a really useful feature from a user perspective and a personal win for me. The AJAX request from the front end makes a single request to the backend containing the current users location and the id of the 'Event'. The backend them makes two requests, one to Darksky and one to Citymapper. The response from both is them processed to form a single response to the frontend. This was a really good exercise for me to become more familar with external API documentation. By having a better understanding of the Darksky API I was able to refine my request to response with less data and making my API request more effecient.

## Future features
1. Current 'Events' are only discoverable via the 'Events' index page of the app. To make discovery of events easier and more tailored to the user and feed could be added that displays the latest events that have been added by either 'Clubs' they follow or categories they are interested in.

2. More extensive testing on the frontend and testing of the backend APIs would be
