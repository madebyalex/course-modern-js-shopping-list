const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter-bar');
const clearBtn = document.getElementById('clear');
let isEditMode = false;
const overlay = document.getElementById('overlay');
const editBtnSave = document.getElementById('edit-btn-save');
const editBtnCancel = document.getElementById('edit-btn-cancel');
const editTextField = document.getElementById('edit-textfield');

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDOM(item));
  resetState();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate the input
  if (newItem === '') {
    alert('Please type an item');
    return;
  }

  if (checkDuplicates(newItem)) {
    alert('The item "' + newItem + '" is already added.');
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
  li.appendChild(document.createTextNode(item.trim()));

  const removeBtn = createCustomElement('button', 'remove-item btn-link');
  const icon = createCustomElement('i', 'fa-regular fa-trash-alt');

  removeBtn.appendChild(icon);
  li.appendChild(removeBtn);

  // Adding a new li to the DOM
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item.trim());

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

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItemFromDOM(e.target.parentElement.parentElement);
  } else if (e.target.tagName == 'LI') {
    // console.log('Edit mode');
    setItemToEdit(e.target);
  }
}

function checkDuplicates(item) {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;
  document.body.classList.add('edit-mode');
  item.classList.add('active');
  editTextField.focus();
  editTextField.value = item.textContent;
}

function saveEditMode(e) {
  e.preventDefault();
  // Check for Edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.active');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('active');
    itemToEdit.remove();

    addItemToDOM(editTextField.value);
    addItemToStorage(editTextField.value);
    resetState();
    getItemsFromStorage();

    exitEditMode(e);
  }
}

function exitEditMode(e) {
  e.preventDefault();

  isEditMode = false;
  document.body.classList.remove('edit-mode');
  itemList.querySelectorAll('li').forEach((item) => {
    item.classList.remove('active');
  });

  editTextField.blur();
  // itemInput.focus();
}

function removeItemFromDOM(item) {
  // Remove item from DOM
  item.remove();

  // Remove item from storage
  removeItemFromStorage(item.textContent);

  resetState();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out the item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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

    localStorage.removeItem('items');

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
  document.addEventListener('DOMContentLoaded', displayItems);
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  overlay.addEventListener('click', exitEditMode);
  editBtnSave.addEventListener('click', saveEditMode);
  editBtnCancel.addEventListener('click', exitEditMode);

  resetState();
}

init();
