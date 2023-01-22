const time = document.querySelector('.clock__time');
let currentTime, hours, now;
setInterval(() => {
    currentTime = new Date();
    hours = currentTime.getHours();
    now = currentTime.toLocaleTimeString();
    if(hours < 12){
        time.textContent = now + ' AM';
    }else{
        time.textContent = now + ' PM';
    }
}, 1000);
