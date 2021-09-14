import React from "react";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.state = { data: {
      fields: {
        footeritem: [
          {
            linktext: "Loading...",
            link: "http://localhost:3000/About/Contact"
          }]
                              }
                            
                          }
                  
    };    
   
  }

  setData(resp){
    if (resp.data !== this.state.data){
      this.setState(resp.data);
    }

  }

  async componentDidMount () {
    await this.props.model.getPageInformation("footer").then(resp => this.setData(resp))
    
  }
   
  renderCatagories(category){
    let catagoryCatagory = category.fields.footeritem;
  let footerlist = catagoryCatagory.map(cat => <li className="footerText"><a href={cat.link}>{cat.linktext}</a></li>)
    return footerlist
       
  
    }

 

  render() {
    let footer = this.state.data;
    const butterimg = "https://cdn.buttercms.com/gZJD5eJjTbCi9MzICoOr"
    return <div className="footer">
      
        <div className = "divider"></div>
       <hr className="line"></hr>
        <ul className="footerUl">
        {this.renderCatagories(footer)}
        <li className="footerText"><a>&#xA9; ERIK och SIMON 2020</a></li>
        </ul>
        <div className = "divider"></div>
        <div className="divider"></div><div className="divider"></div>
        
    </div>
  }

 
  

}