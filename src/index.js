import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 600;
const inputEl = document.querySelector("#search-box")
const countryListEl = document.querySelector(".country-list")
const divEl = document.querySelector(".country-info")
inputEl.addEventListener("input",debounce(searchCuntries,DEBOUNCE_DELAY))




function searchCuntries(e) {
e.preventDefault();  
const Cuntry = e.target.value.trim()
if (!Cuntry) {
divEl.innerHTML = ""
countryListEl.innerHTML = ""   
}
else{fetchCountries(Cuntry)
    .then(renderCuntryCard)
    .catch(error=> Notiflix.Notify.failure("Oops, there is no country with that name"))
}}

 
function renderCuntryCard(data) {
    if (data.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }else if(data.length >= 2){   
    divEl.innerHTML = ""
    countryListEl.innerHTML = ""
    const markup  = cuntryCards(data)
    countryListEl.innerHTML = markup.join("")
    } else {
    divEl.innerHTML = ""
    countryListEl.innerHTML = ""
    const markup = cuntryOneCard(data)
    divEl.innerHTML = markup.join("")
     } 
   
}

function cuntryCards(data) {
    return data.map(({name,flags}) =>
    `<li class = item>  <Img class = img src ="${flags.svg}" alt = flag cuntry><span>${name.official}</span></li>`)
}

function cuntryOneCard(data) {  
return data.map(({name,flags,languages,population,capital}) =>{
const listlanguages = Object.values(languages)
return`<Img class = img src ="${flags.svg}" alt = flag ${name.official}>      
<span class=title>${name.official}</span>
<p class=text>Capital: ${capital}</p>
<p class=text>Population: ${population}</p>
<p class=text>Languages: ${listlanguages}</p>
`});
}
