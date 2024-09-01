'use strict';

const kohde = document.querySelector('tbody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', function () {
  modaali.close();
});

const apiURL = 'https://media1.edu.metropolia.fi/restaurant';

async function teeRavintolaLista() {
  // eslint-disable-next-line no-undef
  const restaurants = await fetchData(apiURL + '/api/v1/restaurants');

  // your code here

  console.log(restaurants);
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  console.log(restaurants);

  for (const restaurant of restaurants) {
    if (restaurant) {
      const nimi = document.createElement('td');
      nimi.innerText = restaurant.name;

      const osoite = document.createElement('td');
      osoite.innerText = restaurant.address;

      const rivi = document.createElement('tr');

      rivi.addEventListener('click', function () {
        // hae päivän ruokalista

        // rakenna listan HTML (muista for lause)

        const listaHTML = `<li>Ruokalaji, hinta, allergiat</li>`;

        const korostetut = document.querySelectorAll('.highlight');
        for (const korostettu of korostetut) {
          korostettu.classList.remove('highlight');
        }

        rivi.classList.add('highlight');
        modaali.showModal();
        const ravintolaHTML = `
          <header>
            <h3>${restaurant.name}<h3>
            <p>${restaurant.company}
            </p>
          </header>
          <address>
            ${restaurant.address}<br>
            ${restaurant.postalCode} ${restaurant.city}<br>
            ${restaurant.phone}<br>
          </address>
          <div>
            <h3>Päivän ruokalista</h3>
            <ul>
              ${listaHTML}
            </ul>
          </div>
      `;
        info.innerHTML = '';
        info.insertAdjacentHTML('beforeend', ravintolaHTML);
      });

      rivi.append(nimi, osoite);
      kohde.append(rivi);
    }
  }
}

teeRavintolaLista();
