let countriesContainer = document.querySelector(".countries-container");
let allCountriesData = " ";

let showCountryData = (data) => {
    // console.log(data);
    allCountriesData = data;
    countriesContainer.innerHTML = " ";
    data.forEach((element) => {
        // console.log(element);
        const cardContainer = document.createElement("a");
        cardContainer.classList.add("card-container");
        cardContainer.href = `country.html?name=${element.name.common}`;
        cardContainer.innerHTML = `<img src="${element.flags.svg}" alt="flag">
        <div class="details">
            <h2 class="country-name">${element.name.common}</h2>
            <p><b>Population: </b>${element.population.toLocaleString("en-IN")}</p>
            <p><b>Region: </b>${element.region}</p>
            <p><b>Capital: </b>${element.capital}</p>
        </div>`;
        countriesContainer.append(cardContainer);
})
}

fetch("https://restcountries.com/v3.1/all")
.then((res) => res.json())
.then((data)=> showCountryData(data));

let options = document.querySelector(".options");
options.addEventListener("change",function(e){
    console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${options.value}`)
    .then((res)=>res.json())
    .then((data)=> showCountryData(data));
})


document.querySelector(".input input").addEventListener("input",function(e){
    console.log(e.target.value);
    console.log(allCountriesData);
    let filteredCountries = allCountriesData.filter((country)=>{
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    })
    console.log(filteredCountries);
    showCountryData(filteredCountries);
})