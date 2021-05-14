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
import HotelTile from './tile_components/hoteltile';
import {GoogleMap} from "@react-google-maps/api";
import {useLoadScript} from "@react-google-maps/api";

const useStyles = makeStyles((theme) => ({
  from: {
    width: '300px',
    height:'auto',
    color: 'white',
    margin:'2px',

  },
  container: {
      display:'inline-block',
      width:'inherit',
      padding: '0 5px',
      height:'auto',
  },
  button:{
      margin:'10px',
  },
  date:{
      margin:'2px',
  },
  info:{
    marginTop:'20px',
    width:'130%',
    height:'430px'
  }
}));

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const center = {
  lat: 31.968599,
  lng: -99.901810,
}

function Hotels({center,zoom}) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate1, handleDateChange1] = useState(new Date());
  const [destination, setDestination] = useState("Mumbai"); //

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
      'x-rapidapi-key': '17209dfcaemshbb98df90df44dc5p17e8bajsn7efca3608413',
      'x-rapidapi-host': 'hotels-com-free.p.rapidapi.com'
    }
  };
    

  
    const [query, setQuery] = useState("");
    const [Hotels, setHotels] = useState([]);

  
  
    const getData = async () => {
      await axios.request(options)
      .then( async (response)=> {
        console.log(response.data["data"]["body"]["searchResults"]["results"])
        await setHotels(response.data["data"]["body"]["searchResults"]["results"]);
      });
    }
  
    const{isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: 'AIzaSyAt1iOj9G3DwD_N1UhoVTrRs1q6h6Jn3TM',
    });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

    return (
      <HotelPage>
        <Paper className={classes.container} elevation={3}>
            <form action="" onSubmit={(event)=>{ 
                event.preventDefault();
                getData();
                  }}>
            <SearchBox>
                <CitySearch>
                
                <Autocomplete
                    className={classes.from}
                    freeSolo
                    id="From"
                    disableClearable
                    value={destination}
                        onChange={(event, newValue) => {
                        setDestination(newValue);
                        }}
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Destination"
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
                        label="Check in"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        InputAdornmentProps={{ position: "start" }}
                        className={classes.date}
                    />
                <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Check out"
                        format="dd/MM/yyyy"
                        value={selectedDate1}
                        onChange={handleDateChange1}
                        InputAdornmentProps={{ position: "start" }}
                        className={classes.date}
                />
                </Datepicker>
                <Fab className={classes.button} type="submit" color="primary" aria-label="add">
                    <SearchIcon />
                </Fab>
            </SearchBox>
            </form>
            </Paper>
        <Paper className={classes.info}>
        <HotelInfo>
          <HotelListing>
            {
              Hotels.filter((data)=> (data.ratePlan != undefined)).map((data)=>{
                return <HotelTile name={data.name} image={data.optimizedThumbUrls.srpDesktop} 
                reviews={data.guestReviews} price={data.ratePlan["price"].exactCurrent} stars={data.starRating} address={data.address} />
              })
            }
          </HotelListing>
          <HotelMapping>
          <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={11} 
            center={center} 
            />
          </HotelMapping> 
          </HotelInfo>
        </Paper>
        </HotelPage>
    );
}
export default Hotels



const HotelPage = styled.div `
display:flex;
flex-direction:column;
align-items:center;
padding:10px;
`
const SearchBox = styled.div `
display:flex;
justify-content:center;
align-items:center;
`
const Datepicker = styled.div `
margin-top:8px;
display:flex;
`
const CitySearch = styled.div `
display:flex;
margin:10px;
`
const HotelInfo = styled.div `
padding:10px;
height:100%;
display:grid;
grid-template-columns:55% auto;
`
const HotelListing = styled.div `
height:100%;
overflow-y:scroll;
::-webkit-scrollbar{
 display:none; 
}
`
const HotelMapping = styled.div `
height:100%;
background-color:red;
`

const top100Films = [
  { title: 'Nagpur', year: 1994 },
  { title: 'New-delhi', year: 1972 },
  { title: 'Raipur', year: 1974 },
  { title: 'Mumbai', year: 1974 },
  { title: 'Bangalore', year: 1974 },
  { title: 'Chennai', year: 1974 },
  { title: 'Pune', year: 1974 },
  { title: 'London', year: 1974 },
  { title: 'Ladakh', year: 1974 },
];