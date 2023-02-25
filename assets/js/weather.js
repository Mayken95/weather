
import { weather_data } from './data.js';


let loadDayForecastData = ( weather_city) => {
   // let weather_city =findWeatherCity("Guayaquil",weather_data);
    let weather_today= weather_city;

    let lb_city= document.getElementById("city");
    let lb_mintemp= document.getElementById("mintemperature");
    let lb_maxtemp= document.getElementById("maxtemperature");
    let lb_cloud= document.getElementById("cloudiness");
    let lb_wind= document.getElementById("wind");
    let lb_rainfall = document.getElementById("rainfall");
    lb_city.innerHTML = `<h5 id="city" class="text-golden">${weather_today.city}</h5>`
    lb_mintemp.innerHTML=`<span id="mintemperature">${weather_today.mintemperature}</span>`;
    lb_maxtemp.innerHTML=`<span id="maxtemperature">${weather_today.maxtemperature}</span>`;
    lb_cloud.innerHTML=`<span id="cloudiness">${weather_today.cloudiness}</span>`;
    lb_wind.innerHTML=`<span id="wind">${weather_today.wind}</span>`;
    lb_rainfall.innerHTML=`<span id="rainfall">${weather_today.rainfall}</span>`;
    
    let [afternoon_ctoday, night_ctoday] = weather_today.forecast_today;
    
    let cards_weather= document.getElementsByClassName("card-today");
    let [afternoon_day, night_day]=cards_weather;
    let {text:time_after, temperature: temp_after, forecast: forecast_after,icon: icon_after} = afternoon_ctoday;
    let {text:time_night, temperature: temp_night, forecast: forecast_night,icon: icon_night} =  night_ctoday;
   
    let formatted_weather = (temperature,description,day, icon) => {
        return       `<div class="card-header mx-4 p-3 text-center">
                      <div class="icon icon-shape icon-lg bg-gradient-info shadow text-center border-radius-lg">
                        <i id="late_icon" class="material-icons opacity-10">
                          ${icon}</i>
                      </div>
                    </div>
                    <div class="card-body pt-0 p-3 text-center text-truncate">
                      <h3 id="late_temperature" class="text-center mb-0">
                        ${temperature}
                      </h3>
                      <span id="late_forecast" class="text-md">
                        ${description}
                      </span>
                      <hr class="horizontal dark my-3">
                      <h4 id="late_text" class="mb-0 text-md">
                        ${day}
                      </h4>
                    </div>`;
    }
    afternoon_day.innerHTML = formatted_weather(temp_after, forecast_after, time_after, icon_after);
    night_day.innerHTML = formatted_weather(temp_night, forecast_night, time_night, icon_night);

    
    
}

let loadWeekForecastData = (weather_city) => {
   // let weather_city =findWeatherCity("Guayaquil",weather_data);
    let weather_week = weather_city.forecast_week;
    let this_week = document.getElementById("this_week");
    let text_this_week="";
    //console.log(this_week);
    let formatted_info = (day, date, icon, minTemp, maxTemp)=>{
      return `
      <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
      <div class="d-flex flex-column">
        <h6 class="mb-1 text-dark font-weight-bold text-sm">${day}</h6>
        <span class="text-xs">${date}</span>
      </div>
      <div class="d-flex align-items-center ">
        <span class="font-weight-bold text-dark mx-2">${minTemp}</span> |  <span class="text-dark mx-2">${maxTemp}</span>
        <div class="ms-4"><i class="material-icons fs-2 me-1 rainy">${icon}</i></div>
      </div>
    </li>`;
      }
    let process_week = (weatherOfWeek)=>{
       for(let week of weatherOfWeek){
          let {date:_date,text:_text_day,icon:_icon,temperature:_temperature}= week;
          let {min: min_temp, max: max_temp} = _temperature;
          text_this_week+= formatted_info(_text_day,_date,_icon,min_temp, max_temp);
       }
   
       return text_this_week;

    }
    this_week.innerHTML=process_week(weather_week);
   
}

let findWeatherCity=(name_city,data)=>{
    for(let ciudad of data){
        if(ciudad.city===name_city){
            return ciudad;
        }
    }
}

let loadCities = ()=>{
  let mySelect= document.getElementById("dropdownMenuButton");
  for(let ciudad of weather_data){
    var option = document.createElement("option");
    option.value = ciudad.city;
    option.text =  ciudad.city;
    option.class = "dropdown-item"
    mySelect.add(option);
  } 
}

let searchDataCity=(city_chosen)=>{
  let data_city= findWeatherCity(city_chosen,weather_data);
  return data_city;
}

document.addEventListener("DOMContentLoaded", (event) => {
  loadCities();  
  var city_chosen = (document.getElementById("dropdownMenuButton").value==""||document.getElementById("dropdownMenuButton").value==undefined)?"Guayaquil":document.getElementById("dropdownMenuButton").value;
  let searchData =  searchDataCity(city_chosen);
  loadDayForecastData(searchData);
  let loadInfo = document.getElementById("loadinfo");
  let selectCities= document.getElementById("dropdownMenuButton");
  loadInfo.addEventListener('click', (event) => {     
    var city_chosen = (document.getElementById("dropdownMenuButton").value==""||document.getElementById("dropdownMenuButton").value==undefined)?"Guayaquil":document.getElementById("dropdownMenuButton").value;
    let searchData =  searchDataCity(city_chosen);
    loadWeekForecastData(searchData);
  });
  selectCities.addEventListener('change', (event) => {   
    //Código a ejecutar
    //El event contiene la información del elemento seleccionado
     let selectedValue = event.target.value ;
     let this_week = document.getElementById("this_week");
     this_week.innerHTML="";
     let searchData =  searchDataCity( selectedValue)
     loadDayForecastData(searchData);
    });
});
