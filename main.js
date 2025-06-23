"use strict"; 
// selecting all the dom elements to be manipulated
const main = document.getElementById("main");
const valueSearch = document.getElementById("valueSearch");

// items stored in the main body (the main weather forecast)
const city = document.getElementById("city");
const currentTemperature = document.getElementById("current-temperature");
const temperaturelogo = document.getElementById("temperature-img");
const currentDescription = document.getElementById("current-description");
const currentClouds = document.getElementById("current-clouds");
const currentHumidity = document.getElementById("current-humidity");
const currentWindSpeed = document.getElementById("current-WindSpeed");

// items added in the first day's forecast
const first_date = document.getElementById("first_date"); 
const first_image = document.getElementById("first_image"); 
const first_temp = document.getElementById("first_temp");
const first_humidity = document.getElementById("first_humidity"); 
const first_wind = document.getElementById("first_wind");

// items added in the second day's forecast
const second_date = document.getElementById("second_date");
const second_image = document.getElementById("second_image");
const second_temp = document.getElementById("second_temp");
const second_humidity = document.getElementById("second_humidity");
const second_wind = document.getElementById("second_wind");

// items added in the third day's forecast
const third_date = document.getElementById("third_date");
const third_image = document.getElementById("third_image");
const third_temp = document.getElementById("third_temp");
const third_humidity = document.getElementById("third_humidity");
const third_wind = document.getElementById("third_wind");
// creating and submitting a form
const form = document.getElementById("form");
const dropdown = document.querySelector(".dropdown")
const dropdown_list = document.querySelector(".dropdown-list")

const cityNamesList = JSON.parse(sessionStorage.getItem("cityNamesList")) || [];

// this eventlistener will add the dropdown on click event
document.addEventListener("click",(event)=>{
    if (event.target ==valueSearch){
        dropdown.style.display = "block";
        createDropdown();
    }
    else{
        
        dropdown.style.display = "none";
    }
    
})

//  this function is used for creating the dropdown and inserting the dropdown items in dom.
const createDropdown = function(){
dropdown_list.innerHTML = ""; // Clear previous items before appending new ones
if (cityNamesList.length>0){
    
    cityNamesList.forEach((city) => {
            let newCity = document.createElement("li"); // creating the list item for dropdown
            newCity.classList.add("dropdown-item");
            newCity.textContent = city;

         newCity.addEventListener("click", function () {
                valueSearch.value = city; 
                dropdown.style.display = "none"; // Hide dropdown after selection
            });

        dropdown_list.append(newCity) // appending the list item to the dom
    });
}
};

/* this form takes the user input (on submit) and searches for the specified city 
based on that input using the weather api. 
If found then it will return the weather conditions of the location as a response*/
form.addEventListener("submit", (event)=>
{
event.preventDefault() // prevents the reloading of the webpage on click
// checks if the user input is not empty. If not then calls the searchWeather()
if (valueSearch.value!==""){
    searchWeather();
}
else{
    // addes the shake animation on error if the input is not filled
    main.classList.add("error");
    alert("Please enter a city name!");
    // removes the animation after 1 sec.
    setTimeout(()=> main.classList.remove("error"),1000); 
}
});

// Api key
let url = `https://api.weatherapi.com/v1/forecast.json?key=7df05d21f7544cdfaa991117252004&days=7&aqi=no&alerts=no`;


/* The following function fetches the data based on the url mentioned above (api key)
(fetches the weather information) and then converts it 
into json object so that the retrieved string can be manipulated*/
const searchWeather = async ()=>{
    try{
    const response = await fetch(url + "&q= " + valueSearch.value) // explicitly searches for the city provided by user
    const data =  await response.json() // converting it into json
       
        if (data && data.location){ // if the city is found (since data is not empty(user has entered an input))
            displayWeather(data) // sends data to displayWeather function
            // storing the city names in dropdown
         if (!cityNamesList.includes(valueSearch.value.trim().toLowerCase()) && valueSearch.value.trim().toLowerCase() !== "mumbai") {
            cityNamesList.push(valueSearch.value.trim());
            console.log(cityNamesList);
            sessionStorage.setItem("cityNamesList", JSON.stringify(cityNamesList));
        }

               // clearing out the input
        valueSearch.value = "";
        }
        // sends an alert if the user has entered invalid output
        else{
            main.classList.add("error");
            alert("The city provided does not exist!")
            setTimeout(()=> main.classList.remove("error"),1000);
        }
       
    }
      // throws an error if the data couldn't be fetched
    catch(error){ 
        console.error("Error fetching data:", error);
        alert("Cannot get the details")}
    };


// function used for setting up the data and showing it in the dom
function displayWeather(data){
     city.textContent = data.location.name;

            
            // Changing the temperature logo based on the location provided
            temperaturelogo.setAttribute("src", data.current.condition.icon)

            // setting temperature in celsius
            const temperatureInDegree = data.current.temp_c 
            // setting the temperature value
            currentTemperature.innerHTML = `<span>${temperatureInDegree}<sup>o</sup>C</span>`
            // setting the description
            currentDescription.textContent = data.current.condition.text
            // setting current cloud details
            currentClouds.textContent = data.current.cloud;
            // setting humidity
            currentHumidity.textContent = data.current.humidity;
            // setting windspeed
            currentWindSpeed.textContent = data.current.wind_kph;

            // setting upcoming forecast
            const forecastday =  data.forecast.forecastday;
            // comming weeks forecast
            const elements = [
    { date: first_date, image: first_image, temp: first_temp, wind: first_wind, humidity: first_humidity },
    { date: second_date, image: second_image, temp: second_temp, wind: second_wind, humidity: second_humidity },
    { date: third_date, image: third_image, temp: third_temp, wind: third_wind, humidity: third_humidity }
];
// looping through each object in elements to set it's data in dom
for (let i = 0; i < elements.length; i++) {
    elements[i].date.textContent = forecastday[i].date; // setting date on each element
    elements[i].image.setAttribute("src", forecastday[i].day.condition.icon); // setting image on each element
    elements[i].temp.innerHTML = `<span>${forecastday[i].day.avgtemp_c}<sup>o</sup>C</span>`; // setting temperature
    elements[i].wind.textContent = forecastday[i].day.maxwind_kph; // setting wind speed
    elements[i].humidity.textContent = forecastday[i].day.avghumidity; // setting humidity
}

}
// getting user's weather forecast
const userlocation = document.querySelector(".location-btn");
userlocation.addEventListener("click", function(){
    const success =(pos)=>{ // if the search is successful
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        getWeatherbyCurrentLocation(latitude,longitude)
    }
    const error = () =>{ // if it failed to get the user's position
        console.error("Error fetching details")
        alert("Couldn't get your location")
    }
    navigator.geolocation.getCurrentPosition(success,error)
})
// This function takes latitude and longitude from the geolocation and then uses weatherapi to fetch the details of the provided lat and lon.
const getWeatherbyCurrentLocation = async(lat,lon) =>{
    try{
         const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7df05d21f7544cdfaa991117252004&q=${lat},${lon}&days=7&aqi=no&alerts=no`);
        const data = await response.json();
        
        displayWeather(data); // sending the data to displayWeather
    }
    catch{
    alert("Sorry couldn't fetch the details of your location")
    }
}
// default value (default forecast when the page loads)
const initApp = () =>{
    valueSearch.value = "Mumbai";
    searchWeather();
}
initApp()
