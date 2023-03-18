const form = {
    submitBtn: document.querySelectorAll('.send_link')[1],
    firstNameElement: document.querySelectorAll('.form__input')[0],
    lastNameElement: document.querySelectorAll('.form__input')[1],
    emailElement: document.querySelectorAll('.form__input')[2],
    numberElement:  document.querySelectorAll('.form__input')[3],
    professionElement: document.querySelectorAll('#form__select')[0],
    levelElement: document.querySelectorAll('#form__select')[1],
    jobTypeElement: document.querySelectorAll('#form__select')[2],
    langElements: document.querySelectorAll('.checkLang'),
}

const resultForm = {
    firstName: '',
    lastName: '',
    email: '',
    numberPhone: '',
    profession: '',
    level: '',
    jobType: '',
    languages: [],
}



form.submitBtn.addEventListener('click', () => {
    resultForm.firstName = form.firstNameElement.value;
    resultForm.lastName = form.lastNameElement.value;
    resultForm.email = form.emailElement.value;
    resultForm.numberPhone = form.numberElement.value;
    for(let i = 0; i < form.professionElement.length; i++) {
        if(form.professionElement[i].selected == true && form.professionElement[i].textContent != 'Profession') {
            resultForm.profession = form.professionElement[i].textContent;
        }
    }
    for(let i = 0; i < form.levelElement.length; i++) {
        if(form.levelElement[i].selected == true && form.levelElement[i].textContent != 'Expierence Level') {
            resultForm.level = form.levelElement[i].textContent;
        }
    }
    for(let i = 0; i < form.jobTypeElement.length; i++) {
        if(form.jobTypeElement[i].selected == true && form.jobTypeElement[i].textContent != 'Job Type') {
            resultForm.jobType = form.jobTypeElement[i].textContent;
        }
    }
    let a = 0;
    for(let i = 0; i < form.langElements.length; i++) {
        if(form.langElements[i].checked == true) {
            resultForm.languages[a] = document.querySelectorAll('.langValue')[i].textContent;
            a++;
        }
        
    }
    
    console.log(resultForm);
});