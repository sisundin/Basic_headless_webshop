import React from "react";
import '../butterclient';
import Butter from 'buttercms';
const butter = Butter('2fa7babaa7064c23b2cb90171957b2add0333e77');
class StoreModel extends React.Component {
  constructor(props) {
    super();
    this.subscribers = [];
    this.state = {
      basket: props.basket
    };
    this.initialbasket = [];
    this.getproducts();
    }

  
  getproducts(){
    let collecteditems = [];
    let pagesToCheck = ["shop","woman"];
    pagesToCheck.map(toCheck => {
     
      this.getPageInformation(toCheck).then(v => {
     
        collecteditems=[...collecteditems, ...v.data.data.fields.subcategory.product_in_subcategory ]
        
          }).catch(e => { this.clearBasket()}).finally(() => {this.initialbasket = collecteditems; })
      })



  }

  addObserver(callback) {
    this.subscribers.push(callback);
  }

  removeObserver(callback) {
    callback = this.subscribers.filter((o) => o !== callback);
  }

  notifyObservers(whatHappened) {
    this.subscribers.forEach(function (callback) {
      callback(whatHappened);
    });
  }

  addToBasket(prod, size="n/a", amount=1){
    let productthatexisted = this.state.basket.filter(produc => deepEqual(produc.prod, prod) && (produc.sizeselected === size));
    let bask = this.state.basket.filter(produc => !(deepEqual(produc.prod, prod) && (produc.sizeselected === size)));
    let productObject = {prod , sizeselected:size, amountorderd:amount }
    if (productthatexisted.length !== 0){
      let combinedamount = amount + productthatexisted[0].amountorderd 
      productObject = {prod , sizeselected:size, amountorderd:combinedamount}
    }
    this.state.basket = [...bask, productObject];
    localStorage.setItem("The_coolest_store", 
        JSON.stringify( {basket:[...this.state.basket]}))
        this.notifyObservers({added:productObject});
  }

  removeFromBasket(prod,size){
    let bask = this.state.basket.filter(produc => !(deepEqual(produc.prod, prod) && (produc.sizeselected === size)));
    this.state.basket = [...bask];
    localStorage.setItem("The_coolest_store", 
        JSON.stringify( {basket:[...this.state.basket]}))
        this.notifyObservers({removed:prod});
  }

  addQuantatieOfProduct(prod, size, change){
    let productthatexisted = this.state.basket.filter(produc => deepEqual(produc.prod, prod) && (produc.sizeselected === size));
    let bask = this.state.basket.filter(produc => !(deepEqual(produc.prod, prod) && (produc.sizeselected === size)));
    let productObject = {prod , sizeselected:size, amountorderd:1 }
    let combinedamount = 1
    if (productthatexisted.length !== 0){
        combinedamount = productthatexisted[0].amountorderd + change;
      if((combinedamount) <= 1 ){
        combinedamount = 1;
      }
      productObject = {prod , sizeselected:size, amountorderd:combinedamount}
    }
    this.state.basket = [...bask, productObject];
    localStorage.setItem("The_coolest_store", 
        JSON.stringify( {basket:[...this.state.basket]}))

        this.notifyObservers({changed:prod});
  }

  getProductQuantatiy(prod, size) {
    debugger;
    let productthatexisted = this.state.basket.filter(produc => deepEqual(produc.prod, prod) && (produc.sizeselected === size));
    console.log(productthatexisted)
    return productthatexisted.length; 
  }
  

   clearBasket(){
    this.state.basket = [];
    localStorage.setItem("The_coolest_store", JSON.stringify({basket:[]}))
  
  }

  getTotalBasketprice(){
    try{
    let basket  = this.getBasket();
    let price = basket.reduce((a, product) => a += (product.prod.product_price * product.amountorderd) ,0)
    
    return Math.round((price + Number.EPSILON) * 100) / 100
    }
    catch{
      return null
    }
  }

  isItemInBasket(prod, size){
    let productthatexisted = this.state.basket.filter(produc => deepEqual(produc.prod, prod) && (produc.sizeselected === size));
    if(productthatexisted.length !== 0){
      return false
    }
    else{return true}
  
  }

  async getPageInformation(link) {
    return await butter.page.retrieve('*', ''+link +'');
 
    }

  getBasket(){
    let apiProducts = [... this.initialbasket];
    let correctProducts = [];
    let basket = [...this.state.basket];
    basket.forEach(productinbasket =>{ 
      correctProducts = [...correctProducts,{sizeselected: productinbasket.sizeselected,amountorderd: productinbasket.amountorderd , prod: apiProducts.find(collecteditem => productinbasket.prod.product_id === collecteditem.product_id)}]; })
     
    return this.sortbasket(correctProducts);
  }

  sortbasket(basket){
    return basket.sort((a,b) => {
      if(a.prod.product_name > b.prod.product_name){
          return +1
        }
      if(a.prod.product_name < b.prod.product_name){
          return -1
        }
      else{
          return 0
        }
      }); 

  }

  getBasketItemNumber(){
    
    return this.state.basket.length;
  }
}

const modelString= localStorage.getItem("The_coolest_store");
let modelObject= JSON.parse(modelString);
modelObject?console.log("User data detected"): modelObject= {basket:[]}
const storeModel = new StoreModel(modelObject);
export default storeModel;

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}
