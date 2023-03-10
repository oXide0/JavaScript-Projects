const navMenu = {
    sectionBtns: document.querySelectorAll('.menu__btn'),
}

const page = {
    title: document.querySelector('.intro__title'),
    space: document.querySelector('.main__bg'),
}

const musicBlock = {
    block: document.querySelectorAll('.music__block'),
    playBtn: document.querySelectorAll('.play__btn'),
    stopBtn: document.querySelectorAll('.stop__btn'),
}

const playlistBlock = {
    block: document.querySelectorAll('.playlist__block'),
    playBtn: document.querySelectorAll('.play__btn-2'),
    stopBtn: document.querySelectorAll('.stop__btn-2'),
}

const songPlayer = {
    playBtn: document.querySelector('.song__play'),
    likeBtn: document.querySelector('.like__btn'),
    shufflelBtn: document.querySelector('.shuffle__btn'),
    repeatBtn: document.querySelector('.repeat__btn'),
    ctrlBtn: document.querySelector('.control__btn'),
    ctrlBtn2: document.querySelector('.control__btn-2'),
    prevBtn: document.querySelector('.prev__btn'),
    nextBtn: document.querySelector('.next__btn'),
    progressBar: document.querySelector('.progress__bar'),
    songName: document.querySelector('.song__name_main'),
    songAutor: document.querySelector('.song__autor_main'),
}


const pageBg = [
    'linear-gradient(180deg, #0D1640 0%, #1E1E1E 100%)',
    'linear-gradient(180deg, #4C472A 0%, #1E1E1E 100%)',
    'linear-gradient(180deg, #3C0401 0%, #1E1E1E 100%)',
    'linear-gradient(180deg, #27303F 0%, #1E1E1E 100%)',
]

const playList = {
    playBtn: document.querySelector('.play__btn'),
    stopBtn: document.querySelector('.stop__btn'),
}

const songs = {
    song: document.querySelectorAll('.song'),
    playBtn: document.querySelectorAll('.song__play_main'),
    likeBtn: document.querySelectorAll('.songs__like'),
    audioSong: document.querySelectorAll('.weekly_1'),
    songName: document.querySelectorAll('.song__name'),
    songAutor: document.querySelectorAll('.song__autor'),
}
/* ---------------------------------- FUNCTIONS DECLARATIONS ---------------------------------- */
const directoryWay = function(directory) {
    return location.href = directory;
}

const GoBack = function() {
    window.history.back();
}

const setSong = function(name, autor) {
    songPlayer.songName.textContent = name;
    songPlayer.songAutor.textContent = autor;
}

const setPartDay = function() {
    const currentTime = new Date;
    const hours = currentTime.getHours();
    if(hours >= 12 && hours < 18) {
        page.title.textContent = 'Good afternoon';
    }else if(hours >= 18 && hours <= 21) {
        page.title.textContent = 'Good evening';
    }else if(hours > 21 || hours < 7) {
        page.title.textContent = 'Good night';
    }else {
        page.title.textContent = 'Good morning';
    }
}

const changeImg = function(element, num) {
    element.addEventListener('click', () => {
        if(element.lastElementChild.classList.contains('hidden')) {
            element.firstElementChild.style.display = 'none';
            element.lastElementChild.classList.remove('hidden');
            if(num == 1) {
                element.classList.remove('song__btn');
            }
        }else {
            element.firstElementChild.style.display = 'inline';
            element.lastElementChild.classList.add('hidden');
            if(num == 1) {
                element.classList.add('song__btn');
            }
        }
    });
}

const menuSections = function() {
    for(let i = 0; i < navMenu.sectionBtns.length; i++) {
        navMenu.sectionBtns[i].addEventListener('click', () => {
            for(let i = 0; i < navMenu.sectionBtns.length; i++) {
                navMenu.sectionBtns[i].parentNode.classList.remove('avtive__item');
                navMenu.sectionBtns[i].lastChild.classList.remove('avtive__item_text');
                navMenu.sectionBtns[i].firstChild.classList.remove('active-nav-img');
            }
            navMenu.sectionBtns[i].parentNode.classList.add('avtive__item');
            navMenu.sectionBtns[i].lastChild.classList.add('avtive__item_text');
            navMenu.sectionBtns[i].firstChild.classList.add('active-nav-img');
        });
    }
}

const setPlaylists = function(element) {
    let a = 0;
    for(let i = 0; i < element.playBtn.length; i++) {
        element.playBtn[i].addEventListener('click', () => {
            element.stopBtn[i].style.display = 'inline';
            a = 1;

            document.querySelector(`.ply_${i}`).volume = .50;
            changeSound(document.querySelector(`.ply_${i}`));
            document.querySelector(`.ply_${i}`).play();
        });
        element.stopBtn[i].addEventListener('click', () => {
            element.stopBtn[i].style.display = 'none';
            element.playBtn[i].style.display = 'inline';
            a = 0;

            document.querySelector(`.ply_${i}`).pause();
        });

        element.block[i].addEventListener('mouseover', () => {
            if(a != 1) {
                element.playBtn[i].style.display = 'inline';
                page.space.style.background = pageBg[i];
            }
        });
        element.block[i].addEventListener('mouseout', () => {
            element.playBtn[i].style.display = 'none';
            page.space.style.background = 'linear-gradient(180deg, #1E1E1E 0%, #1E1E1E 100%)';
        });
    }
}

const changeSound = function(song) {
    document.querySelector('.change_sound').addEventListener('input', () => {
        if(document.querySelector('.change_sound').value == 100 ) {
            song.volume = 1;
        }else if(document.querySelector('.change_sound').value < 10 && document.querySelector('.change_sound').value != 0) {
            song.volume = '.' + '1' + document.querySelector('.change_sound').value;
        }
        else {
            song.volume = '.' + document.querySelector('.change_sound').value;
        }
    });
}

const likePlaylistSong = function() {
    for(let i = 0; i < songs.likeBtn.length; i++) {
        songPlayer.likeBtn.addEventListener('click', () => {
            if(songs.songName[i].textContent == songPlayer.songName.textContent) {
                if(songPlayer.likeBtn.lastElementChild.classList.contains('hidden')) {
                    songPlayer.likeBtn.firstElementChild.style.display = 'none';
                    songPlayer.likeBtn.lastElementChild.classList.remove('hidden');
                    songPlayer.likeBtn.classList.remove('song__btn');
        
                    songs.likeBtn[i].firstElementChild.style.display = 'none';
                    songs.likeBtn[i].lastElementChild.classList.remove('hidden');
                    songs.likeBtn[i].classList.remove('song__btn');
                }else {
                    songPlayer.likeBtn.firstElementChild.style.display = 'inline';
                    songPlayer.likeBtn.lastElementChild.classList.add('hidden');
                    songPlayer.likeBtn.classList.add('song__btn');
        
                    songs.likeBtn[i].firstElementChild.style.display = 'inline';
                    songs.likeBtn[i].lastElementChild.classList.add('hidden');
                    songs.likeBtn[i].classList.add('song__btn');
                }
            }
        });
    }
}

const likeSong = function() {
    for(let i = 0; i < songs.likeBtn.length; i++) {
        songs.likeBtn[i].addEventListener('click', () => {
            if(songs.likeBtn[i].lastElementChild.classList.contains('hidden')) {
                songs.likeBtn[i].firstElementChild.style.display = 'none';
                songs.likeBtn[i].lastElementChild.classList.remove('hidden');
                songs.likeBtn[i].classList.remove('song__btn');

                if(songs.songName[i].textContent == songPlayer.songName.textContent) {
                    songPlayer.likeBtn.firstElementChild.style.display = 'none';
                    songPlayer.likeBtn.lastElementChild.classList.remove('hidden');
                    songPlayer.likeBtn.classList.remove('song__btn');
                }                
            }else {
                songs.likeBtn[i].firstElementChild.style.display = 'inline';
                songs.likeBtn[i].lastElementChild.classList.add('hidden');
                songs.likeBtn[i].classList.add('song__btn');

                if(songs.songName[i].textContent == songPlayer.songName.textContent) {
                    songPlayer.likeBtn.firstElementChild.style.display = 'inline';
                    songPlayer.likeBtn.lastElementChild.classList.add('hidden');
                    songPlayer.likeBtn.classList.add('song__btn');
                }
            }
        });
    }
    likePlaylistSong();
}

const songPlay = function(i) {
    playList.playBtn.style.display = 'none';
    playList.stopBtn.style.display = 'inline';

    songs.playBtn[i].firstElementChild.style.display = 'none';
    songs.playBtn[i].lastElementChild.classList.remove('hidden');
    songs.song[i].classList.add('active__song');

    songPlayer.playBtn.firstElementChild.style.display = 'none';
    songPlayer.playBtn.lastElementChild.classList.remove('hidden');
    songPlayer.playBtn.style.opacity = '1';
    // Set name and autor of song in footer
    setSong(songs.songName[i].textContent, document.querySelectorAll('.song__autor')[i].textContent);
    document.querySelector('.footer__part-1').style.visibility = 'visible';
    // Change color of name and num of song
    songs.songName[i].style.color = '#1DB954';
    document.querySelectorAll('.num')[i].style.color = '#1DB954';

    // Check if song liked
    if(songs.likeBtn[i].classList.contains('song__btn') == false) {
        songPlayer.likeBtn.firstElementChild.style.display = 'none';
        songPlayer.likeBtn.lastElementChild.classList.remove('hidden');
        songPlayer.likeBtn.classList.remove('song__btn');
    }else {
        songPlayer.likeBtn.firstElementChild.style.display = 'inline';
        songPlayer.likeBtn.lastElementChild.classList.add('hidden');
        songPlayer.likeBtn.classList.add('song__btn');
    }

    document.querySelector('.second__time').textContent = document.querySelectorAll('.song__time')[i].textContent;

    songs.audioSong[i].play();
}


const songAction = function() {
    let interval, a = 0, min = 0, s = 0, check, checkNSong = 0;
    const time = document.querySelectorAll('.song__time');

    for(let i = 0; i < songs.audioSong.length; i++) {
        songs.audioSong[i].volume = .50;
    }
    /* --------------------- BUTTONS OF SONGS --------------------- */

    for(let i = 0; i < songs.playBtn.length; i++) {
        songs.playBtn[i].addEventListener('click', () => {
            if(songs.playBtn[i].lastElementChild.classList.contains('hidden')) {
                for(let i = 0; i < songs.playBtn.length; i++) {
                    if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                        // Stoping song
                        songs.playBtn[i].lastElementChild.classList.add('hidden');
                        songs.playBtn[i].firstElementChild.style.display = 'inline';
                        songs.song[i].classList.remove('active__song');

                        songs.songName[i].style.color = '#fff';
                        document.querySelectorAll('.num')[i].style.color = '#fff';

                        clearInterval(interval);
                        min = 0;
                        a = 0;
                        s = 0;
                        document.querySelector('.first__time').textContent = '0:00';
                        document.querySelector('.progress__bar').value = 0;

                        songs.audioSong[i].pause();
                        songs.audioSong[i].currentTime = 0;
                    }
                }
                if(check != i) {
                    clearInterval(interval);
                    min = 0;
                    a = 0;
                    s = 0;
                    document.querySelector('.first__time').textContent = '0:00';
                    document.querySelector('.progress__bar').value = 0;
                    songs.audioSong[i].currentTime = 0;
                }
            
                interval = setInterval(() => {
                    let minutes = parseInt(time[i].textContent);
                    let seconds = parseInt(time[i].textContent.slice(time[i].textContent.indexOf(':') + 1)) + (minutes * 60);
                    if(min == minutes && a == parseInt(time[i].textContent.slice(time[i].textContent.indexOf(':') + 1))) {
                        clearInterval(interval);
                        min = 0;
                        a = 0;
                        s = 0;
                        document.querySelector('.first__time').textContent = '0:00';
                        document.querySelector('.progress__bar').value = 0;
                        songs.audioSong[i].currentTime = 0;
                        songs.audioSong[i].pause();

                        for(let i = 0; i < songs.playBtn.length; i++) {
                            if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                                // Stoping song
                                songs.playBtn[i].lastElementChild.classList.add('hidden');
                                songs.playBtn[i].firstElementChild.style.display = 'inline';
                                songs.song[i].classList.remove('active__song');
        
                                songs.songName[i].style.color = '#fff';
                                document.querySelectorAll('.num')[i].style.color = '#fff';
        
                                clearInterval(interval);
                                min = 0;
                                a = 0;
                                s = 0;
                                document.querySelector('.first__time').textContent = '0:00';
                                document.querySelector('.progress__bar').value = 0;
        
                                songs.audioSong[i].pause();
                                songs.audioSong[i].currentTime = 0;
                            }
                        }

                        interval = setInterval(() => {
                            minutes = parseInt(time[i].textContent);
                            seconds = parseInt(time[i].textContent.slice(time[i].textContent.indexOf(':') + 1)) + (minutes * 60);

                            if(a < 10) {
                                strTime = `${min}:0${a}`;
                            }else if(a >= 10 && a < 60) {
                                strTime = `${min}:${a}`;
                            }else {
                                a -= 60;
                                min++;
                                strTime = `${min}:0${a}`;
                            }

                            document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                            document.querySelector('.first__time').textContent = strTime;
                            a++;
                            s++;
                        }, 1000);

                        i++;
                        songPlay(i);
                    }
                    if(a < 10) {
                        strTime = `${min}:0${a}`;
                    }else if(a >= 10 && a < 60) {
                        strTime = `${min}:${a}`;
                    }else {
                        a -= 60;
                        min++;
                        strTime = `${min}:0${a}`;
                    }
                    document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                    document.querySelector('.first__time').textContent = strTime;
                    a++;
                    s++;
                }, 1000);
                changeImg(songPlayer.shufflelBtn, 1);
                changeImg(songPlayer.repeatBtn, 1);
                changeImg(songPlayer.ctrlBtn, 1);
                changeImg(songPlayer.ctrlBtn2, 1);
                // Start play song
                songPlay(i);
                checkNSong = i;
            }else {
                playList.playBtn.style.display = 'inline';
                playList.stopBtn.style.display = 'none';

                songs.playBtn[i].firstElementChild.style.display = 'inline';
                songs.playBtn[i].lastElementChild.classList.add('hidden');
                songs.song[i].classList.remove('active__song');

                songPlayer.playBtn.firstElementChild.style.display = 'inline';
                songPlayer.playBtn.lastElementChild.classList.add('hidden');

                songs.songName[i].style.color = '#fff';
                document.querySelectorAll('.num')[i].style.color = '#fff';

                clearInterval(interval);
                check = i;
                songs.audioSong[i].pause();
            }
        });
    }
    /* --------------------- BUTTON OF ALL PLAYLIST --------------------- */

    playList.playBtn.addEventListener('click', () => {
        for(let i = 0; i < songs.playBtn.length; i++) {
            if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                // Stoping song
                songs.playBtn[i].lastElementChild.classList.add('hidden');
                songs.playBtn[i].firstElementChild.style.display = 'inline';
                songs.song[i].classList.remove('active__song');

                songs.songName[i].style.color = '#fff';
                document.querySelectorAll('.num')[i].style.color = '#fff';

                clearInterval(interval);
                min = 0;
                a = 0;
                s = 0;
                document.querySelector('.first__time').textContent = '0:00';
                document.querySelector('.progress__bar').value = 0;

                songs.audioSong[i].pause();
                songs.audioSong[i].currentTime = 0;
            }
        }

        if(check != checkNSong) {
            clearInterval(interval);
            min = 0;
            a = 0;
            s = 0;
            document.querySelector('.first__time').textContent = '0:00';
            document.querySelector('.progress__bar').value = 0;
            songs.audioSong[checkNSong].currentTime = 0;
        }

        interval = setInterval(() => {
            let minutes = parseInt(time[checkNSong].textContent);
            let seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);
            if(min == minutes && a == parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1))) {
                clearInterval(interval);
                min = 0;
                a = 0;
                s = 0;
                document.querySelector('.first__time').textContent = '0:00';
                document.querySelector('.progress__bar').value = 0;
                songs.audioSong[checkNSong].currentTime = 0;
                songs.audioSong[checkNSong].pause();

                for(let i = 0; i < songs.playBtn.length; i++) {
                    if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                        // Stoping song
                        songs.playBtn[i].lastElementChild.classList.add('hidden');
                        songs.playBtn[i].firstElementChild.style.display = 'inline';
                        songs.song[i].classList.remove('active__song');

                        songs.songName[i].style.color = '#fff';
                        document.querySelectorAll('.num')[i].style.color = '#fff';

                        clearInterval(interval);
                        min = 0;
                        a = 0;
                        s = 0;
                        document.querySelector('.first__time').textContent = '0:00';
                        document.querySelector('.progress__bar').value = 0;

                        songs.audioSong[i].pause();
                        songs.audioSong[i].currentTime = 0;
                    }
                }

                interval = setInterval(() => {
                    minutes = parseInt(time[checkNSong].textContent);
                    seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);

                    if(a < 10) {
                        strTime = `${min}:0${a}`;
                    }else if(a >= 10 && a < 60) {
                        strTime = `${min}:${a}`;
                    }else {
                        a -= 60;
                        min++;
                        strTime = `${min}:0${a}`;
                    }

                    document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                    document.querySelector('.first__time').textContent = strTime;
                    a++;
                    s++;
                }, 1000);

                checkNSong++;
                songPlay(checkNSong);
            }
            if(a < 10) {
                strTime = `${min}:0${a}`;
            }else if(a >= 10 && a < 60) {
                strTime = `${min}:${a}`;
            }else {
                a -= 60;
                min++;
                strTime = `${min}:0${a}`;
            }
            document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
            document.querySelector('.first__time').textContent = strTime;
            a++;
            s++;
        }, 1000);
        changeImg(songPlayer.shufflelBtn, 1);
        changeImg(songPlayer.repeatBtn, 1);
        changeImg(songPlayer.ctrlBtn, 1);
        changeImg(songPlayer.ctrlBtn2, 1);

        songPlay(checkNSong);
    });
    
    playList.stopBtn.addEventListener('click', () => {
        playList.playBtn.style.display = 'inline';
        playList.stopBtn.style.display = 'none';

        songs.playBtn[checkNSong].firstElementChild.style.display = 'inline';
        songs.playBtn[checkNSong].lastElementChild.classList.add('hidden');
        songs.song[checkNSong].classList.remove('active__song');

        songPlayer.playBtn.firstElementChild.style.display = 'inline';
        songPlayer.playBtn.lastElementChild.classList.add('hidden');

        songs.songName[checkNSong].style.color = '#fff';
        document.querySelectorAll('.num')[checkNSong].style.color = '#fff';

        clearInterval(interval);
        check = checkNSong;
        songs.audioSong[checkNSong].pause();
    });
    /* --------------------- BUTTON OF SONGPLAYER --------------------- */

    songPlayer.playBtn.addEventListener('click', () => {
        if(songPlayer.playBtn.lastElementChild.classList.contains('hidden')) {
            for(let i = 0; i < songs.playBtn.length; i++) {
                if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                    // Stoping song
                    songs.playBtn[i].lastElementChild.classList.add('hidden');
                    songs.playBtn[i].firstElementChild.style.display = 'inline';
                    songs.song[i].classList.remove('active__song');
    
                    songs.songName[i].style.color = '#fff';
                    document.querySelectorAll('.num')[i].style.color = '#fff';
    
                    clearInterval(interval);
                    min = 0;
                    a = 0;
                    s = 0;
                    document.querySelector('.first__time').textContent = '0:00';
                    document.querySelector('.progress__bar').value = 0;
    
                    songs.audioSong[i].pause();
                    songs.audioSong[i].currentTime = 0;
                }
            }
    
            if(check != checkNSong) {
                clearInterval(interval);
                min = 0;
                a = 0;
                s = 0;
                document.querySelector('.first__time').textContent = '0:00';
                document.querySelector('.progress__bar').value = 0;
                songs.audioSong[checkNSong].currentTime = 0;
            }
    
            interval = setInterval(() => {
                let minutes = parseInt(time[checkNSong].textContent);
                let seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);
                if(min == minutes && a == parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1))) {
                    clearInterval(interval);
                    min = 0;
                    a = 0;
                    s = 0;
                    document.querySelector('.first__time').textContent = '0:00';
                    document.querySelector('.progress__bar').value = 0;
                    songs.audioSong[checkNSong].currentTime = 0;
                    songs.audioSong[checkNSong].pause();
    
                    for(let i = 0; i < songs.playBtn.length; i++) {
                        if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                            // Stoping song
                            songs.playBtn[i].lastElementChild.classList.add('hidden');
                            songs.playBtn[i].firstElementChild.style.display = 'inline';
                            songs.song[i].classList.remove('active__song');
    
                            songs.songName[i].style.color = '#fff';
                            document.querySelectorAll('.num')[i].style.color = '#fff';
    
                            clearInterval(interval);
                            min = 0;
                            a = 0;
                            s = 0;
                            document.querySelector('.first__time').textContent = '0:00';
                            document.querySelector('.progress__bar').value = 0;
    
                            songs.audioSong[i].pause();
                            songs.audioSong[i].currentTime = 0;
                        }
                    }
    
                    interval = setInterval(() => {
                        minutes = parseInt(time[checkNSong].textContent);
                        seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);
    
                        if(a < 10) {
                            strTime = `${min}:0${a}`;
                        }else if(a >= 10 && a < 60) {
                            strTime = `${min}:${a}`;
                        }else {
                            a -= 60;
                            min++;
                            strTime = `${min}:0${a}`;
                        }
    
                        document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                        document.querySelector('.first__time').textContent = strTime;
                        a++;
                        s++;
                    }, 1000);
    
                    checkNSong++;
                    songPlay(checkNSong);
                }
                if(a < 10) {
                    strTime = `${min}:0${a}`;
                }else if(a >= 10 && a < 60) {
                    strTime = `${min}:${a}`;
                }else {
                    a -= 60;
                    min++;
                    strTime = `${min}:0${a}`;
                }
                document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                document.querySelector('.first__time').textContent = strTime;
                a++;
                s++;
            }, 1000);
            changeImg(songPlayer.shufflelBtn, 1);
            changeImg(songPlayer.repeatBtn, 1);
            changeImg(songPlayer.ctrlBtn, 1);
            changeImg(songPlayer.ctrlBtn2, 1);
    
            songPlay(checkNSong);
        }else {
            songPlayer.playBtn.firstElementChild.style.display = 'inline';
            songPlayer.playBtn.lastElementChild.classList.add('hidden');

            playList.playBtn.style.display = 'inline';
            playList.stopBtn.style.display = 'none';

            songs.playBtn[checkNSong].firstElementChild.style.display = 'inline';
            songs.playBtn[checkNSong].lastElementChild.classList.add('hidden');
            songs.song[checkNSong].classList.remove('active__song');

            songs.songName[checkNSong].style.color = '#fff';
            document.querySelectorAll('.num')[checkNSong].style.color = '#fff';

            clearInterval(interval);
            check = checkNSong;
            songs.audioSong[checkNSong].pause();
        }
    });

    songPlayer.nextBtn.addEventListener('click', () => {
        if(checkNSong < songs.song.length - 1) {
            clearInterval(interval);
            min = 0;
            a = 0;
            s = 0;
            document.querySelector('.first__time').textContent = '0:00';
            document.querySelector('.progress__bar').value = 0;
            songs.audioSong[checkNSong].currentTime = 0;
            songs.audioSong[checkNSong].pause();

            for(let i = 0; i < songs.playBtn.length; i++) {
                if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                    // Stoping song
                    songs.playBtn[i].lastElementChild.classList.add('hidden');
                    songs.playBtn[i].firstElementChild.style.display = 'inline';
                    songs.song[i].classList.remove('active__song');

                    songs.songName[i].style.color = '#fff';
                    document.querySelectorAll('.num')[i].style.color = '#fff';

                    clearInterval(interval);
                    min = 0;
                    a = 0;
                    s = 0;
                    document.querySelector('.first__time').textContent = '0:00';
                    document.querySelector('.progress__bar').value = 0;

                    songs.audioSong[i].pause();
                    songs.audioSong[i].currentTime = 0;
                }
            }

            interval = setInterval(() => {
                let minutes = parseInt(time[checkNSong].textContent);
                let seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);
                if(min == minutes && a == parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1))) {
                    clearInterval(interval);
                    min = 0;
                    a = 0;
                    s = 0;
                    document.querySelector('.first__time').textContent = '0:00';
                    document.querySelector('.progress__bar').value = 0;
                    songs.audioSong[checkNSong].currentTime = 0;
                    songs.audioSong[checkNSong].pause();
    
                    interval = setInterval(() => {
                        minutes = parseInt(time[checkNSong].textContent);
                        seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);
    
                        if(a < 10) {
                            strTime = `${min}:0${a}`;
                        }else if(a >= 10 && a < 60) {
                            strTime = `${min}:${a}`;
                        }else {
                            a -= 60;
                            min++;
                            strTime = `${min}:0${a}`;
                        }
    
                        document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                        document.querySelector('.first__time').textContent = strTime;
                        a++;
                        s++;
                    }, 1000);
    
                    checkNSong++;
                    songPlay(checkNSong);
                }
                if(a < 10) {
                    strTime = `${min}:0${a}`;
                }else if(a >= 10 && a < 60) {
                    strTime = `${min}:${a}`;
                }else {
                    a -= 60;
                    min++;
                    strTime = `${min}:0${a}`;
                }
                document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                document.querySelector('.first__time').textContent = strTime;
                a++;
                s++;
            }, 1000);

            checkNSong++;
            songPlay(checkNSong);
        }
    });

    songPlayer.prevBtn.addEventListener('click', () => {
        if(checkNSong > 0) {
            clearInterval(interval);
            min = 0;
            a = 0;
            s = 0;
            document.querySelector('.first__time').textContent = '0:00';
            document.querySelector('.progress__bar').value = 0;
            songs.audioSong[checkNSong].currentTime = 0;
            songs.audioSong[checkNSong].pause();

            for(let i = 0; i < songs.playBtn.length; i++) {
                if(songs.playBtn[i].lastElementChild.classList.contains('hidden') == false) {
                    // Stoping song
                    songs.playBtn[i].lastElementChild.classList.add('hidden');
                    songs.playBtn[i].firstElementChild.style.display = 'inline';
                    songs.song[i].classList.remove('active__song');

                    songs.songName[i].style.color = '#fff';
                    document.querySelectorAll('.num')[i].style.color = '#fff';

                    clearInterval(interval);
                    min = 0;
                    a = 0;
                    s = 0;
                    document.querySelector('.first__time').textContent = '0:00';
                    document.querySelector('.progress__bar').value = 0;

                    songs.audioSong[i].pause();
                    songs.audioSong[i].currentTime = 0;
                }
            }

            interval = setInterval(() => {
                let minutes = parseInt(time[checkNSong].textContent);
                let seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);
                if(min == minutes && a == parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1))) {
                    clearInterval(interval);
                    min = 0;
                    a = 0;
                    s = 0;
                    document.querySelector('.first__time').textContent = '0:00';
                    document.querySelector('.progress__bar').value = 0;
                    songs.audioSong[checkNSong].currentTime = 0;
                    songs.audioSong[checkNSong].pause();
    
                    interval = setInterval(() => {
                        minutes = parseInt(time[checkNSong].textContent);
                        seconds = parseInt(time[checkNSong].textContent.slice(time[checkNSong].textContent.indexOf(':') + 1)) + (minutes * 60);
    
                        if(a < 10) {
                            strTime = `${min}:0${a}`;
                        }else if(a >= 10 && a < 60) {
                            strTime = `${min}:${a}`;
                        }else {
                            a -= 60;
                            min++;
                            strTime = `${min}:0${a}`;
                        }
    
                        document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                        document.querySelector('.first__time').textContent = strTime;
                        a++;
                        s++;
                    }, 1000);
    
                    checkNSong++;
                    songPlay(checkNSong);
                }
                if(a < 10) {
                    strTime = `${min}:0${a}`;
                }else if(a >= 10 && a < 60) {
                    strTime = `${min}:${a}`;
                }else {
                    a -= 60;
                    min++;
                    strTime = `${min}:0${a}`;
                }
                document.querySelector('.progress__bar').value = Math.floor((s * 100) / seconds);
                document.querySelector('.first__time').textContent = strTime;
                a++;
                s++;
            }, 1000);
            
            checkNSong--;
            songPlay(checkNSong);
        }
    });
}

/* ----------------------------------------------------------------------------- */

menuSections();
if(document.querySelector('title').textContent == 'Music Player') {
    setPartDay();
    setPlaylists(musicBlock);
    setPlaylists(playlistBlock);
}else {
    for(let i = 0; i < songs.audioSong.length; i++) {
        changeSound(songs.audioSong[i]);
    }
    likeSong();
    songAction();
}