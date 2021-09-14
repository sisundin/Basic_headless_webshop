import React from 'react';
import Faq from "./FAQ.js";
import Basket from "./Basket.js";
import Back from "./Back";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {
                          fields: {navbar: [
                              {
                                
                                fields: {
                                  headline: "...",
                                  categories: [
                                    {
                                      category: "Loading... "
                                    }
                                    
                                  ]
                                }
                              }
                            ]
                          }
                  
    },
                  showFAQ: false ,
                  showBasket:false,
                  itemsInBasket:this.props.model.getBasketItemNumber()
                   };
                   
      
   
  }

  setData(resp){
    if (resp.data !== this.state.data){
      this.setState(resp.data);
    }
  }
  
  async componentDidMount () {
    this.props.model.getPageInformation('navbar').then(resp => this.setData(resp))
    this.setState({itemsInBasket: this.props.model.getBasketItemNumber()})
    this.props.model.addObserver(() => this.forceUpdate());
  }

  async componentDidUpdate(){
    if(this.state.itemsInBasket !== this.props.model.getBasketItemNumber())
    this.setState({itemsInBasket: this.props.model.getBasketItemNumber()})
  }
  

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  RenderBack() {
    let location = useLocation();
    if (location.pathname ==="/"){
        return null;
    }
    else{
        return <Back />;
    }
    
}


  toggleFAQ() {
    this.setState({
      showFAQ: !this.state.showFAQ,
    });
  }

  toggleBASKET() {
    this.setState({
      showBasket: !this.state.showBasket,
    });
  }

  jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  renderCatagories(category){
    let catagoryName = category.fields.headline
    let catagoryCatagory = category.fields.categories
    
    return <div className="NavUntilHover"><p><Link to={"/"+this.jsUcfirst(decodeURI(catagoryName))}>{catagoryName}</Link></p>
    <div className="hiddenNavUntilHover">
      <table className="menuTable">
        <tbody>
          {catagoryCatagory.map(cat => {
            return <tr>
              <td>
                <Link  to={"/"+decodeURI(catagoryName)+"/"+decodeURI(cat.category).toLocaleLowerCase().replace(" ","-")}>{cat.category}</Link>
                </td>
              </tr>
            })}
        </tbody>
      </table>
      </div>
      </div>
  
    }

    renderLinks(category){
      let catagoryName = category.fields.headline
    let catagoryCatagory = category.fields.categories
    return <li class="nav-item dropdown">
      <p class="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown" >{catagoryName}</p>
      <div  class="dropdown-menu">
      <Link class="dropdown-item" to={"/"+this.jsUcfirst(decodeURI(catagoryName))}>{catagoryName}</Link>
      {catagoryCatagory.map(cat => <Link class="dropdown-item"  to={"/"+decodeURI(catagoryName)+"/"+decodeURI(cat.category).toLocaleLowerCase().replace(" ","-")}>{cat.category}</Link>   
            )} 
      </div>
    </li>
    }

  render() {
    let navbar = this.state.data.fields.navbar;
    return <div className="header">
      <nav class="navbar navbar-expand-xl  navbar-light">
  <Link class="navbar-brand headerName" to="/"><img style={{"width": "80px", "margin-top": "-10px", "margin-left": "27px"}} width="100%" src="https://freight.cargo.site/w/164/q/94/i/0dad160df3b872d8a573ae721bfbd258d670f1f3a0c06d134accade29a740b2a/SOCKSSS_LOGO_SMALL_V001.png"></img></Link>
  <div style={{"background":"white","border-radius": "10px", "margin-left": "20px", "margin-right": "20px" }} class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
    {navbar.map(categor => {return this.renderLinks(categor)})}  

    </ul>
  </div>  
<p className="BASKETbutton" onClick={this.toggleBASKET.bind(this)}><i className="fas fa-shopping-bag"></i>{" (" + this.state.itemsInBasket +")"}</p>
<button style={{"border-color":"transparent"}} class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
</nav>
        
        <this.RenderBack/>
        <div className="FAQ" >{this.state.showBasket ? <Basket model={this.props.model} closeBASKET={this.toggleBASKET.bind(this)} /> : null}</div>
    </div>
    
    
   
  }

  oldnavbar(){
    let navbar = this.state.data.fields.navbar;
    return <div className="header">
      
    <p className="BASKETbutton" onClick={this.toggleBASKET.bind(this)}><i className="fas fa-shopping-bag"></i>{" (" + this.state.itemsInBasket +")"}</p>
    <Link to="/" style={{color: 'black', "textDecoration":"none" }} >
    <p className = "headerName">Projekt Grön</p>
    </Link>
    <div className="navibar"> 
      {navbar.map(categor => {return this.renderCatagories(categor)})}
    </div>
    <this.RenderBack/>
    <div className="FAQ" >{this.state.showBasket ? <Basket model={this.props.model} closeBASKET={this.toggleBASKET.bind(this)} /> : null}</div>
</div>
  }

  

}

