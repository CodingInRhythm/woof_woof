# Welcome to the Woof Woof

![logo]( <!-- Link goes here -->)

[LiveLink](https://woofwoof-app.herokuapp.com/)

Woof Woof is a clone of [Slack](https://www.slack.com), a popular chat application that allows people to post messages to public channels or send private Direct Messages.

## Technologies
- React/Redux
- Python
- Flask
- SQLAlchemy
- PostgresQL
- WebSockets

## Features
![main](https://github.com/CodingInRhythm/slack_clone/blob/main/wiki/images/ui-main.png)
![modal](https://github.com/CodingInRhythm/slack_clone/blob/main/wiki/images/ui-modal-profile.png)
<!-- screenshot of the splash page -->

### Database Schema
![db](https://github.com/CodingInRhythm/slack_clone/blob/main/wiki/images/Slack_Schema.JPG)

### Authentication
- Users can sign up, and log in

![register](https://github.com/CodingInRhythm/slack_clone/blob/main/wiki/images/ui-register.png)


### Channels
- Users can see all channels to which hw/she belongs
- Users can leave a channel
- Users can create a channel
![channels](https://github.com/CodingInRhythm/slack_clone/blob/main/wiki/images/ui-channels.png)

### DMs
- Users can see all conversations on the side bar
- Users can send and receive messages from other users.
- Users with whom you communicate will have green status if they are online.
![dms](https://github.com/CodingInRhythm/slack_clone/blob/main/wiki/images/ui-dms.png)

### Search
- Users can search all channels, including channels that user does not belongs to
- Users can search all other users
![search](https://github.com/CodingInRhythm/slack_clone/blob/main/wiki/images/ui-search.png)

### Notifications
- User can see red notifications with the number of unread messages on the sidebar to the right of the dm or channel.

<!-- screenshot of notifications -->
### Live chat
- Live chat is implemented by using Socket.io library. It enables real-time, bidirectional and event-based communication.
- It works in both channels and DMs




Here's what it looks like in action: <!-- livechat gif -->

![Chat in action]()

## Installation
This project can be run by following these steps:

- Clone the repo into your desired folder.
- Run `pipenv install` from the root project directory.
- Run `npm install` from the react-app directory
- Create a .env file in the root directory (use .env.example).
- Run `pipenv shell` command
- Run `flask run` command from the root directory and `npm start` from the react-app directory

## Future Improvements

- Ability to create private channels
- Implement event-based fetching on scrolled
- Bookmark the messages
- live `typing ...` notification

For additional information, checkout our [Wiki](https://github.com/CodingInRhythm/slack_clone/wiki) page.

> Developed By: [Brent Arimoto](https://github.com/brentarimoto), [Nurs Asanov](https://github.com/nasanov), [Alex Clough](https://github.com/CodingInRhythm), [Zane Preudhomme](https://github.com/zpreudhomme)
