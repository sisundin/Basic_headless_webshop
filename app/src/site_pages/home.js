import React, { Component } from "react";



export default class HomeView extends Component {
    constructor(props) {
        super(props);
        
        this.props = props;
        this.state = { data:{
        slug: "home",
        name: "Home",
        page_type: null,
        fields: {
          homepage: {
            homesegments: [
              {
                homesegment: "<h>Loading...</h>\n<img src=\" \"/>\n<p>Hang in there!</p>\n"
              }
            ]
          }
        }}, 
        sitePosition : "home"
                      };
                    
        this.getPageLink();
        this.getPageInformation(this.state.sitePosition);
        
        
      }
  
      
    getPageLink(){
        let currentPageLocation = window.location.href;
        let ProcessedCurrentPageLocation = currentPageLocation.replace("http://localhost:3000/", "")
        let link = {Position:{sitePosition : ProcessedCurrentPageLocation} }
          if(link.sitePosition !== ""){
            this.setState({sitePosition:ProcessedCurrentPageLocation}) 
          }
      }

      setError(err){
        let pagenotFond = {data:{
          slug: "home",
          name: "Home",
          page_type: null,
          fields: {
            homepage: {
            homesegments: [
              {
                homesegment: '<div className="pageWrapper"><div className="pageTopDivider"></div><div className="text-center"><h className="headerPageText" > Something went wrong </h><a href="/"><h1>Click here to go to homepage</h1></a></div></div>' 
              }
            ]
          }}}}
          
          return pagenotFond

      }

      setData(resp){
        if (resp.data !== this.state.data){
          this.setState(resp.data);
        }

      }
  

  async getPageInformation(link) {
      if (link===""){link="home"}
      this.props.model.getPageInformation(link).then(resp => this.setData(resp)).catch(err=>this.setState(this.setError({error:err})));
      

    }

    CreatePage(pagedata){
      //let data = this.state.data;
      
      let pagecontent = Object.values(pagedata);
    let containor = <div dangerouslySetInnerHTML={{ __html: pagecontent}} />
      
  
      return (containor) //pagedata.map(p => {return p.homesegment});
      //data.map(page => {console.log(page, page.map((pagesegment) =>{pagesegment}))})
    }
  

  render() {
    
    return (
      <div className="pageWrapper">        
        <div className="pageTopDivider"></div>
        <div className="center">
        
        {this.state.data.fields.homepage.homesegments.map(homesegment=> this.CreatePage(homesegment))} 
       
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }

 
}

