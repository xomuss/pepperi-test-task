'use strict';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const listMarkUp = document.querySelector('.pair-list');
const sortByNameBtn = document.querySelector('.button-sort-by-name');
const sortByValueBtn = document.querySelector('.button-sort-by-value');
const deleteBtn = document.querySelector('.button-delete');
const showXMLBtn = document.querySelector('.button-show-xml');
const selectedItems = listMarkUp.childNodes;

let pairsList = [];
let hasError = false;

function onListItemClick(e) {
  console.log(e.target);
  const curentItem = e.target;
  curentItem.classList.toggle('selected');
}

function onDeleteBtnClick() {
  let filteredItems = [];
  for (let i = 0; i < selectedItems.length; i++) {
    if (!selectedItems[i].classList.contains('selected')) {
      filteredItems.push(selectedItems[i].innerHTML);
    }
  }
  makeMarkUp(filteredItems);
  pairsList = [...filteredItems];
}

function sortByParam(array, param) {
  let objs = [];
  let result = [];

  for (let i = 0; i < array.length; i++) {
    objs.push({
      elem: array[i].split('=')[param],
      index: i,
    });
  }

  objs.sort((a, b) => {
    if (a.elem < b.elem) return -1;
    else return 1;
  });

  for (let i = 0; i < objs.length; i++) {
    let sortedElem = objs[i];
    result.push(array[sortedElem.index]);
  }

  return result;
}

function onSortByNameBtnClick() {
  const sortedArray = sortByParam(pairsList, 0);
  makeMarkUp(sortedArray);
}

function onSortByValueBtnClick() {
  const sortedArray = sortByParam(pairsList, 1);
  makeMarkUp(sortedArray);
}

function isValid(string) {
  return string.match(/^\w+\s*=\s*\w+$/i) !== null;
}

function onSubmit(event) {
  event.preventDefault();
  const inputValue = input.value;

  if (!isValid(inputValue)) {
    alert('please write pair like name=value');
    return;
  }

  pairsList.push(inputValue);
  makeMarkUp(pairsList);
}

function makeMarkUp(arr) {
  const markUp = arr.map(pair => `<li>${pair}</li>`).join('');
  listMarkUp.innerHTML = markUp;
}

const onShowXMLBtnClick = function () {
  let xml = '<root>';
  pairsList.forEach(pair => {
    const arr = pair.split('=');
    xml += `<item><name>${arr[0]}</name><value>${arr[1]}</value></item>`;
  });
  xml += '</root>';
  alert(xml);
};

form.addEventListener('submit', onSubmit);
sortByNameBtn.addEventListener('click', onSortByNameBtnClick);
sortByValueBtn.addEventListener('click', onSortByValueBtnClick);
listMarkUp.addEventListener('click', onListItemClick);
deleteBtn.addEventListener('click', onDeleteBtnClick);
showXMLBtn.addEventListener('click', onShowXMLBtnClick);
