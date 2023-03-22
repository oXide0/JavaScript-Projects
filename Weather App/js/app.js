const convertTimeFormat = function(hour, minute) {
    const timePart = document.querySelector('.time__part');
    let resultHour, resultMinute;
    if(hour <= 9) {
        resultHour = `0${hour}`;
        timePart.textContent = 'AM';
    }else {
        if(hour > 12) {
            resultHour = hour - 12;
            if(resultHour < 10) {
                resultHour = `0${resultHour}`;
            }
            timePart.textContent = 'PM';
        }else {
            resultHour = hour;
            timePart.textContent = 'AM';
        }
    }

    if(minute <= 9) {
        resultMinute = `0${minute}`;
    }else {
        resultMinute = minute;
    }
    return `${resultHour}:${resultMinute}`;
}

const date = {
    timeElement: document.querySelector('.time'),
    dateElement: document.querySelector('.date'),
    dayElements: document.querySelectorAll('.day'),
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    updateTime() {
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const day = this.days[currentDate.getDay()];
        const dateNumber = currentDate.getDate();
        const month = this.months[currentDate.getMonth()].slice(0, 3);
        this.timeElement.textContent = convertTimeFormat(hours, minutes);
        this.dateElement.textContent = `${day}, ${dateNumber} ${month}`;
        let dayNumber = currentDate.getDay() + 1;
        this.dayElements[0].textContent = this.days[currentDate.getDay()];
        for(let i = 1; i < this.dayElements.length; i++, dayNumber++) {
            if(dayNumber == 7) {
                dayNumber = 0;
            }
            this.dayElements[i].textContent = this.days[dayNumber].slice(0, 3);
        }
    }
}

const getWatherData = function(city) {
    const apiKey = '49cc8c821cd2aff9af04c9f98c36eb74';
    navigator.geolocation.getCurrentPosition((success) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {
        showWeatherData(data);
        console.log(data);
        });;
    });
}

const showWeatherData = function(data) {
    let {humidity, pressure, temp_max, temp_min} = data.main;
    let {speed} = data.wind;
    let {sunrise, sunset} = data.sys;
    let {description} = data.weather[0];
    document.querySelector('.humidity').textContent = humidity + '%';
    document.querySelector('.pressure').textContent = pressure;
    document.querySelector('.wind').textContent = speed;
    document.querySelector('.sunrise').textContent = window.moment(sunrise * 1000).format('HH:mm a');
    document.querySelector('.sunset').textContent = window.moment(sunset*1000).format('HH:mm a');
    for(let i = 0; i < document.querySelectorAll('.day_degree').length; i++) {
        document.querySelectorAll('.day_degree')[i].textContent = 'Day - ' + temp_max + '°C';
        document.querySelectorAll('.night_degree')[i].textContent = 'Night - ' + temp_min + '°C';
        let hours = parseInt(document.querySelector('.time').textContent);
        switch(description) {
            case 'clear sky':
                if(document.querySelector('.time__part').textContent == 'PM' && hours > 10) {
                    document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/night.png');
                }else {
                    document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/sun.png');
                }
                break;
            case 'few clouds':
                if(document.querySelector('.time__part').textContent == 'PM' && hours > 10) {
                    document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/cloudy_night.png');
                }else {
                    document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/partly-cloudy.png');
                }
                break;
            case 'scattered clouds':
                document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/cloudy.png');
                break;
            case 'broken clouds':
                document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/cloudy.png');
                break;
            case 'shower rain':
                document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/raining.png');
                break;
            case 'rain':
                document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/raining.png');
                break;
            case 'thunderstorm':
                document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/thunder.png');
                break;
            case 'snow':
                document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/snowing.png');
                break;
            case 'mist':
                document.querySelectorAll('.weather__icon')[0].setAttribute('src', 'img/wind.png');
                break;
        }
    }
}

const getLocation = function() {
    let bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            bdcApi = bdcApi
                + "?latitude=" + position.coords.latitude
                + "&longitude=" + position.coords.longitude
                + "&localityLanguage=en";
            getApi(bdcApi);

        },
        (err) => { getApi(bdcApi); },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
}

const getApi = function(bdcApi) {
    const Http = new XMLHttpRequest();
    Http.open("GET", bdcApi);
    Http.send();
    Http.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);
            document.querySelector('.place__text').textContent = res.city;
            getWatherData(res.city);
        }
    };
}

date.updateTime();
setTimeout(function setTime() {
    date.updateTime();
    setTimeout(setTime, 1000);
}, 1000);


class City {
    constructor(city) {
        this.city = city.toLowerCase();
        this.img = `url(../img/${this.city}.jpg)`;
    }
    setBackground() {
        const page = document.querySelector('.main');
        page.style.backgroundImage = this.img;
    }
}

const setCity = function() {
    const cities = ['Bratislava', 'Dublin', 'Kiev', 'Kosice', 'Moscow', 'Zhytomyr', 'London', 'Rome', 'Paris', 'Madrid', 'Amsterdam', 'Warsaw', 'Praha', 'Brussel', 'Vienna', 'Berlin', 'Bern', 'Budapest'];
    const searchBtn = document.querySelector('.place');
    const submitBtn = document.querySelector('.submit__btn');
    const input = document.querySelector('#place__input');

    searchBtn.addEventListener('click', () => {
        document.querySelector('.place').classList.add('right_hidden');
        document.querySelector('.place__form').classList.remove('right_hidden');
        input.focus();
    });

    function submitCity() {
        document.querySelector('.place').classList.remove('right_hidden');
        document.querySelector('.place__form').classList.add('right_hidden');
        cities.forEach((city) => {
            if(city == input.value) {
                const cityClass = new City(input.value);
                cityClass.setBackground();
                document.querySelector('.place__text').textContent = input.value;
                input.value = '';
                getWatherData(city);
                return;
            }
        });
    }

    setInterval(() => {
        if(input == document.activeElement) {
            window.addEventListener('keydown', (e) => {
                if(e.key == 'Enter') {
                    submitCity();
                }
            });
        }
    }, 100);
    
    submitBtn.addEventListener('click', () => {
        submitCity();
        input.value = '';
    });
}

getLocation();
setCity();