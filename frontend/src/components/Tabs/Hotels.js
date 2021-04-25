import React from 'react'
import { useState } from "react";
import axios from "axios";
import "./Hotel.css";
// import HotelTile from "./tile_components/hoteltile";


function Hotels() {

  const options = {
    method: 'GET',
    url: 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com',
    params: {
      lat: '37.788719679657554',
      lon: '-122.40057774847898',
      checkIn: '2021-01-27',
      checkOut: '2021-01-28',
      rooms: '1',
      locale: 'en_US',
      currency: 'USD',
      pageNumber: '1'
    },
    headers: {
      'x-rapidapi-key': '97e13c05afmsh1139b7103c30e06p141cddjsn79038da49dd2',
      'x-rapidapi-host': 'hotels-com-free.p.rapidapi.com'
    }
  };

    const [query, setquery] = useState("");
    const [hotels, sethotels] = useState([]);
  
    const getdata = async () => {
      await axios.request(options)
      .then(function (response) {
        console.log(response.data)
        console.log(response.data["data"]["body"]["searchResults"]["results"]);
        sethotels(response.data["data"]["body"]["searchResults"]["results"]);
      });
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      getdata();
    };
  
    return (
      <div className="app">
        <h1 onClick={getdata}>Search Hotel</h1>
        <form className="app__searchForm"
        onSubmit={onSubmit}
        >
          <input
            className="app__input"
            type="text"
            placeholder="enter ingridient"
            autoComplete="Off"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <input className="app__submit" type="submit" value="Search" />
        </form>
  
        {/* <div className="app__recipes">
              return <HotelTile hotel={hotels} />;
        </div> */}
      </div>
    );
}

export default Hotels
