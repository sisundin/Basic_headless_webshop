import React, { Component } from "react";
import about from './images/simonAboutImage.png';
import Butter from 'buttercms';
import { Link } from 'react-router-dom'
import '../butterclient';
import { Helmet } from "react-helmet";

const butter = Butter('2fa7babaa7064c23b2cb90171957b2add0333e77');



export default class ProductView extends React.Component {
  
  state = {
    data: {
      fields: {
        products: []
      }
    }
  }

  async componentDidMount () {
    const resp = await butter.page.retrieve('*', 'men')
    
    this.setState(resp.data)
  }

  renderProducts (product) {
    console.log(product)
    let productname = product.product_name
    let image = product.product_pic
    const element = <img src={image} style={{"width": "80%"}}  />;
    return <div class="column">
      <div class="row">
      <Link to={"/"+"men/shoe/"+productname}> {element} </Link>
      </div>
    </div>
    }

  render() {
    console.log("I RENDERED IN PRODUCS")
    const { fields } = this.state.data
    
    let products = fields.products;
    console.log(products);
    return (
      
     <div className="pageWrapper">        
        <div className="pageTopDivider"></div>
        <p></p>    
          {products.map(product => {return this.renderProducts(product)})}
        <div className="divider"></div>
        <div className="divider"></div>
        </div>


    );
  }
}