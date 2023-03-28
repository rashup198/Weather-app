const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm= document.querySelector("[data-search-input]");
const loadingScreen=  document.querySelector('.loading-container')




















let API_KEY="d1845658f92b31c64bd94f06f7188c9c";
async function fetchWeatherDetails(){
    // let latitide= 15.3333;
    // let longitude= 74.0833;

    function renderWeatherInfo(data){
              let newpara= document.createElement('p');
              newpara.textContent= `${data?.main?.temp.toFixed(2)} C`
              document.body.appendChild(newpara);
    }


    try {
        let city= "sehore";
    

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    
        const data = await response.json();
    
        console.log("Weather data:-->", data);
    
        renderWeatherInfo(data);
    } catch (err) {
        console.log(err);
    }



}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    let Latitude=  position.coords.latitude;
    let Longitude= position.coords.longitude;

    console.log(Latitude);
    console.log(Longitude);
  }