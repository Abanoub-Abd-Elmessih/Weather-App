let todaySpan = document.getElementById('todaySpan');
let todaymonth = document.getElementById('todaymonth');
let locationInput=document.getElementById('locationInput');
let city=document.getElementById('city');
let todayDegreeMarkup=document.getElementById('todayDegreeMarkup');
let todayWeatherStatus=document.getElementById('todayWeatherStatus');
let umbrella=document.getElementById('umbrella');
let degreeIcon=document.getElementById('degreeIcon');
let wind=document.getElementById('wind');
let compass=document.getElementById('compass');
let tomorrowDateMarkup=document.getElementById('tomorrowDateMarkup');
let tomorrowIconMarkup=document.getElementById('tomorrowIconMarkup');
let tomorrowDegreeMarkup=document.getElementById('tomorrowDegreeMarkup');
let smallDegMarkup=document.getElementById('smallDegMarkup');
let tomorrowWeatherStatus=document.getElementById('tomorrowWeatherStatus');
let twoDaysDateMarkup=document.getElementById('twoDaysDateMarkup');
let twoDaysIconMarkup=document.getElementById('twoDaysIconMarkup');
let twoDaysDegree=document.getElementById('twoDaysDegree');
let twoDaysSmalldeg=document.getElementById('twoDaysSmalldeg');
let twoDaysWeatherStatus=document.getElementById('twoDaysWeatherStatus');

const BASE_URL = 'https://api.weatherapi.com/v1';

// Events Listeners
locationInput.addEventListener('input' , function(e){
    getWeatherData(e.target.value);
})
let locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit', function (e) {
    e.preventDefault();
}); 

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            getWeatherData(`${lat},${long}`);
        },
        function(error) {
            // Default to Cairo if location access is denied
            if (error.code == error.PERMISSION_DENIED) {
                getWeatherData('Cairo');
            }
        }
    );
} else {
    alert('Cannot find Location');
    // Default to Cairo if geolocation is not supported
    getWeatherData('Cairo');
}


// Function to get weather data
async function getWeatherData(query){
    try {
        let response = await fetch(`${BASE_URL}/forecast.json?q=${query}&days=3&key=b149ae5e8f034f65b76110641242206`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let data = await response.json();
        displayTodayWeather(data);
        displayTommorrowWeather(data);
        displaytwoDaysWeather(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayTodayWeather(data){
    let date = new Date(data.current.last_updated);
    const todayDate = date.toLocaleString('en-us',{weekday:'long'});
    const monthDate = date.getDate();
    const monthString = date.toLocaleString('en-us' ,{month:'long'});
    const cityName = data.location.name;
    const todayDegree =data.current.temp_c;
    const tempStatus =data.current.condition.text;
    const tempIcon = data.current.condition.icon;
    const humidity =data.current.humidity;
    const windJS= data.current.wind_kph;
    const windDir= data.current.wind_dir;

    todaySpan.innerHTML=todayDate;
    todaymonth.innerHTML=`${monthDate} ${monthString}`;
    city.innerHTML=cityName;
    todayDegreeMarkup.innerHTML=todayDegree;
    todayWeatherStatus.innerHTML=tempStatus;
    degreeIcon.setAttribute('src', tempIcon.startsWith('https') ? tempIcon : `https:${tempIcon}`);
    umbrella.innerHTML=humidity;
    wind.innerHTML=windJS;
    compass.innerHTML=windDir;
}

function displayTommorrowWeather({forecast}){
    const tomorrowDate = new Date(forecast.forecastday[1].date).toLocaleString('en-us' ,{weekday:'long'});
    const tomorrowIcon = forecast.forecastday[1].day.condition.icon;
    const tomorrowDegree = forecast.forecastday[1].day.maxtemp_c;
    const tomorrowSmallDegree = forecast.forecastday[1].day.mintemp_c;
    const tomorrowStatus = forecast.forecastday[1].day.condition.text;

    tomorrowDateMarkup.innerHTML =tomorrowDate;
    tomorrowIconMarkup.setAttribute('src', tomorrowIcon.startsWith('https') ? tomorrowIcon : `https:${tomorrowIcon}`);
    tomorrowDegreeMarkup.innerHTML=tomorrowDegree;
    smallDegMarkup.innerHTML=tomorrowSmallDegree;
    tomorrowWeatherStatus.innerHTML= tomorrowStatus;
}

function displaytwoDaysWeather({forecast}){
    const twoDaysDateJS = new Date(forecast.forecastday[2].date).toLocaleString('en-us' ,{weekday:'long'});
    const twoDaysIconJS = forecast.forecastday[2].day.condition.icon;
    const twoDaysDegreeJS = forecast.forecastday[2].day.maxtemp_c;
    const twoDaysSmallDegJS = forecast.forecastday[2].day.mintemp_c;
    const TwoDaysStatusJS = forecast.forecastday[2].day.condition.text;

    twoDaysDateMarkup.innerHTML =twoDaysDateJS;
    twoDaysIconMarkup.setAttribute('src', twoDaysIconJS.startsWith('https') ? twoDaysIconJS : `https:${twoDaysIconJS}`);
    twoDaysDegree.innerHTML=twoDaysDegreeJS;
    twoDaysSmalldeg.innerHTML=twoDaysSmallDegJS;
    twoDaysWeatherStatus.innerHTML=TwoDaysStatusJS;
}
