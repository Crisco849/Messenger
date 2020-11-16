- I used javascript/html/css to create this project and put it on a website so a makefile was not needed.
- Screenshots were included in the README.md file that can be seen properly formatted by going to the second link provided below.


[The easiest way to run this project]
  1. Open the first link to open and use the website. 
  2. To grade the code: The documentation of where the important important files are located is found in the README.md file that you
     you can read properly formatted using the second link provided below where it will be displayed on the page it takes you to. 
     The main files will be visible on the website by using inspect element in a browser, but the server file and all other files can only
     be seen by going to the github branch in the second link or going to 'Online/Messenger/Messenger-App/' included in this zip file.

[More Difficult Way to run this project]
  1. Although compilation of code isn't required required to run this project locally, you still need to have Node.js
     installed on your machine. (The fourth link below takes you to the offical download page).
  2. Open the third link below and the README.md file will be displayed on the screen. It will explain how to run this
     project locally. Make sure the commands that it tells you to run are done in the 'Local/Messenger/Messenger-App/'
     folder included in this zip file.
  3. It should be noted that the differences between the two lines of code that are changed in the Local version(details below) of this project
     allow it to be run locally, but not function in the way it was intended. What I mean by that is the fact that multiple devices
     can only connect to the website if they are on the same network as the machine running the Node.js server. This allowed me to test changes
     quickly by opening the local version of the website in a couple different tabs and check the website functionality before officially updating 
     the website or committing and pushing to github. The website version gives anyone in the world with an internet connection the ability to 
     interact with other people on the website as intended. 

[Difference between Online and Local folders in this zip file]
- The only difference between these folders is one line edited in the client(Local/Messenger/Messenger-App/public/script.js) 
  and one line added to the server(Local/Messenger/Messenger-App/app.js) javascript files in the Local version.
    Changes for the Local version:
    - The only change to the client was the socket being initialized on 'http://localhost:65080' instead of the website url.
    - The only change to the server was changing the socket.io(js socket dependency) initialization at the beginning of the
      file to listen on port 65080.



[LINKS]
____________________________________________________________________________________________________________________________
(1.) The Actual Website: https://crisco-chatroom.uc.r.appspot.com

(2.) The github branch used for the actual online website: https://github.com/Crisco849/Messenger/tree/master/Messenger-App 
  
(3.) The github branch for local testing: https://github.com/Crisco849/Messenger/tree/Local/Messenger-App

(4.) https://nodejs.org/en/download



