import './styles/main.scss';

const outputDiv = document.querySelector('#output');
const landingContent = document.querySelector('#landing-html');

// Set our initial on page load to our landing content
outputDiv.innerHTML = landingContent.innerHTML;
