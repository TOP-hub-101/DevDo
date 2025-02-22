import './reset.css';
import './style.css';
import handler from './modules/handler';

document.getElementById("clearButton").addEventListener("click", function () {
    localStorage.clear();
    alert('Please reload the page!')
});

handler();