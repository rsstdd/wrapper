const toggle = document.getElementById('hummingtree');
const logo = document.querySelector('.hum-logo');
const slider = document.querySelector('.hum-slider');
const caret = document.querySelector('.hum-caret-up');

caret.addEventListener('click', toggleSlider, false);  
  
function toggleSlider() {
  if (slider.classList.contains('hum-opened')) {
    slider.classList.remove('hum-opened');
    slider.classList.add('hum-closed');
    logo.classList.remove('hum-hidden');
    caret.classList.remove('hum-caret-down');
    caret.classList.add('hum-caret-up');
  } else if (slider.classList.contains('hum-closed')) {
    slider.classList.remove('hum-closed');
    logo.classList.add('hum-hidden');
    slider.classList.add('hum-opened');
    caret.classList.remove('hum-caret-up');
    caret.classList.add('hum-caret-down');
  }
}
