import React from 'react';
import { Link } from "react-router-dom";


export default class BasketDetails extends React.Component {

  constructor(props){
    super();
    this.state = {basket:[]}
    this.props = props;
    
   
  }

  componentDidMount() {
    this.getBasket();
  }

  componentWillUnmount() {
  }

  getBasket(){
    let bas =  [...this.props.model.getBasket()];
  
    if(JSON.stringify(this.state.basket) !== JSON.stringify(bas)){
  
      this.setState({
        basket:bas
      });

    }
    
   
  }

  basketRender(basket){
    if (basket.length === 0){
      return <table className="basketTable"><tr><tr>BASKET I EMPTY</tr></tr></table>
    }
    
    else{
      return <table className="basketTable">
        <tr>
          <td></td>
          <td>Quantity</td>
          <td>Size</td>
          <td>Product Name</td>
          <td>Price</td>
        </tr>
        {basket.map(basketItem =>{ 
          console.log(basketItem);
          if(basketItem.prod === undefined){return <h1 style={{"text-align":"center"}}>basket is EMPTY OR something is wrong. Go to homepage and try agian</h1>} 
          else{return<tr>
          <td  ><img style={{width: "56px"}} alt="null" width="5%" src={basketItem.prod.product_picture}></img></td>
          <td>{basketItem.amountorderd}</td>
          <td>{basketItem.sizeselected}</td>
          <td>{basketItem.prod.product_name}</td>
          <td>€{basketItem.prod.product_price}</td>
        </tr>}})}
        </table>
    }
  }


  getBasketprice(){
    return this.props.model.getTotalBasketprice()
  }

  
  
    render() {
      let basket = this.state.basket;

      return (
        <div>
            <div className="divider"></div>
            {this.basketRender(basket)}
            <div className="divider"></div>
            <p>Grand Total</p>
            <p>€{this.getBasketprice()}</p>
            <div className="divider"></div>
          </div>
        
        
      );
    }
  }