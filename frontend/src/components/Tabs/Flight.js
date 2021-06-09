import React,{useState, useEffect} from 'react';
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
import {Line} from 'react-chartjs-2';
import fire from '../../firebase'
import '../Sign/PopupHero'


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
    const [origin, setOrigin] = useState("Nagpur"); 
    const [originCityCode, setOriginCityCode] = useState();
    const [destinationCityCode, setDestinationCityCode] = useState();
    const [destination, setDestination] = useState("Mumbai"); //
    
    //Time data
    const [fromTime, setFromTime] = useState(`${d.getDate()}/${(d.getMonth()+1)> 9?(d.getMonth()):("0"+(d.getMonth()+1))}/${d.getFullYear()}`)
    const [toTime, setToTime] = useState('27/05/2021');
    const [selectedDate, handleDateChange] = useState(new Date());
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const [selectedDate1, handleDateChange1] = useState(currentDate);
    
    //flight Data
    const [flightData, setFlightData] = useState([]);
    const [guest, setGuest] = useState(1);

    const [trip, setTrip] = useState("round");
    const TEQUILA_API_KEY = "3mHLBZtsaOzZJB4p58sfIAfxLKMF239G";
    
    
    const getOriginCityCode= async(city)=>{
        await axios.request({
            method: 'GET',
            url: 'https://tequila-api.kiwi.com/locations/query',
            params: {
              term: origin,
              location_types: 'city',
            },
            headers: {
              'apikey': 'NZ1N-dUb46M2DP0wrST6VQXyOJ6ndMpm',
            }})
            .then(function (response) {
                setOriginCityCode(response.data.locations[0].code)
                console.log(response.data.locations[0].code);
            }).catch(function (error) {
                console.error(error);
            });
    }

    const getDestinationCityCode= async(city)=>{
        await axios.request({
            method: 'GET',
            url: 'https://tequila-api.kiwi.com/locations/query',
            params: {
              term: destination,
              location_types: 'city',
            },
            headers: {
              'apikey': 'NZ1N-dUb46M2DP0wrST6VQXyOJ6ndMpm',
            }})
            .then(function (response) {
                setDestinationCityCode(response.data.locations[0].code)
                console.log(response.data.locations[0].code);
            }).catch(function (error) {
                console.error(error);
            });
    }

    const getDate = (d)=>{
         return `${d.getDate()}/${(d.getMonth()+1)> 9?(d.getMonth()):("0"+(d.getMonth()+1))}/${d.getFullYear()}`
    }

    const getData = async () => {
        console.log(origin);
        await getOriginCityCode(origin);
        await getDestinationCityCode(destination);
        setFromTime(getDate(selectedDate));
        setToTime(getDate(selectedDate1));

        await axios.request({
            method: 'GET',
            url: 'https://tequila-api.kiwi.com/v2/search',
            params: {
              fly_from:originCityCode,
              fly_to:destinationCityCode,
              date_from:fromTime,
              date_to: toTime,
              flight_type: "oneway",
              sort:'price',
              max_stopovers:0,
              curr:'INR',
            },
            headers: {
              'apikey': 'NZ1N-dUb46M2DP0wrST6VQXyOJ6ndMpm',
            }})
            .then(function (response) {
                setFlightData(response.data.data)
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
    }

    const [chartData, setChartData] = useState({});
    
    const flightprice = (data) =>{
        let list =[];
        for( const dataObject of data){
            console.log(dataObject.price)
            list.push(dataObject.price)
        }
        return list
    }

    const flightdate = (data) =>{
        let list1 =[];
        for( const dataObject of data){
            list1.push((dataObject.local_arrival).split('T')[0])

        }
        return list1
    }


    function ascendingOrder(arr) {
        return arr.sort(function(a, b) {
          return a - b;
        });
    }

    const getChartData= async ()=>{
        await axios.request({
            method: 'GET',
            url: 'https://tequila-api.kiwi.com/v2/search',
            params: {
              fly_from:originCityCode,
              fly_to:destinationCityCode,
              date_from:fromTime,
              date_to: toTime,
              flight_type: "oneway",
              sort:'date',
              max_stopovers:0,
              curr:'INR',
            },
            headers: {
              'apikey': 'NZ1N-dUb46M2DP0wrST6VQXyOJ6ndMpm',
            }})
            .then(function (response) {
                for(const dataObj of response.data.data){
                  flightprice.push(parseInt(dataObj.price))
                };
            }).catch(function (error) {
                console.error(error);
            });
    }

    const chart =()=>{
        setChartData({
                labels: flightdate(flightData),
                datasets: [{
                  borderColor: "rgba(109,212,0,0.5)",
                  pointBorderColor: "#6DD400",
                  pointBackgroundColor: "#80b6f4",
                  pointHoverBackgroundColor: "#80b6f4",
                  pointHoverBorderColor: "#80b6f4",
                  pointBorderWidth: 10,
                  pointHoverRadius: 10,
                  pointHoverBorderWidth: 1,
                  pointRadius: 2,
                  fill: false,
                  borderWidth: 2,
                  data: flightprice(flightData),
                }]
              })
    }

    const handleChange = (event) => {
      setTrip(event.target.value);
    };

    const setalert=async()=> {
        try{
            let uprice= flightData[0]["price"];
            let ucity1= flightData[0]["cityCodeFrom"];
            let ucity2= flightData[0]["cityCodeTo"];
            let udate1= flightData[0]["local_arrival"];
            let udate2= flightData[0]["local_departure"];
            var uquerycount=0;
            var qcity1="";
            var qcity2="";
            console.log(udate2,udate1)
            
            const db = fire.firestore();
            console.log(window.useremail);
            await db.collection("users").doc(window.useremail).get().then((snapshot) => {
                    let items = snapshot.data();
                    var qcount = (items['querycount']);
                    console.log(qcount,qcity1,qcity2);
                    uquerycount=qcount
                    
            });
            console.log(uquerycount+1);
            uquerycount+=1;

            var query="query"+uquerycount
            if ((ucity1 != qcity1) || (ucity2 != qcity2)){
                await db.collection("users").doc(window.useremail).update({
                    [query]:{
                     price:uprice,
                     city1: ucity1,
                     city2: ucity2,
                     date1:udate1,
                     date2:udate2,},
                    querycount:uquerycount,
                   });
            }else{
                console.log("repeted"); 
            }
            
        }catch{

        }
        
        // console.log(flightData[0]["price"])
    }

    const classes = useStyles();
    return (
        <FlightPage>
            <Paper className={classes.container} elevation={3}>
            <form action="" onSubmit={ async(event)=>{ 
                event.preventDefault();
                getData();
                chart();
                setalert();
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
                        label="From Date"
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
                        label="To Date"
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
            {/* {console.log(flightData)} */}
            {flightData.map((data)=>{
                var comapany = get_airline(data.route[0].airline);
                return (
                    <Card flightno = {data.route[0].flight_no} price={data.price} departure={tConvert(data.local_departure)} arrival={tConvert(data.local_arrival)} origin={origin} destination={destination} flight_name={comapany[0]} logo={comapany[1]} company_website={comapany[2]}/>
                )
            })}
            {/* {console.log(flightData)} */}
            </FlightInfo>
            <Paper style={{ paddingLeft:"10px", paddingRight:"10px",marginTop:"20px" }}>
            
            <div style={{ width:"700px"}}>
            <Line data={chartData} /> 
            </div>
            
            </Paper> 
        </FlightPage>
    )
}

export default Flight

const FlightPage = styled.div `
display:flex;
flex-direction:column;
align-items:center;
padding:10px;
width: 100%;
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

  function get_airline(airline_code){
      var comapany_name = "";
      var company_logo = "";
      var   company_website="";
    switch(airline_code){
        case 'AI':
            comapany_name = "Air India";
            company_logo  = "https://www.gstatic.com/flights/airline_logos/70px/AI.png";
            company_website="http://www.airindia.in/";
            
            break;
        case 'UK':
            comapany_name = "Vistara";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/UK.png";
            company_website="https://www.airvistara.com/in/en";
            break;
        case 'IX':
            comapany_name = "Express India";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/IX.png";
            company_website="https://www.airindiaexpress.in/en";
            break;
        case 'SG':
            comapany_name = "Spice Jet";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/SG.png";
            company_website="https://www.spicejet.com/";
            break;
        case 'G8':
            comapany_name = "Go Air";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/G8.png";
            company_website="https://www.flygofirst.com/";
            break;
        case '6E':
            comapany_name = "IndiGo";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/6E.png";
            company_website="https://www.goindigo.in/";
            
            break;
        case 'I5':
            comapany_name = "AirAsia India";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/I5.png";
            company_website="https://www.airasia.co.in/home";
            break;
        case '9I':
            comapany_name = "Alliance Air";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/9I.png";
            company_website="http://www.airindia.in/alliance-air.htm";
            break;
        case '4H':
            comapany_name = "Air Hertiage";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/4H.png";
            company_website="https://www.alternativeairlines.com/air-heritage";
            break;
        case 'S9':
            comapany_name = "FlyBig";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/S9.png";
            company_website="https://flybig.in/book";
            break;
        case 'OG':
            comapany_name = "Star Air";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/OG.png";
            company_website="https://starair.in/";
            break;
        case '2T':
            comapany_name = "TruJet";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/2T.png";
            company_website="https://www.trujet.com/#/home";
            break;
        case 'ZO':
            comapany_name = "Zoom Air";
            company_logo = "https://www.gstatic.com/flights/airline_logos/70px/ZO.png";
            company_website="https://zoomair.in/";
            break;
    }
    return [comapany_name, company_logo, company_website];
  }

  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
