import React,{useState} from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import airline from './airline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {KeyboardDatePicker} from "@material-ui/pickers";
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Card from './Card';
import axios from 'axios';


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
    }
  }));

function Flight() {
    
    var d = new Date(); //date object

    //Location Data
    const [origin, setOrigin] = useState("New-delhi"); 
    const [originCityCode, setOriginCityCode] = useState();
    const [destinationCityCode, setDestinationCityCode] = useState();
    const [destination, setDestination] = useState("Mumbai"); //
    
    //Time data
    const [fromTime, setFromTime] = useState(`${d.getDate()}/${(d.getMonth()+1)> 9?(d.getMonth()):("0"+(d.getMonth()+1))}/${d.getFullYear()}`)
    const [toTime, setToTime] = useState('27/05/2021');
    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedDate1, handleDateChange1] = useState(new Date());
    
    //flight Data
    const [flightData, setFlightData] = useState([]);
    const [guest, setGuest] = useState(1);


    console.log(origin);
    const [trip, setTrip] = useState("round");
    const TEQUILA_API_KEY = "NZ1N-dUb46M2DP0wrST6VQXyOJ6ndMpm";
    
    const getOriginCityCode= async(city)=>{
        await fetch(`https://tequila-api.kiwi.com/locations/query?apikey=${TEQUILA_API_KEY}&term=${city}&location_types=city`)
        .then(response=> {return response?.json()})
        .then((data)=>{
            setOriginCityCode(data["locations"][0]["code"])
        })
    }

    const getDestinationCityCode= async(city)=>{
        await fetch(`https://tequila-api.kiwi.com/locations/query?apikey=${TEQUILA_API_KEY}&term=${city}&location_types=city`)
        .then(response=>{return response?.json()})
        .then((data)=>{
            setDestinationCityCode(data["locations"][0]["code"])
        })
    }

    const getDate = (d)=>{
         return `${d.getDate()}/${(d.getMonth()+1)> 9?(d.getMonth()):("0"+(d.getMonth()+1))}/${d.getFullYear()}`
    }

    const getData = async () => {
        await getOriginCityCode(origin);
        await getDestinationCityCode(destination);
        await setFromTime(getDate(selectedDate));
        await setToTime(getDate(selectedDate1));
        const url = `https://tequila-api.kiwi.com/v2/search?apikey=${TEQUILA_API_KEY}&fly_from=${originCityCode}&fly_to=${destinationCityCode}&date_from=${fromTime}&date_to=${toTime}&sort=price&max_stopovers=0&curr=INR`
        axios.get(url)
        .then((response)=>{
            // setFlightData((prevState)=>({
            //     airline:{
            //         ...prevState.airline,
            //         AI:{
            //             ...prevState.airline.AI,
            //             name:"India",
            //             data: {data}
            //         }
            //     }
            // })) // console log the flight data
            setFlightData(response.data.data)
        })
    }

    const handleChange = (event) => {
      setTrip(event.target.value);
    };

    // function groupFlightData(flightData){
    //     return flightData.reduce((acc,obj)=>{
    //         const key = obj.route[0].airline;
    //         if (!acc[key]) {
    //             acc[key] = [];
    //          }
    //          acc[key].push(obj);
    //          return acc;
    //     })
    // }

    const classes = useStyles();
    return (
        <FlightPage>
            <Paper className={classes.container} elevation={3}>
            <form action="" onSubmit={ async(event)=>{ 
                event.preventDefault();
                await getData();
                // if (typeof flightData !== 'undefined' && flightData.length === 0) {
                //     groupFlightData();
                // }
                 }}>
            <SearchBox>
                <CitySearch>
                <Autocomplete
                    className={classes.from}
                    freeSolo
                    id="From"
                    value={origin}
                    onChange={(event, newValue) => {
                    setOrigin(newValue);
                    }}
                    options={top100Films.map((option) => option.title)}
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
                        label="Departure Date"
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
                        label="Return Date"
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
            <FlightInfo>
            {console.log(flightData)}
            {flightData.map((data)=>{
                return (
                    
                    <Card flightno = {data.route[0].airline} price={data.price} departure={data.local_departure} arrival={data.local_arrival} origin={origin} destination={destination}/>
                )
            })}
            </FlightInfo>
        </FlightPage>
    )
}

export default Flight

const FlightPage = styled.div `
display:flex;
flex-direction:column;
align-items:center;
padding:10px;
`
const FlightInfo = styled.div `
margin-top:10px;
width:85%;
height:450px;
overflow-y:scroll;
::-webkit-scrollbar{
    display:none;
}
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
`;

const top100Films = [
    { title: 'Nagpur', year: 1994 },
    { title: 'New-delhi', year: 1972 },
    { title: 'Raipur', year: 1974 },
    { title: 'Mumbai', year: 1974 },
    { title: 'Bangalore', year: 1974 },
    { title: 'Chennai', year: 1974 },
    { title: 'London', year: 1974 },
    { title: 'Ladakh', year: 1974 },

    
  ];

