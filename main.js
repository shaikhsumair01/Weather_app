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
let currentPressure = document.getElementById("current-pressure");
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
    // removes the error class after 1 sec.
    setTimeout(()=> main.classList.remove("error"),1000); 
}
});
let id = "6f3e281eb5562652befa7977e616287a";
let url = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=" + id;

/* fetches the data based on the url mentioned above
(fetches the weather information) and then converts it 
into json object so that the retrieved string can be manipulated*/

const searchWeather = ()=>{
    fetch(url + "&q= " + valueSearch.value) // explicitly searches for the city provided by user
    .then((Response)=> Response.json() // converting it into json
    .then((data)=>{ 
        console.log(data);
        if (data.cod == 200){ // if the city is found (since cod==200)
            city.textContent = data.name;
            // changing the flag image based on user input
            flag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/shiny/64.png`)
            
            // Changing the temperature logo based on the location provided
            temperaturelogo.setAttribute("src", ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)

            /* Converting temperature in Kelvin(which is the default value we get from the API) to degree celsius*/
            const temperatureInDegree = Math.round((Number(data.main.temp) -273.15)) 
            // setting the temperature value
            currentTemperature.innerHTML = `<span>${temperatureInDegree}<sup>o</sup>C</span>`
            // setting the description
            currentDescription.textContent = data.weather[0].description
            
            currentClouds.textContent = data.clouds.all;
            currentHumidity.textContent = data.main.humidity;
            currentPressure.textContent = data.main.pressure;
        }
        else{
            main.classList.add("error");
            setTimeout(()=> main.classList.remove("error"),1000);
        }
        // clearing out the input
        valueSearch.value = " ";
    } ))
};
