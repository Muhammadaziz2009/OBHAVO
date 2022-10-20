
let numberOfCards = 0;
const apiKey = 'eb380ce293c80acb396c9d71258f3d32';
const form = document.querySelector('form');
const weatherDisplay = document.querySelector('#weather__results');
var formInput = document.querySelector('#city__input');
var inputVal;
var result;

function deleteCard(n){
    document.getElementById(n).remove();
    numberOfCards--;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    inputVal = formInput.value.toString();
    if(numberOfCards > 0){
        let alreadySearched = document.getElementsByClassName('city');
        for(let i = 0; i < alreadySearched.length; i++){
            let element = alreadySearched[i].innerText.toString();
        
            if(element.indexOf(inputVal) !== -1){
                let alreadySearchedCards = document.getElementsByClassName('weather__card');
                alreadySearchedCards[i].remove()
            }
        }
    }
    useWeather();
})
async function fetchWeather(key,city){
    let response = await
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    let data = response.json();
    return data;
}
async function useWeather(){
    try{
        result = await fetchWeather(apiKey, inputVal);
        addCard();
    }

    catch(error){
        console.log('Iltimos manzilni togri kiriting');
        form.reset();
        formInput.focus();
    }
}

function addCard(){
    numberOfCards ++;
    var {name, main, sys, wind, weather} = result;
    let newCard = `<div class="weather__card" id="card__${numberOfCards}">
    <button class="card__pin" onClick="deleteCard('card__${numberOfCards}')"></button>
    <div class="city">${name}<sup>${sys.country}</sup></div>
    <div class="temperature">${Math.round(main.temp)}<sup>o</sup>C</div>
    <div class="weather">
        <div class="weather__icon"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg" alt="${weather[0].main} icon"></div>
        <div class="weather__description">${weather[0].description}</div>
    </div>
    <div class="wind__speed">Wind speed: ${wind.speed}m/s</div>
    <div class="humidity">Humidy: ${main.humidity}%</div>
</div>`;

    weatherDisplay.insertAdjacentHTML("afterbegin", newCard);
    document.getElementById(`card-${numberOfCards}`).style.animation = 'card-spin 1s ease-out';
    form.reset();
    formInput.focus();
}