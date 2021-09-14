import React from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import StoreModel from './model_more/model';
import HomeView from './site_pages/home.js';
import LinkHandlerCategorys from './site_pages/linkhandlerCategory.js';
import LinkHandlerSubcategorys from './site_pages/linkhandlerSubcategory.js';
import LinkHandlerSubcategorysOrProducts from './site_pages/linkhandlerSubcategoryOrProduct.js';
import Header from './header_footer/header.js';
import Footer from './header_footer/footer.js';
import CheckOutView from './site_pages/checkOut';
import Success from './site_pages/success.js'
import Pay from './ordering_components/api/payment_intents'
import history from './history';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.model = StoreModel;
    this.state = {
      value: ""
    };
  }
    handleChange = (event) => {
      this.setState({
        value: event.target.value,
      });
  }

  render() {
    return (<Router history={history}>
          <Header model={this.model}/>
      
          <React.Fragment>
            <Switch>
            
                <Route
                path="/"
                exact component={() => <HomeView model={this.model} />}/>

                <Route
                  path="/Checkout"
                  exact component={() => <CheckOutView model={this.model} />}/>
                  
                <Route
                  path="/success"
                  exact component={() => <Success model={this.model} />}/> 
                
                <Route
                path="/api/payments_intents" 
                exact component={() => <Pay/>}/>

               <Route
                path="/:category" 
                exact component={() => <LinkHandlerCategorys model={this.model} />}/>

              <Route
                path="/:category/:subcatagory" 
                exact component={() => <LinkHandlerSubcategorys model={this.model} />}/>

             <Route
                path="/:category/:subcatagory/:product" 
                exact component={() => <LinkHandlerSubcategorysOrProducts model={this.model} />}/>
           
              <Route component={NoMatch} />
              
            </Switch>
          </React.Fragment>
          
          <Footer model={this.model}/>
        </Router>
      
    );
  }
  //<Route path="/specPlaylist" render={() => <playlistSettings model={heroifyModel}/>}/>
}

const NoMatch = () => (
  <div className="pageWrapper">
    <div className="pageTopDivider"></div>
    <div className="text-center">
      <h className="headerPageText" >404 No match</h>
      <Link to="/">
        <h1>Click here to go to homepage</h1>
      </Link>
    </div>
  </div>
);

export default App;
