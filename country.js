const countryName = new URLSearchParams(location.search).get('name');
// console.log(countryName);

let image = document.querySelector(".imageDiv img");
let country_Name = document.querySelector(".country-name");
let nativeName = document.querySelector(".native-name");
let population = document.querySelector(".population");
let region = document.querySelector(".region");
let subRegion = document.querySelector(".subRegion");
let capital = document.querySelector(".capital");
let topLevelDomain = document.querySelector(".tlp");
let currency = document.querySelector(".currency");
let languages = document.querySelector(".languages");
let borderCountries = document.querySelector(".border-countries");
const darkMode = document.querySelector(".darkMode");

darkMode.addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector("body").classList.toggle("dark");
})

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then(([data])=>{
    // console.log(data);
    image.src = `${data.flags.svg}`
    country_Name.innerHTML = `${data.name.common}`;
    nativeName.innerHTML = `${Object.values(data.name.nativeName).map((value)=>value.official).join(', ')}`
    population.innerHTML = `${data.population.toLocaleString("en-IN")}`;
    region.innerHTML = `${data.region}`;
    subRegion.innerHTML = `${data.subregion}`;
    capital.innerHTML = `${data.capital}`;
    topLevelDomain.innerHTML = `${data.tld.join(', ')}`;
    currency.innerHTML = `${Object.values(data.currencies).map((value)=>value.name).join(', ')}`;
    languages.innerHTML = `${Object.values(data.languages).join(', ')}`
    // console.log(Object.values(data.languages).join(', '));
    data.borders.forEach((value)=>{
        // console.log(value);
        fetch(`https://restcountries.com/v3.1/alpha/${value}`)
        .then((res)=>res.json())
        .then(([data])=>{
            // console.log(data);
            let anchor = document.createElement("a");
            anchor.innerText = `${data.name.common}`
            anchor.href = `country.html?name=${data.name.common}`;
            borderCountries.appendChild(anchor);
        })
    })
})
