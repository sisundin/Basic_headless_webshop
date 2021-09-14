import React from 'react';
import { Link } from "react-router-dom";


export default class Basket extends React.Component {

  constructor(props){
    super();
    this.state = {
      basket:[]
    }
    this.props = props;
    
   
  }

  componentDidMount() {
    this.getBasket();
  }

  componentWillUnmount() {
  }

  getBasket(){
    let bas =  this.props.model.getBasket();
  
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
          <td> </td>
          <td>Quantity</td>
          <td>Size</td>
          <td>Product Name</td>
          <td>Price</td>
        </tr>
        {basket.map(basketItem => <tr>
          <td  ><img style={{width: "56px"}} width="5%" src={basketItem.prod.product_picture}></img></td>
          <td>
            <i className="fas fa-minus" onClick={()=>{
            let prod = basketItem.prod;
            let size = basketItem.sizeselected;
            this.productQuantatieChanger(prod, size, "-");
          }}></i><span style={{"padding": "10px"}}>
          {basketItem.amountorderd }</span>
         <i className="fas fa-plus" onClick={()=>{
            let prod = basketItem.prod;
            let size = basketItem.sizeselected;
            this.productQuantatieChanger(prod, size, "+");
          }}></i></td>
          <td>{basketItem.sizeselected}</td>
          <td>{basketItem.prod.product_name}</td>
          <td>€{basketItem.prod.product_price}</td>
          <td><i className="fas fa-times" onClick={()=>{
            let prod = basketItem.prod;
            let size = basketItem.sizeselected;
            this.productRemover(prod, size)}}></i></td>
        </tr>)}
        </table>
    }
  }

  productQuantatieChanger(prod, size, change="+"){
    if(change==="+"){
      this.props.model.addQuantatieOfProduct(prod, size, 1);
      this.getBasket();
    }
    else{
      this.props.model.addQuantatieOfProduct(prod, size, (-1));
      this.getBasket();
    }

  }
  productRemover(prod, size){
    this.props.model.removeFromBasket(prod, size);
    this.getBasket();
  }

  getBasketprice(){
    return this.props.model.getTotalBasketprice()
  }

  clearer(){
    this.props.model.clearBasket(); 
    this.getBasket();
    

  }
  
    render() {
      let basket = this.state.basket;

      return (
        <div className='popup' >
          <div className='popup_inner'>
          <div className="divider"></div>
          <div className="divider"></div>
            <p className="headerBasket">BASKET</p>
            <div className="divider"></div>
            <button type="button" class="btn btn-outline-warning" onClick={() => this.clearer()}>CLEAR BASKET</button>
            <div className="divider"></div>
            {this.basketRender(basket)}
            <div className="divider"></div>
            <p>Grand Total</p>
            <p>€{this.getBasketprice()}</p>
            <div className="divider"></div>
            <Link onClick={this.props.closeBASKET} to={"/checkout"}> GO TO CHECKOUT</Link>
            <div className="divider"></div>
            <div className="divider"></div>
          <i className = "closeEx fas fa-times" onClick={this.props.closeBASKET}></i>
          </div>
        </div>
        
      );
    }
  }