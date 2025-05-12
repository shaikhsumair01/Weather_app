"use strict"; 
// selecting all the dom elements to be manipulated
let main = document.getElementById("main");
let valueSearch = document.getElementById("valueSearch");
let city = document.getElementById("city");
let flag = document.getElementById("flag");
let currentTemperature = document.getElementById("current-temperature");
let temperaturelogo = document.getElementById("temperature-img");
let currentDescription = document.getElementById("current-description");
let currentClouds = document.getElementById("current-clouds");
let currentHumidity = document.getElementById("current-humidity");
let currentWindSpeed = document.getElementById("current-WindSpeed");
let first_date = document.getElementById("first_date") 
let first_image = document.getElementById("first_image") 
let first_temp = document.getElementById("first_temp") 
let first_cloud = document.getElementById("first_cloud") 
let first_humidity = document.getElementById("first_humidity") 
let first_wind = document.getElementById("first_wind") 
// creating and submitting a form
let form = document.getElementById("form");

/* this form takes the user input (on submit) and searches for the specified city 
based on that input using the openweathermap api. 
If found then it will return the weather conditions of the location as a response*/

form.addEventListener("submit", (event)=>
{
event.preventDefault() // prevents the reloading of the webpage on click
// checks if the user input is not empty. If not then calls the searchWeather()
if (valueSearch.value!==" "){
    searchWeather();
}
else{
    // addes the shake animation (error) if the input is not filled
    main.classList.add("error");
    alert("Please enter a city name!");
    // removes the error class after 1 sec.
    setTimeout(()=> main.classList.remove("error"),1000); 
}
});

let url = `http://api.weatherapi.com/v1/forecast.json?key=7df05d21f7544cdfaa991117252004&days=7&aqi=no&alerts=no`;

/* fetches the data based on the url mentioned above
(fetches the weather information) and then converts it 
into json object so that the retrieved string can be manipulated*/

const searchWeather = ()=>{
    fetch(url + "&q= " + valueSearch.value) // explicitly searches for the city provided by user
    .then((Response)=> Response.json() // converting it into json
    .then((data)=>{ 
        console.log(data);
        if (!data == " "){ // if the city is found (since data is not empty)
            city.textContent = data.location.name;
            // changing the flag image based on user input
            // flag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`)
            
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
            // tomorrow's forecast
            first_date.textContent = forecastday[0].date;
            first_image.setAttribute("src" , forecastday[0].day.condition.icon);
            first_temp.innerHTML = `<span>${forecastday[0].day.avgtemp_c}<sup>o</sup>C</span>`;
            
            // day after tomorrow's forecast
            second_date.textContent = forecastday[1].date;
            second_image.setAttribute("src" , forecastday[1].day.condition.icon);
            second_temp.innerHTML = `<span>${forecastday[1].day.avgtemp_c}<sup>o</sup>C</span>`;
            
            // third day's forecast
            third_date.textContent = forecastday[2].date;
            third_image.setAttribute("src" , forecastday[2].day.condition.icon);
            third_temp.innerHTML = `<span>${forecastday[2].day.avgtemp_c}<sup>o</sup>C</span>`;
        }
        else{
            main.classList.add("error");
            alert("The city provided does not exist!")
            setTimeout(()=> main.classList.remove("error"),1000);
        }
        // clearing out the input
        valueSearch.value = " ";
    } )).catch((error)=>{ 
        console.error("Error fetching data:", error);
        alert("Cannot get the details")})
};
// default value
const initApp = () =>{
    valueSearch.value = "Mumbai";
    searchWeather();
}
initApp()
