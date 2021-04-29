import React,{Fragment, useState} from 'react'
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from "@material-ui/pickers";
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

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



function Experience() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate1, handleDateChange1] = useState(new Date());
  const [destination, setDestination] = useState("Mumbai"); //

    const classes = useStyles();
    return (
        <HotelPage>
          <Paper className={classes.container} elevation={3}>
            <form action="" onSubmit={(event)=>{ 
                event.preventDefault();
                
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

        </HotelPage>

    )
}

export default Experience

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