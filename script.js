const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter-bar');
const clearBtn = document.getElementById('clear');

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDOM(item));
  resetState();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please type an item');
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);
  resetState();
  getItemsFromStorage();

  itemInput.value = '';
  itemInput.focus();
}

function createCustomElement(type, classes) {
  const el = document.createElement(type);
  el.classList = classes;
  return el;
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const removeBtn = createCustomElement(
    'button',
    'remove-item btn-link text-red'
  );
  const icon = createCustomElement('i', 'fa-solid fa-xmark');

  removeBtn.appendChild(icon);
  li.appendChild(removeBtn);

  // Adding a new li to the DOM
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') == null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  console.log(itemsFromStorage);
  return itemsFromStorage;
}

function removeItemFromDOM(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    // if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();

    resetState();
    // }
  }
}

// function removeItemFromStorage(item) {
//   const itemsFromStorage = getItemsFromStorage();

//   itemsFromStorage.forEach(itemInStorage => {
//     if (itemInStorage.indexOf(item) != -1) {

//     }
//   })
// }

function clearItems() {
  const items = itemList.querySelectorAll('li');

  if (
    confirm(
      `Do you really want to delete ${items.length} item${
        items.length > 1 ? 's' : ''
      }?`
    )
  ) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    resetState();
  }
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item, index) => {
    const itemTitle = item.firstChild.textContent.toLowerCase();

    if (itemTitle.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function resetState() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }

  itemFilter.querySelector('.form-input-filter').value = '';
}

// Initialize the app

function init() {
  // Event Listeners
  document.addEventListener('DOMContentLoaded', displayItems);
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', removeItemFromDOM);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);

  resetState();
}

init();

/* Just Testing Events */
// const logo = document.querySelector('header img');
// const headline = document.querySelector('h1');
// const headlineDefault = headline.innerText;

// const onDragLogo = (e) => {
//   headline.textContent = `X ${e.clientX} Y ${e.clientY}`;
// };

// const onDragLogoEnd = (e) => {
//   headline.textContent = headlineDefault;
// };

// logo.addEventListener('drag', onDragLogo);
// logo.addEventListener('dragend', onDragLogoEnd);
