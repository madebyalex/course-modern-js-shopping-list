const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter-bar');
const clearBtn = document.getElementById('clear');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please type an item');
    return;
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const removeBtn = createCustomElement(
    'button',
    'remove-item btn-link text-red'
  );
  const icon = createCustomElement('i', 'fa-solid fa-xmark');

  removeBtn.appendChild(icon);
  li.appendChild(removeBtn);

  // Adding a new li to the DOM
  itemList.appendChild(li);
  resetState();

  itemInput.value = '';
  itemInput.focus();
}

function createCustomElement(type, classes) {
  const el = document.createElement(type);
  el.classList = classes;
  return el;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    // if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();

    resetState();
    // }
  }
}

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

  console.log(text);
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

resetState();

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

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
