Created a weather application using the WeatherApi. Initially I was trying to implement the openweathermap.api but due to some technical issues, was unable to access the api so shifted to WeatherApi.
 The application on browser load initially displays the weather forecast in mumbai, India. When the user enters a location in the search bar, the application will search for the specified location and will display the forecast of that area. In case the forecast is not loaded, it will send the alert specifying the issue based on user's query. When searching for the information it might take some time (in some occassions) to fetch the details from the api. In any case, if the details are not available please wait and try to search the information again.
When the user enters the specified location in the text box, the details get stored in the session storage which inturn will be displayed in the dropdown and so if the session gets refreshed or closed, the details will be erased.
The location button which is right beside the search button uses geolocation api to get the information of the user's location (on click) and then when it recieves the location, it passes the latitude and the longitude coordinates in the weatherapi and fetches the forecast of the user.

<!--  Steps to access the project -->
unzip the folder as it is in your desktop.
Open and run index.html.
If you are unable to access the styles and want to see the applied styles then all the styles are stored in style.css as utility classes

copy paste this in the terminal when you run the code in order to see the styles applied
npx @tailwindcss/cli -i ./style.css -o ./output.css --watch

