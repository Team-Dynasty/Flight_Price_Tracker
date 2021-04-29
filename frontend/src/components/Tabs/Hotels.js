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
  width: '100vw',
  height: '100vh',
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
      lat: '18.5204 ',
      lon: '73.8567 ',
      checkIn: '2021-01-27',
      checkOut: '2021-01-28',
      rooms: '1',
      locale: 'en_US',
      currency: 'INR',
      pageNumber: '3'
    },
    headers: {
      'x-rapidapi-key': '34939e322amsh6e4158ae52ddaaap1bd415jsna01f1bee3dba',
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
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];