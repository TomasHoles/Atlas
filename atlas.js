document.addEventListener('DOMContentLoaded', () => {
    const staty = document.getElementById('staty');
    const selectRegion = document.querySelector('select[name="region"]');
    const searchInput = document.getElementById('searchInput');

    const defaultRegion = "Europe";
    let countriesData = []; // uchování dat všech zemí

    fetchCountryData(defaultRegion);

    selectRegion.addEventListener('change', () => {
        const selectedRegion = selectRegion.value;
        fetchCountryData(selectedRegion);
    });

    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => country.translations.ces.common.toLowerCase().includes(searchQuery));
        displayCountries(filteredCountries);
    });

    function fetchCountryData(region) {
        fetch(`https://restcountries.com/v3.1/region/${region}`)
            .then((response) => response.json())
            .then((data) => {
                countriesData = data; // uložení dat všech zemí pro pozdější použití
                displayCountries(data);
            })
            .catch((error) => {
                console.error('Chyba při načítání dat:', error);
            });
    }

    function displayCountries(countries) {
        staty.innerHTML = ""; // Vyčistit obsah před načtením nových dat

        countries.forEach(stat => {
            let blockCountry =
            `<div class="col-xl-2 col-lg-4 col-md-6 col-sm-8 lol">
                <div class="card">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#countryModal${stat.cca3}">
                        <img src="${stat.flags.png}" alt="${stat.name.official}" class="card-img-top">
                    </a>
                    <div class="card-body">
                        <h4 class="card-title">${stat.translations.ces.common}</h4>
                        <p class="card-text">Počet obyvatel: ${stat.population}
                            <br>Rozloha: ${stat.area} km<sup>2</sup>
                        </p>
                    </div>
                </div>
            </div>`;
            staty.innerHTML += blockCountry;

            createDescripton(stat);
        });
    }

    function createDescripton(stat) {
        const modal = `
            <div class="modal fade " id="countryModal${stat.cca3}" tabindex="-1" aria-labelledby="countryModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg ">
                    <div class="modal-content ">
                        <div class="modal-header ">
                            <h5 class="modal-title" id="countryModalLabel">${stat.translations.ces.common}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body font">
                        <div>
                        <img src="${stat.flags.png}" alt="${stat.name.official}" class="card-lol">
                        <img src="${stat.coatOfArms.png}" alt="coatOfArms" class="card-img-coat">
                        <div>
                        <br><br>
                            <p>Počet obyvatel: ${stat.population}</p>
                            <p>Rozloha: ${stat.area} km<sup>2</sup></p>
                            <p>Hlavní město: ${stat.capital}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modal);
    }
});

    

