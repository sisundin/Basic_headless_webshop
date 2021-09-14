import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class LinkHandlerSubcategorysOrProducts extends Component {
    constructor(props) {
        super(props);
        this.sitelinks = ["Men", "Woman", "About", "SALE"]
        this.props = props;
        this.state = { data:{
        slug: "home",
        name: "Home",
        page_type: null,
        fields: {
          sitetype: "loading",
          aboutsegment:[{
            aboutsegment: "<div><h>Loading...</h> <p>Hang in there!</p></div>",
            aboutsegmentname: "",
            sitetype: ""
          },],
          aboutpage: "<h>Loading...</h>\n<img src=\" \"/>\n<p>Hang in there!</p>\n"
            
          
        }}, 
        sitePosition : decodeURI(window.location.href.replace("http://localhost:3000/", "")).split("/")
                      };
        this.getPageInformation(this.state.sitePosition);
        
      }
      
    getPageLink(){
        
        let ProcessedCurrentPageLocation = decodeURI(window.location.href.replace("http://localhost:3000/", "")).split("/");
        if (ProcessedCurrentPageLocation[0] !== this.state.sitePosition[0] || ProcessedCurrentPageLocation[1] !== this.state.sitePosition[1]|| ProcessedCurrentPageLocation[2] !== this.state.sitePosition[2]) {
            this.setState({sitePosition:ProcessedCurrentPageLocation}); 
            this.getPageInformation(this.state.sitePosition);
            }
        
       
      }

      setError(err){
        
        
        let pagenotFond = {data:{
          slug: "home",
          name: "Home",
          page_type: null,
          fields: {
            sitetype: "html-page",
            aboutpage: '<div className="pageWrapper"><div className="pageTopDivider"></div><div className="text-center"><h className="headerPageText" >' + "Something went wrong"+ " " +"Try to reconnect and Go back to the homepage" + '</h><a href="/"><h1>Click here to go to homepage</h1></a></div></div>' 
          }}}

          return pagenotFond

      }

      setData(resp){
        if (resp.data !== this.state.data){
          this.setState(resp.data);
        }

      }
  

  async getPageInformation(link) {
    if(link === "home" || link === "Home"){
      link ="ERROR"
    }
     link = link[0].toLowerCase();
    await this.props.model.getPageInformation(link).then(resp => this.setData(resp)).catch(err=>this.setState(this.setError({error:err})));
 
    }

    CreatePageHTML(pagedata){
        
      //let data = this.state.data;
     if (pagedata === undefined || pagedata[0] === undefined){
        let containor = (<div className="pageWrapper"><div className="pageTopDivider"></div><div className="text-center"><h className="headerPageText" >404 Page not found</h><a href="/"><h1>Click here to go to homepage</h1></a></div></div>);
         return(containor)
     }
     else{
        let pagecontent = pagedata[0].aboutsegment
        let containor = <div className="shopWraper"><div dangerouslySetInnerHTML={{ __html: pagecontent}} /></div>
      
      
      return (containor)
     }
       
    }

    sizerender(size){
      let si = size.sizes;
     
      if(JSON.stringify(si) === '[""]'){
        return <div class="form-group">
        <label for="sel1">Select size: </label>
        <select class="form-control" name="sizes" id="sizes">
          <option value="n/a">n/a</option>)
        </select></div>
      }
      else{

        
        
        let sizeelement = <div class="form-group">
        <label for="sel1">Select size: </label>
        <select class="form-control" name="sizes" id="sizes">
        {si.map((size) => {return <option value={size}>{size}</option>})}
        </select>
      </div>
        return sizeelement

      }

    }

 

    CreatePagePRODUCT(product){
      let productname = product.product_name;
      let image = product.product_picture;
      let productDescription = product.product_description;
      let productPrice = product.display_price;
      let size = product.sizes.split(",");
      let subcatagoryname = product.subcategoryname
      let imagesToProduct = [product.body_product_pictures1, product.body_product_pictures2,product.body_product_pictures3,product.body_product_pictures4,product.body_product_pictures5].filter(img => img !== "")

      let prod = <div class="row" style={{"marginRight": "0px", "marginLeft":"0px"}}>
      <div class="col-lg-6" style={{"paddingRight": "0px", "paddingLeft":"0px"}}>
          <div id="myCarousel" class="carousel slide" data-ride="carousel">
                
            <ul class="carousel-indicators">
              {imagesToProduct.map((img, index ) => {
                if( index === 0){
                  return <li data-target="#myCarousel" data-slide-to={index} class="active"></li>
                }
                else{
                  return <li data-target="#myCarousel" data-slide-to={index}></li>
                }
              })}
            </ul>
                
          <div class="carousel-inner">
          {imagesToProduct.map((img, index )=> {
              
                if( index === 0){
                  return <div class="carousel-item active"> <img width="100%" src={img} ></img></div>
                }
                else{
                  return <div class="carousel-item"><img width="100%" src={img} ></img></div>
                }
              })}
            
          </div>
          
          <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </a>
          <a class="carousel-control-next" href="#myCarousel" data-slide="next">
            <span class="carousel-control-next-icon"></span>
          </a>
            
        </div>
        </div>
        <div class="col-lg-3" style={{"paddingRight": "0px", "paddingLeft":"0px"}}>
          <div className="divider"></div>
          <p className="te">
          <p>{subcatagoryname.replace("-", " ").toUpperCase()}</p>
          <p className="productNameInShop">{productname}</p>
          <p>Price: €{productPrice}</p>
          
          <this.sizerender sizes={size}/>
          
          
          <button id="addToBasketButton" type="button" class="btn btn-outline-success" onClick={() => {
            var e = document.getElementById("sizes");
            var selectedSize = e.options[e.selectedIndex].value;
            this.props.model.addToBasket(product, selectedSize);
            }}> ADD TO BASKET </button>
            </p>
            <div className="divider"></div>
            <div dangerouslySetInnerHTML={{ __html: productDescription}} />
          
          
        </div>
        <div class="col-lg-3" style={{"paddingRight": "0px", "paddingLeft":"0px"}}>
          <div className="divider"></div>
          <p className="te">
          <Link to="/About/Product"><p><i class="fas fa-caret-right"></i> Info & Size Chart</p></Link>
          <hr></hr>
          <Link to="/About/Shipping"><p><i class="fas fa-caret-right"></i> Shipping & Returns</p></Link>
          <hr></hr>
          <p><i class="fas fa-caret-right"></i> €4.99 Standard International Shipping on all orders.</p>
          </p>
        </div>

      </div>


      return  <div>
        {prod}
        <div className="divider"></div>
        
          {this.state.data.fields.subcategory.product_in_subcategory.filter(product => product.subcategoryname.toLowerCase() === this.state.sitePosition[1].toLowerCase()).map(product => this.CreatePageSHOP(product))}
        
        </div>

    }

    CreatePageSHOP(product){
        let productname = product.product_name
        let image = product.product_picture
        let subcatagoryname = product.subcategoryname
        let pruductPrice = product.display_price;
        let productinfo = (<div><p>{productname}</p><p>€{pruductPrice}</p></div>)
        let productcard = <div class="container"><img src={image} style={{"width": "100%"}}  /><div class="overlay">
        <div class="text">{productinfo}</div></div> </div>;
        return <div className="column">
          <div className="row">
          <Link to={"/"+this.state.sitePosition[0]+"/"+this.state.sitePosition[1]+"/"+productname}> {productcard} </Link>
          </div>
        </div>
        }

    getPageToCreate(pagedata){
      if(pagedata.fields.sitetype === "html-page"){
        
        return this.CreatePageHTML(this.state.data.fields.aboutsegment)
      }
      if(pagedata.fields.sitetype === "shop-page"){
         let shoppage = this.state.data.fields.subcategory.product_in_subcategory.filter(product => product.subcategoryname.toLowerCase() === this.state.sitePosition[1].toLowerCase() && product.product_name.toLowerCase() === this.state.sitePosition[2].toLowerCase()).map(product => this.CreatePagePRODUCT(product))
            if (shoppage.length === 0){
                shoppage = <p>No product found with this name</p>
            }
        return shoppage
      }

      else{
          return <div className="shopWraper"><div dangerouslySetInnerHTML={{ __html:this.state.data.fields.aboutpage}}/></div>
      }
    }
      

  render() {
    this.getPageLink();
    return (
      
      <div className="pageWrapper">        
        <div className="pageTopDivider"></div>
        <div className="center">
        {this.getPageToCreate(this.state.data)} 
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }

 
}


