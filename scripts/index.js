let bagitems;

onload();

function onload(){
 let bagitemstr = localStorage.getItem('bagitems');
  bagitems = bagitemstr ? JSON.parse(bagitemstr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
}



function addToBag(itemId){
 bagitems.push(itemId);
 localStorage.setItem('bagitems' , JSON.stringify(bagitems));
 displayBagIcon();
}

function displayBagIcon(){
  let bagIconCount = document.querySelector('.bag-item-count');

  if(bagitems.length > 0){
    bagIconCount.style.visibility = 'visible';
    bagIconCount.innerText = bagitems.length;

  } else{
    bagIconCount.style.visibility = 'hidden';
  }
}

function displayItemsOnHomePage(){
  let itemsContainerElement = document.querySelector('.items-container');

  if(!itemsContainerElement){
    return
  }
let innerHtml = '';

items.forEach(item => {
  

  innerHtml += `<div class="item-container">
  <img class="item-image" src="${item.image}" alt="item image">

  <div class="rating">
    ${item.rating.stars} ⭐ | ${item.rating.count}
  </div>
  <div class="company-name">${item.company}</div>
  <div class="item-name">${item.item_name}</div>

  <div class="price">
    <span class="current-price">Rs ${item.current_price}</span>
    <span class="orginal-price">Rs ${item.original_price}</span>
    <span class="discount"> (${item.discount_percentage}% OFF) </span>
  </div>

  <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>

</div>`
});

itemsContainerElement.innerHTML = innerHtml;

}





