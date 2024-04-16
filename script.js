const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please type an item');
    return;
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  itemList.appendChild(li);
  itemInput.value = '';
  itemInput.focus();
}

itemForm.addEventListener('submit', addItem);

/* Just Testing Events */
const logo = document.querySelector('header img');
const headline = document.querySelector('h1');
const headlineDefault = headline.innerText;

const onDragLogo = (e) => {
  headline.textContent = `X ${e.clientX} Y ${e.clientY}`;
};

const onDragLogoEnd = (e) => {
  headline.textContent = headlineDefault;
};

logo.addEventListener('drag', onDragLogo);
logo.addEventListener('dragend', onDragLogoEnd);
