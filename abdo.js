let URL = "https://api.weatherapi.com/v1/current.json?key=42f146a1737c47258cd223820242306&q=Egypt"
let img = document.getElementById("image");
let temp = document.getElementById("temp");
let cond = document.getElementById("cond");
fetchUrl(URL);
async function fetchUrl(url){
    try{
        const promise = await fetch(url);
        const data = await promise.json();
        img.src = data.current.condition.icon ;
        temp.innerHTML = data.current.temp_c + "°C";
        cond.innerHTML = data.current.condition.text;
        console.log(data);
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
    for(let i = 0 ; i<countryNames.length; i++){
        let ele = document.createElement('option');
        if(!countryNames[i].includes(" ") && countryNames[i]!="Antarctica"){
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
fetchUrl(URL);

