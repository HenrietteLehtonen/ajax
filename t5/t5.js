'use strict';

const kohde = document.querySelector('tbody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', function () {
  modaali.close();
});

const apiURL = 'https://media1.edu.metropolia.fi/restaurant';

// funkkis tekemää ravintolalista ! muista kutsua!

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

      rivi.addEventListener('click', async () => {
        // hae päivän ruokalista
        const menu = await fetchData(
          apiURL + `/api/v1/restaurants/daily/${restaurant._id}/fi`
        );
        console.log('Menu nouto: ', menu);

        // rakenna listan HTML (muista for lause)
        // iteroidaan menun sisällä oleva courses, ei pelkkää ruokalistaa
        // esitellään listaHTML, jotta näktyy myös for lohkon ulkopuolelle
        let listaHTML = '';
        for (const course of menu.courses) {
          //  listaHTML = `<li>${course.name}, hinta, allergiat</li>`
          listaHTML += `
          <li>
            <h4>${course.name}</h4>
            <p>Hinta: ${course.price || 'ei ilmoitettu'} €</p>
            <p>Allergeenit: ${course.diets || 'ei ilmoitettu'}</p>
          </li>`;
        }
        // rakenna listan HTML (muista for lause)

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
