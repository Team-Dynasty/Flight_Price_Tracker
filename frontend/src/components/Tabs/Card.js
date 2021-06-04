import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Card.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion({flightno,price, arrival,departure,destination,origin, flight_name, logo,company_website, tt}) {
  const classes = useStyles();
  function myFunction() {
    var str = departure;
    var res1 = str.split("T");
    // document.getElementById("demo").innerHTML = res1[0];
    return res1[0]
  }
  
  var d1 = new Date(departure)

  var d2 = new Date(arrival)
  var DepartureTime = `${d1.getUTCHours()}:${d1.getUTCMinutes()=='0'? '00': d1.getUTCMinutes()}`
  var ArrivalTime = `${d2.getUTCHours()}:${ (d2.getUTCMinutes()=='0') ? `${d2.getUTCMinutes()}0`: d2.getUTCMinutes()}`
  var time = `${DepartureTime} - ${ArrivalTime}`
  var duration = `${d2.getUTCHours() - d1.getUTCHours()} hr ${ (d2.getUTCMinutes() - d1.getUTCMinutes())<0?(d1.getUTCMinutes() - d2.getUTCMinutes()):(d2.getUTCMinutes() - d1.getUTCMinutes())} min`
  
  return (
    <div className={classes.root}>

      <div className="F1">
 
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flight_container">
           <a className="logo" title={flight_name} href={company_website} target="_blank"> <img src={logo}></img></a>
            <div className="time_flight_container">
            <div className="flight_date">{myFunction()}</div>
              <div className="time">{time}</div>
              <div className="flight_name">{flight_name}</div>
            </div>
            <div className="duration_destination_container">
              <div className="duration">{duration}</div>
              <div className="destination">{origin} - {destination}</div>
            </div>
            <div className="stop">Non-Stop</div>
            <div className="select_flight">Select Flight</div>
            <div className="price_trip_container">
              <div className="price">₹{price}</div>
              <div className="trip">One-Way</div>
            </div>
          </div>
          
        </AccordionSummary>
        <AccordionDetails>
        <div className="flight_details">
        <div className="line"></div>
        <div className="logo_internal"></div>
        <div className="details">
          <div className="source">
           <div className="dot"></div>
           <div className="source_time">
            <div className="source_arrival_time">{ArrivalTime}</div>
            <div className="dot_1">&nbsp;</div>
            <div className="from">{origin}</div>
           </div>
          </div>
          <div className="duration_internal">
            <div className="t">Travel Time: </div>
            <div className="travel_time">{duration} hr</div>
          </div>
          <div className="destination_inside">
           <div className="dot"></div>
           <div className="destination_time">
            <div className="destination_arrival_time">{DepartureTime}</div>
            <div className="dot_1"></div>
            <div className="to">{destination}</div>
          </div>
          </div>
          <div className="company">
            <div className="company_code"></div>
            <div className="company_code"></div>
          </div>
          <div className="flight_no"> Flight Number: {flightno}</div>
          
          </div>

        </div>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
  );
}