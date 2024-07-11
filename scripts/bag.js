
let bagItemObjects;
onload();

function onload(){
  loadbagitems();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary');

  let totalitems = bagItemObjects.length;
  let totalMRP = 0;
  let totaldiscount = 0;
  

  bagItemObjects.forEach(bagitem => {
    totalMRP += bagitem.original_price;
    totaldiscount += bagitem.original_price - bagitem.current_price;

  })
  let finalpayment = totalMRP - totaldiscount + 99;
  bagSummaryElement.innerHTML = `
  <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalitems} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${totaldiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${finalpayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`
}

function loadbagitems(){

  bagItemObjects = bagitems.map(itemId => {
  for(let i = 0 ; i<items.length ; i++){
    if(itemId == items[i].id){
      return items[i];
    }
  }
 });
 console.log(bagItemObjects);
}


function displayBagItems(){
  let containerElement = document.querySelector('.bag-items-container')
  let innerHTML= '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeformbag(itemId){
 bagitems =  bagitems.filter(bagitemId => bagitemId != itemId);
 localStorage.setItem('bagitems' , JSON.stringify(bagitems));
 loadbagitems();
 displayBagIcon();
 displayBagItems();
 displayBagSummary();

}

function generateItemHTML(item){
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">₹${item.current_price}</span>
                <span class="original-price">₹${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date} Oct 2023</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick= "removeformbag(${item.id})">X</div>
          </div>
`
}