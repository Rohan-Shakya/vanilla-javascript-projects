// Importing datas from data.js
import { menu } from './data.js';

const sectionCenter = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');

// load items
window.addEventListener('DOMContentLoaded', () => {
  displayMenuItem(menu);
  displayMenuButtons();
});

function displayMenuItem(menuItem) {
  let displayMenu = menuItem.map((item) => {
    return `
          <article class="menu-item">
          <img src= ${item.img} alt=${item.category} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">${item.price}</h4>
            </header>
            <p class="item-text">
             ${item.desc}
            </p>
          </div>
        </article>
          `;
  });
  displayMenu = displayMenu.join('');

  sectionCenter.innerHTML = displayMenu;
}

function displayMenuButtons() {
  const catagories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ['all']
  );

  const catagoryBtns = catagories
    .map((catagory) => {
      return `
                <button class="filter-btn" type="button" data-id=${catagory}>
                ${catagory}
                </button>
                `;
    })
    .join('');
  btnContainer.innerHTML = catagoryBtns;
  const filterBtns = document.querySelectorAll('.filter-btn');

  // filter item
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const catagory = e.target.dataset.id;
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category == catagory) {
          return menuItem;
        }
      });
      if (catagory === 'all') {
        displayMenuItem(menu);
      } else {
        displayMenuItem(menuCategory);
      }
    });
  });
}
