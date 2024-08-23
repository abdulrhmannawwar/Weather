let URL = "https://api.weatherapi.com/v1/current.json?key=42f146a1737c47258cd223820242306=Egypt"
let img = document.getElementById("image");
let temp = document.getElementById("temp");
let cond = document.getElementById("cond");
let cloudOne = document.querySelector(".cloudOne");
let cloudTwo = document.querySelector(".cloudTwo");
fetchUrl(URL);

async function fetchUrl(url){
    try{
        const promise = await fetch(url);
        const data = await promise.json();
        img.src = data.current.condition.icon ;
        temp.innerHTML = data.current.temp_c + "°C";
        cond.innerHTML = data.current.condition.text;
        let condition = data.current.condition.text;
        if(condition==="Partly cloudy" || condition==="Cloudy" || condition==="Mist" || condition==="Patchy light rain with thunder" || condition==="Overcast" || condition==="Light rain" || condition==="Patchy rain nearby" ){
            document.body.style.backgroundImage = "";
            cloudOne.style.display = "block";
            cloudTwo.style.display = "block";
        } else if(condition==="Sunny"){
            document.body.style.backgroundImage = "linear-gradient(320deg, rgba(255,255,255,1) 8%, rgba(237,246,86,1) 100%)";
            cloudOne.style.display = "none";
            cloudTwo.style.display = "none";
        } else if (condition==="Clear"){
            document.body.style.backgroundImage = "";
            cloudOne.style.display = "none";
            cloudTwo.style.display = "none";
        } else if(condition="Moderate or heavy rain with thunder"){
            document.body.style.backgroundImage = "linear-gradient(283deg, rgba(50,37,140,1) 8%, rgba(166,160,255,1) 100%)";
            cloudOne.style.display = "block";
            cloudTwo.style.display = "block";
        }
    }
    catch(e){
        temp.innerHTML = "could not find the country";
    }
}
let countries = document.getElementById("countries");
async function fetchCountries() {
    try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    const countryNames = data.map(country => country.name.common); 

    countryNames.sort(); 
    let notFound = ["Antarctica","Eswatini","Czechia","Israel"]
    for(let i = 0 ; i<countryNames.length; i++){
        let ele = document.createElement('option');
        if(!countryNames[i].includes(" ") && !notFound.includes(countryNames[i])){
            ele.value = countryNames[i];
            ele.textContent = countryNames[i];
            countries.appendChild(ele);
        }
    }
    } 
    catch(e){
        console.error(e);
    }
}
countries.addEventListener("input",()=>{
    console.log(countries.value);
    let url = `https://api.weatherapi.com/v1/current.json?key=42f146a1737c47258cd223820242306&q=${countries.value}`;
    fetchUrl(url);
})
fetchCountries();

