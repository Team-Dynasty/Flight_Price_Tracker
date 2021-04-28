import React from "react";
import './Search.css';



function Search() {
  return(
    <div>
      <div className="a">
      <div className="control">
        <input className ="input" type= "text" placeholder= "from"/>
        <div className="line"></div>
        <input className ="input1" type= "text" placeholder= "to"/>
        <div className="line"></div>
        <input className ="input2" type= "text" placeholder= "from date"/>
        <div className="line"></div>
        <input className ="input3" type= "text" placeholder= "to date"/>
        
        <div className="search">
        <img className="search_icon" src="https://img.icons8.com/fluent-systems-regular/40/000000/search--v1.png"/>
        </div>
      </div>
    </div>
    </div>

  );
}
export default Search;
  

           
