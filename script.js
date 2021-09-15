'use strict';

// Рефы на 5 кнопок + на инпут + на ДИВ под список
// на классе слушаем ИНПУТ
// создать начальное состояние под список
// сделать рендер для разметки списка
//

class ListProcessor {
  pairsList = [];

  constructor() {
    this.pairsList = [
      'batman=hero',
      'alex=bad',
      'spider=man',
      'cent=dollar',
      'euro=money',
      'asc=blabla',
    ];
  }

  addRecord(newRecord) {
    this.pairsList.push(newRecord);
  }

  print() {
    console.log('OMG - ', this.pairsList);
  }
}

let pairsList = [];
let hasError = false;
let dsada = [];
const formSubmit = document.querySelector('.signup_form_add');
const inputChange = document.querySelector('.formInput');
const listMarkUp = document.querySelector('.listMarkUp');
const sortByNameBtn = document.querySelector('.button-sort-by-name');
const sortByValueBtn = document.querySelector('.button-sort-by-value');
const deleteBtn = document.querySelector('.button-delete');
const selectedItems = listMarkUp.childNodes;

function onListItemClick(e) {
  console.log(e.target);
  const curentItem = e.target;
  curentItem.classList.toggle('selected');
}

function onDeleteBtnClick() {
  // const filteredItems = selectedItems.filter(item => !item.selected);
  let filteredItems = [];
  console.log(selectedItems);
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

function onSubmit(event) {
  event.preventDefault();
  const inputValue = inputChange.value;
  pairsList.push(inputValue);

  makeMarkUp(pairsList);
}

function makeMarkUp(arr) {
  const markUp = arr.map(pair => `<li>${pair}</li>`).join('');
  listMarkUp.innerHTML = markUp;
}

formSubmit.addEventListener('submit', onSubmit);
sortByNameBtn.addEventListener('click', onSortByNameBtnClick);
sortByValueBtn.addEventListener('click', onSortByValueBtnClick);
listMarkUp.addEventListener('click', onListItemClick);
deleteBtn.addEventListener('click', onDeleteBtnClick);
