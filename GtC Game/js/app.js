let blocks = document.querySelectorAll('.color__block');
const rgbTitle = document.querySelector('.rgb__title');
const resultText = document.querySelector('.control__correct');
let clr1, clr2, clr3, m = 0, n = 6;

const getRandomArbitrary = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const hardLevel = function() {
	document.querySelector('.easy_mode').style.background = 'none';
	document.querySelector('.easy_mode').style.color = 'rgb(3, 148, 148)';
	document.querySelector('.hard_mode').style.background = 'rgb(3, 148, 148)';
	document.querySelector('.hard_mode').style.color = '#fff';
	if(n == 3){
		n = 6;
		blocks = document.querySelectorAll('.color__block');
		for(let i = 0; i < blocks.length; i++){
			blocks[i].style.display = 'block';
		}
	}
	generaterColor();
}

const easyLevel = function() {
	for(let i = 0; i < blocks.length; i++){
		if(blocks[i].classList.contains('easy__block') == false) {
			blocks[i].style.display = 'none';
		}
	}
	n = 3;
	blocks = document.querySelectorAll('.easy__block');
	document.querySelector('.hard_mode').style.background = 'none';
	document.querySelector('.hard_mode').style.color = 'rgb(3, 148, 148)';
	document.querySelector('.easy_mode').style.background = 'rgb(3, 148, 148)';
	document.querySelector('.easy_mode').style.color = '#fff';
	generaterColor();
}

const generaterColor = function() {
	const correctBlock = getRandomArbitrary(m, n);

	resultText.style.visibility = 'hidden';
	document.querySelector('.field__rgb').style.background = `rgb(3, 148, 148)`;
	document.querySelector('.control__play').textContent = 'NEW COLORS';

	for(let i = 0; i < blocks.length; i++){
		blocks[i].style.visibility = 'visible';

		let r = getRandomArbitrary(1, 256);
		let g = getRandomArbitrary(1, 256);
		let b = getRandomArbitrary(1, 256);

		if(i == correctBlock){
			rgbTitle.textContent = `RGB(${r}, ${g}, ${b})`;
			clr1 = r;
			clr2 = g;
			clr3 = b;
		}

		blocks[i].style.background = `rgb(${r}, ${g}, ${b})`;
	}
	
	for(let i = 0; i < blocks.length; i++) {
		blocks[i].addEventListener('click', () => {
			if(blocks[i].style.background == `rgb(${clr1}, ${clr2}, ${clr3})`){
				resultText.textContent = 'CORRECT';
				resultText.style.visibility = 'visible';
				document.querySelector('.field__rgb').style.background = `rgb(${clr1}, ${clr2}, ${clr3})`;
				document.querySelector('.control__play').textContent = 'PLAY AGAIN';

				for(let i = 0; i < blocks.length; i++){
					blocks[i].style.visibility = 'visible';
					blocks[i].style.background = `rgb(${clr1}, ${clr2}, ${clr3})`;
				}
			}else if(blocks[i].style.background != `rgb(${clr1}, ${clr2}, ${clr3})`) {
				blocks[i].style.visibility = 'hidden';
				resultText.textContent = 'TRY AGAIN';
				resultText.style.visibility = 'visible';
			}
		});
	}
}




generaterColor();
