import React, { Component } from "react";
import { Link } from 'react-router-dom';


export default class LinkHandlerCategorys extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.data = {}
        this.state = { data:{
        slug: "home",
        name: "Home",
        page_type: null,
        fields: {
          sitetype: "html-page",
          aboutpage: "<h>Loading...</h><p>Hang in there!</p>"
            
          
        }}, 
        sitePosition : decodeURI(window.location.href.replace("http://localhost:3000/", ""))
                      };
        this.getPageInformation(this.state.sitePosition);

      }
        
      
    getPageLink(){
        
        let ProcessedCurrentPageLocation = decodeURI(window.location.href.replace("http://localhost:3000/", ""));
        if (ProcessedCurrentPageLocation !== this.state.sitePosition) {
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
            sitetype: "html-page",
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
     link = link.toLowerCase();
    await this.props.model.getPageInformation(link).then(resp => this.setData(resp)).catch(err=>this.setState(this.setError({error:err})));
 
    }

    CreatePageHTML(pagedata){
      //let data = this.state.data;
     
      let pagecontent = (pagedata);
      let containor = <div dangerouslySetInnerHTML={{ __html: pagecontent}} />
      
      
      return (containor) 
    }

    jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Here we create a shop page. This is were you make changes to a shopPage

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
        <Link to={"/"+this.state.sitePosition+"/"+ this.jsUcfirst(subcatagoryname)+"/"+productname}> {productcard} </Link>
        </div>
      </div>
      }

    getPageToCreate(pagedata){
      if(pagedata.fields.sitetype === "html-page"){
        return <div className="shopWraper">{this.CreatePageHTML(this.state.data.fields.aboutpage)}</div>
      }
      if(pagedata.fields.sitetype === "shop-page"){
        let shoppage = this.state.data.fields.subcategory.product_in_subcategory.map(product => this.CreatePageSHOP(product));
        
        return <div className="shopWraper">{shoppage}</div>
      }
      else{
        return <div dangerouslySetInnerHTML={{ __html:this.state.data.fields.aboutpage}}/>
    }
    }
      

  render() {
    this.getPageLink()
    return (
      <div className="pageWrapper">        
        <div className="pageTopDivider"></div>
        <div className="center" >
        {this.getPageToCreate(this.state.data)}
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }

 
}
