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
    const [flightData, setFlightData] = useState({airline});
    const [guest, setGuest] = useState(1);


    console.log(origin);
    const [trip, setTrip] = useState("round");
    const TEQUILA_API_KEY = "NZ1N-dUb46M2DP0wrST6VQXyOJ6ndMpm";
    
    const getOriginCityCode= async(city)=>{
        await fetch(`https://tequila-api.kiwi.com/locations/query?apikey=${TEQUILA_API_KEY}&term=${city}&location_types=city`)
        .then(response=>{return response?.json()})
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

    const getData = async ()=>{
        await getOriginCityCode(origin);
        await getDestinationCityCode(destination);
        setFromTime(getDate(selectedDate));
        setToTime(getDate(selectedDate1));
        const url = `https://tequila-api.kiwi.com/v2/search?apikey=${TEQUILA_API_KEY}&fly_from=${originCityCode}&fly_to=${destinationCityCode}&date_from=${fromTime}&date_to=${toTime}&sort=price&max_stopovers=0&curr=INR`

        await fetch(url)
        .then(response => {
            return response.json();
        })
        .then((data)=>{
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
            setFlightData(data)
        })
        console.log(flightData)
    }

    const handleChange = (event) => {
      setTrip(event.target.value);
    };

    const classes = useStyles();
    return (
        <FlightPage>
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
                        label="Arrival Date"
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
                        label="Departure Date"
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
        </FlightPage>
    )
}

export default Flight

const FlightPage = styled.div `
display:flex;
justify-content:center;
padding:10px;
`
const SearchBox = styled.div `
display:flex;
justify-content:center;
align-items:center;
input{
    outline:none;
}
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
    { title: 'Mumbai', year: 1974 },
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

