import React,{useState} from 'react';
import styled from 'styled-components';

function Flight() {
    var d = new Date(); //date object
    const [origin, setOrigin] = useState("New-delhi"); 
    const [originCityCode, setOriginCityCode] = useState();
    const [destinationCityCode, setDestinationCityCode] = useState();
    const [destination, setDestination] = useState("Mumbai"); //
    const [fromTime, setFromTime] = useState(`${d.getDate()+1}/${(d.getMonth()+1)> 9 ? (d.getMonth()) : ("0"+(d.getMonth()+1))}/${d.getFullYear()}`)
    const [toTime, setToTime] = useState('27/05/2021')
    const [trip,setTrip]= useState("round");
    const [guest,setGuest] = useState(1);


    console.log(origin);

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
    const getData = async (event)=>{
        
        await getOriginCityCode(origin);
        await getDestinationCityCode(destination);

        await fetch(`https://tequila-api.kiwi.com/v2/search?apikey=${TEQUILA_API_KEY}&fly_from=${originCityCode}&fly_to=${destinationCityCode}&date_from=${fromTime}&date_to=${toTime}&nights_in_dst_from=7&nights_in_dst_to=28&flight_type=${trip}&max_stopovers=0&curr=INR`)
        .then(response => {
            return response.json();
        })
        .then((data)=>{
            const alldata= data
            var i;
            for (i = 0; i < 10; i++) {
                console.log(alldata.data[i])
              }
             // console log the flight data
        })
    }

    

    return (
        <FlightPage>
            <form action="" onSubmit={(event)=>{ 
                event.preventDefault();
                 getData();
                 }}>
            <SearchBox>
                <CitySearch>
                    <input value={origin} onChange={(e)=> setOrigin(e.target.value)} type="text"/>
                    <input value={destination} onChange={(e)=> setDestination(e.target.value)} type="text"/>
                </CitySearch>
                <DatePicker>
                    <input type="text" value={fromTime} onChange={(e)=> setFromTime(e.target.value)} />
                    <input type="text" value={toTime} onChange={(e)=> setToTime(e.target.value)}/>
                </DatePicker>
                <Guests>
                    <input type="number" value={guest} onChange={(e)=>setGuest(e.target.value)}/>
                </Guests>
                <button type="submit">Search</button>
            </SearchBox>
            </form>
        </FlightPage>
    )
}

export default Flight


const FlightPage = styled.div `

`

const SearchBox = styled.div `
display:flex;
justify-content:center;
align-items:center;
input{
    outline:none;
}
`
const CitySearch = styled.div `

`;

const DatePicker = styled.div `

`;

const Guests = styled.div `

`;