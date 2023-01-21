const minutesElement = document.querySelector('.minutes');
const secnodsElement = document.querySelector('.seconds');
const buttonStart = document.querySelector('.start');
let interval;
let minutes = 0;
let seconds = 0;

const startStopWatch = function(){
    buttonStart.style.display = 'none';
    clearInterval(interval);
    interval = setInterval(() => {
        seconds++;

        if(seconds >= 60){
            seconds = 0;
            minutes++;
        }

        if(minutes == 0){
            if(seconds < 10){
                minutesElement.textContent = '00';
                secnodsElement.textContent = '0' + seconds;
            }else{
                minutesElement.textContent = '00';
                secnodsElement.textContent = seconds;
            }
        }else{
            if(minutes < 10){
                minutesElement.textContent = '0' + minutes;
                if(seconds < 10){
                    secnodsElement.textContent = '0' + seconds;
                }else{
                    secnodsElement.textContent = seconds;
                }
            }else{
                minutesElement.textContent = minutes;
                if(seconds < 10){
                    secnodsElement.textContent = '0' + seconds;
                }else{
                    secnodsElement.textContent = seconds;
                }
            }
        }
    }, 1000);
}

const stop = function(){
    clearInterval(interval);
    buttonStart.style.display = 'inline';
}

const reset = function(){
    clearInterval(interval);
    minutesElement.textContent = '00';
    secnodsElement.textContent = '00';
    minutes = 0;
    seconds = 0;
    buttonStart.style.display = 'inline';
}
