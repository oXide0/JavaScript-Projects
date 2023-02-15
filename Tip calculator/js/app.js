const tipPercent = document.querySelector('#tip_number');
const PercentValue = document.querySelector('.tip_percent');
const tipAmount = document.querySelector('.number_amount');
const totalBill = document.querySelector('.number_bill');
const price = document.querySelector('#price-input');

tipPercent.addEventListener('input', () => {
    PercentValue.textContent = tipPercent.value + '%';
    if(price.value != '') {
        tipAmount.textContent = (price.value * tipPercent.value / 100).toFixed(2);
        let num = (price.value * tipPercent.value / 100) + 100;
        totalBill.textContent = num.toFixed(2);
    }
});
