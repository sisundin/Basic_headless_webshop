import React, { Component } from "react";
import { Link } from 'react-router-dom'


export default class LinkHandlerSubcategorys extends Component {
    constructor(props) {
        super(props);
        this.sitelinks = ["Men", "Woman", "About", "SALE"]
        this.props = props;
        this.data = {}
        this.state = { data:{
        slug: "home",
        name: "Home",
        page_type: null,
        fields: {
          sitetype: "html-page",
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
        if (ProcessedCurrentPageLocation[0] !== this.state.sitePosition[0] || ProcessedCurrentPageLocation[1] !== this.state.sitePosition[1]) {
          this.setState({sitePosition:ProcessedCurrentPageLocation});
          
            this.getPageInformation(this.state.sitePosition);
            }
        
       
      }

      setError(err){
        
        console.log(err.error.response.status + " " +err.error.response.statusText);
        let pagenotFond = {data:{
          slug: "home",
          name: "Home",
          page_type: null,
          fields: {
            sitetype: "error-page",
            aboutpage: '<div className="pageWrapper"><div className="pageTopDivider"></div><div className="text-center"><h className="headerPageText" >' + err.error.response.status + " " +err.error.response.statusText + '</h><a href="/"><h1>Click here to go to homepage</h1></a></div></div>' 
          }}}

          this.setState(pagenotFond);

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
    await this.props.model.getPageInformation(link).then(resp => this.setData(resp)).catch(err=>this.setError({error:err}));
 
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
        
        return this.CreatePageHTML(this.state.data.fields.aboutsegment.filter(segment => segment.aboutsegmentname.toLowerCase() === this.state.sitePosition[1].toLowerCase()))
      }
      if(pagedata.fields.sitetype === "shop-page"){
         let shoppage = this.state.data.fields.subcategory.product_in_subcategory.filter(product => product.subcategoryname.toLowerCase() === this.state.sitePosition[1].toLowerCase()).map(product => this.CreatePageSHOP(product))
            if (shoppage.length === 0){
                shoppage = <p>No products found in this category</p>
            }
        return <div className="shopWraper">{shoppage}</div>
      }
      else{
          return <div dangerouslySetInnerHTML={{ __html:this.state.data.fields.aboutpage}}/>
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

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}