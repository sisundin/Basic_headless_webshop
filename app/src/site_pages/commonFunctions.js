/* eslint-disable react/react-in-jsx-scope */
export function sizerender(size){
    let si = size.sizes;
   
    if(JSON.stringify(si) === '[""]'){
      return <div><label for="sizes">Select size: </label>
      <select name="sizes" id="sizes">
        <option value="n/a">n/a</option>)
      </select></div>
    }
    else {
      
      let sizeelement = <div><label for="sizes">Select size: </label>
        <select name="sizes" id="sizes">
        {si.map((size) => {return <option value={size}>{size}</option>})}
        </select>
      </div>
      return sizeelement

    }

  }


  export function setError(err){
        
    console.log(err.error.response.status + " " +err.error.response.statusText);
    let pagenotFond = {data:{
      slug: "home",
      name: "Home",
      page_type: null,
      fields: {
        sitetype: "error-page",
        aboutpage: '<div className="pageWrapper"><div className="pageTopDivider"></div><div className="text-center"><h className="headerPageText" >' + err.error.response.status + " " +err.error.response.statusText + '</h><a href="/"><h1>Click here to go to homepage</h1></a></div></div>' 
      }}}
      return pagenotFond
      this.setState(pagenotFond);

  }


  jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}