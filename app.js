const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm= document.querySelector("[data-search-input]");
const loadingScreen=  document.querySelector('.loading-container') 
const userInfoContainer = document.querySelector("user-Info-container");


let currentTab = userTab;
let API_KEY="d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab")

function switchTab(clickedTab){
  if(clickedTab!=currentTab){
    currentTab.classList.remove("current-tab")
    currentTab=clickedTab;
    currentTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active")){
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    }
    else{
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      getfromSessionStorage();
    }

  
  }
}

userTab.addEventListener("click",()=>{
  switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
  switchTab(searchTab);
});

//checks if cordinates are already present in session storage
function getfromSessionStorage(){
    const localCoordinates= sessionStorage.getItem("user-coordinates");

    if(!localCoordinates){
      grantAccessContainer.add("active")
    }
    else{
      const coordinates = JSON.parse(localCoordinates);
      fetchWeatherInfo(coordinates);
    }

}

async function fetchWeatherInfo(coordinates){
  //make grant container invisible
  const {lat,lon}=coordinates;

  grantAccessContainer.classList.remove("active");
  //make loader visible
  loadingScreen.classList.add("active");

  //api call

  try {
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

    const data = await response.json();
    loadingScreen.classList.remove("active")
    userInfoContainer.classList.add("active")
    renderWeatherInfo(data)
    
  } 
  catch (error) {
    loadingScreen.classList.remove("active");
    console.log("Error found" +error );
  }
  
}

function renderWeatherInfo(weatherInfo){
  //first we have to fetch the elements

 const cityName = document.querySelector("[data-cityName]")
 const contryIcon = document.querySelector("[data-countryIcon]")
 const desc = document.querySelector("[data-weatherDisc]")

 const weatherIcon =document.querySelector("[data-weatherIcon>]")

 const  temp= document.querySelector("[data-temp]")
 const windspeed = document.querySelector("[data-windSpeed]")
 const humidity = document.querySelector("[data-humidity]");
 const cloudiness =document.querySelector("[data-cloudiness]")

 //fetch values from weatherINFO object and put in UI element
  cityName.innerText = weatherInfo?.name;
  contryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

  desc.innerText= weatherInfo?.weather?.[0]?.description;
  weatherIcon.src= `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

  temp.innerText = weatherInfo?.main?.temp;

  windspeed.innerText= weatherInfo?.wind?.speed;

  humidity.innerText =weatherInfo?.main?.humidity;
  cloudiness.innerText= weatherInfo?.clouds?.all;
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const userCoordinates={
      lat:position.coords.latitude,
      lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates))
    fetchWeatherInfo(userCoordinates);
  }

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);


let searchInput= document.querySelector("[data-search-input]");

searchForm.addEventListener("submit", (e) =>{
  e.preventDefault();
  let cityName = searchInput.value;
  if(searchInput.value==="") return;

  else{
    fetchSearchWeatherInfo(cityName);
  }
});

async function fetchSearchWeatherInfo(city){
  loadingScreen.classList.add("active")
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");
  
  try {
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    const data =await response.json();
    loadingScreen.classList.remove("active")
    userInfoContainer.classList.add("active")
    renderWeatherInfo(data);
  } 
  catch (error) {
    console.log("Error found"+ error)
  }
}





// async function fetchWeatherDetails(){
//     // let latitide= 15.3333;
//     // let longitude= 74.0833;

//     function renderWeatherInfo(data){
//               let newpara= document.createElement('p');
//               newpara.textContent= `${data?.main?.temp.toFixed(2)} C`
//               document.body.appendChild(newpara);
//     }


//     try {
//         let city= "bhopal";
    

//         const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
//         const data = await response.json();
    
//         console.log("Weather data:-->", data);
    
//         renderWeatherInfo(data);
//     } catch (err) {
//         console.log("Error found"+ err);
//     }



// }

// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//     }
//   }
  
//   function showPosition(position) {
//     let Latitude=  position.coords.latitude;
//     let Longitude= position.coords.longitude;

//     console.log(Latitude);
//     console.log(Longitude);
//   }

//   function switchTab(ClickedTab){

//     apiErrorContainer.classList.remove("active");

//     if (ClickedTab !== currentTab) {
//       currentTab.classList.remove("current-tab");
//       currentTab = ClickedTab;
//       currentTab.classList.add("current-tab")
    

//     if(!searchForm.classList.contains("active")){
//       userInfoContainer.classList.remove("active");
//       grantAccessContainer.classList.remove("active");
//       searchForm.classList.add("active");
//     }

//     else{
//       searchForm.classList.remove("active");
//       userInfoContainer.classList.remove("active");
//     }
//     }
//   }