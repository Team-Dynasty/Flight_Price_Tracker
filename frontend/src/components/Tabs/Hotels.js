import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import "./Hotel.css";
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {KeyboardDatePicker} from "@material-ui/pickers";
import GoogleMapReact from 'google-map-react'; 
// import HotelTile from './tile_components/HotelTile';
import HotelTile from "./tile_components/hoteltile";
const useStyles = makeStyles((theme) => ({
  from: {
    width: '300px',
    height:'auto',
    color: 'white',
  },
  container: {
      display:'inline-block',
      width:'inherit',
      height:'100px',
  },
  button:{
      margin:'10px',
  }
}));

function Hotels({center,zoom}) {
  const classes = useStyles();

  const options = {
    method: 'GET',
    url: 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com',
    params: {
      lat: '21.1458',
      lon: '79.0882',
      checkIn: '2021-01-27',
      checkOut: '2021-01-28',
      rooms: '1',
      locale: 'en_US',
      currency: 'INR',
      pageNumber: '1'
    },
    headers: {
      'x-rapidapi-key': '34939e322amsh6e4158ae52ddaaap1bd415jsna01f1bee3dba',
      'x-rapidapi-host': 'hotels-com-free.p.rapidapi.com'
    }
  };
    
  
    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedDate1, handleDateChange1] = useState(new Date());
  
    const [query, setQuery] = useState("");
    const [Hotels, setHotels] = useState([]);

  
  
    const getData = async () => {
      await axios.request(options)
      .then( async (response)=> {
        console.log(response.data["data"]["body"]["searchResults"]["results"])
        await setHotels(response.data["data"]["body"]["searchResults"]["results"]);
      });
    }
  
    return (
      <HotelPage>
        {/* <Paper className={classes.container} elevation={3}>
            <form action="" onSubmit={(event)=>{ 
                event.preventDefault();
                getData();
                 }}>
                <CitySearch>
                <Autocomplete
                    className={classes.from}
                    freeSolo
                    id="From"
                    value={origin}
                    onChange={(event, newValue) => {
                    setOrigin(newValue);
                    }}
                    options={cities.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="From"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
                </CitySearch>
                <Datepicker>
                <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Arrival Date"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        InputAdornmentProps={{ position: "start" }}
                    />
                <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Departure Date"
                        format="dd/MM/yyyy"
                        value={selectedDate1}
                        onChange={handleDateChange1}
                        InputAdornmentProps={{ position: "start" }}
                />
                </Datepicker>
                <Fab className={classes.button} type="submit" color="primary" aria-label="add">
                    <SearchIcon />
                </Fab>
            </form>
            </Paper> */}

         <HotelListing>
         {console.log(Hotels['0'])}
          {
          
            Hotels.filter((data)=> (data.ratePlan != undefined)).map((data)=>{
              return <HotelTile name={data.name} image={data.optimizedThumbUrls.srpDesktop} 
              reviews={data.guestReviews} price={data.ratePlan["price"].exactCurrent} stars={data.starRating} address={data.address} />
            })
          }
        </HotelListing>
        <HotelMapping>
        <button onClick={getData}>search</button>
        </HotelMapping> 
      
      </HotelPage>
    );
}
export default Hotels


const HotelPage = styled.div `
display:grid;
width:100%;
grid-template-columns: 50% auto;
height:calc(100vh - 111px);
`
const HotelListing = styled.div `
height:100%;
background-color:black;
overflow-y:scroll;
::-webkit-scrollbar{
 display:none; 
}
`
const HotelMapping = styled.div `
height:100%;
background-color:red;


`
const Datepicker = styled.div `

`
const SearchBox = styled.div `

`