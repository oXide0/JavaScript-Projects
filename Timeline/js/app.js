const onRoundEntry = function(entry) {
    entry.forEach(change => {
        if(change.isIntersecting) {
            change.target.style.background = '#f45b69';
        }else {
            change.target.style.background = '#fff';
        }
    });
}

const onRightEntry = function(entry) {
    entry.forEach(change => {
        if(change.isIntersecting) {
            change.target.style.transform = 'translateX(0px)';
        }else {
            change.target.style.transform = 'translateX(700px)';
        }
    });
}

const onLeftEntry = function(entry) {
    entry.forEach(change => {
        if(change.isIntersecting) {
            change.target.style.transform = 'translateX(0px)';
        }else {
            change.target.style.transform = 'translateX(-700px)';
        }
    });
}

let options = {
    thresholds: [0.5],
}

let leftObserver = new IntersectionObserver(onLeftEntry, options);
const tableLeft = Array.from(document.querySelectorAll('.border__table-left'));

for(let elm of tableLeft) {
    leftObserver.observe(elm);
}


let rightObserver = new IntersectionObserver(onRightEntry, options);
const tableRight = Array.from(document.querySelectorAll('.border__table-right'));

for(let elm of tableRight) {
    rightObserver.observe(elm);
}

let roundObserver = new IntersectionObserver(onRoundEntry, options);
const borderRound = Array.from(document.querySelectorAll('.border__round'));

for(let elm of borderRound) {
    roundObserver.observe(elm);
}
