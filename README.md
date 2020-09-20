# x-v-o
Web application for playing tic-tac-toe with a friend. Built using Angular and Firebase.

![x-v-o-demo](https://user-images.githubusercontent.com/23458996/93692221-f84c5c80-fab5-11ea-8791-b6468f8c83f8.gif)

## Requirements

 - NodeJS and NPM
 - Firebase Account
## Requirements
 1. Create a new project within your **Firebase** account.
 2. Within this project, create a new **Firestore** collection named `games`.
 3. Within this project, create a new web app, and copy the **Firebase SDK snippet** with the **config** option set. This should look something like this:
```
const firebaseConfig = {
	apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	authDomain: "XXXX-XXXX.firebaseapp.com",
	databaseURL: "https://XXXX-XXXX.firebaseio.com",
	projectId: "XXXX-XXXX",
	storageBucket: "XXXX-XXXX.appspot.com",
	messagingSenderId: "XXXXXXXXXX",
	appId: "X:XXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXX"
};
```
4. Clone this repository to your local machine.
```
git clone https://github.com/mbenja/x-v-o.git
```
5. Create a file named `config.ts` at the `src/app` directory. Export the previously copied `firebaseConfig` variable from this file.
6. Execute `npm install`, followed by `ng serve` within the project directory to run the application locally.
7. Navigate to `localhost:4200` to view the application.
