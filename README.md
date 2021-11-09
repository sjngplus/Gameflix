# Gameflix

An app where users can sort, filter, and colloborate in choosing a PC game to play. The app was insprired by the lack of filter/sort functionality in PC games deals sites such as cheapshark and istheranydeals.


App preview:
![gif preview of app](https://github.com/sjngplus/Gameflix/blob/12_app-hosting/deployment/frontend-client/docs/gameflix%20preview.gif?raw=true)


 App is hosted on heroku: https://gameflix-frontend-react.herokuapp.com/ Login using the following emails and passwords to test out the colloborative features the app offers:
 
 * Email: "sj@gameflix<area>.com" | Password: "test"
 * Email: "cx@gameflix<area>.com" | Password: "test"


Stretch/additional features to be added:

1. Addition of more stores such as GOG or EGS.
1. A simple chat interface.
1. Functionality for users to join a seperate room to chat and collaborate.


The app pulls info from steam and cheapshark APIs to display the games. Games can be searched by title. If a game does not exist in the app, the user can click the search button with the game title. This will prompt the app to fetch and display the game(s) matching the title in the chart, and also inserts the game(s) into the app's database.