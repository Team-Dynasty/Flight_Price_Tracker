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

export default function SimpleAccordion({flightno,price, arrival,departure,destination,origin}) {
  const classes = useStyles();
  var d1 = new Date(departure) 
  var d2 = new Date(arrival)
  var DepartureTime = `${d1.getUTCHours()}:${d1.getUTCMinutes()=='0'? '00': d1.getUTCMinutes()}`
  var ArrivalTime = `${d2.getUTCHours()}:${ (d2.getUTCMinutes()=='0') ? `${d2.getUTCMinutes()}0`: d2.getUTCMinutes()}`
  var time = `${DepartureTime} - ${ArrivalTime}`
  var duration = `${d2.getUTCHours() - d1.getUTCHours()}:${ (d2.getUTCMinutes() - d1.getUTCMinutes())<0?(d1.getUTCMinutes() - d2.getUTCMinutes()):(d2.getUTCMinutes() - d1.getUTCMinutes())}`
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
            <div className="logo">{flightno}</div>
            <div className="time_flight_container">
              <div className="time">{time}</div>
              <div className="flight_name">{flightno}</div>
            </div>
            <div className="duration_destination_container">
              <div className="duration">{duration} hr</div>
              <div className="destination">{origin} - {destination}</div>
            </div>
            <div className="stop">No-Stop</div>
            <div className="select_flight">Select Flight</div>
            <div className="price_trip_container">
              <div className="price">{price} ₹</div>
              <div className="trip">Trip</div>
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
          <div className="destination">
           <div className="dot"></div>
           <div className="destination_time">
            <div className="destination_arrival_time">{DepartureTime}</div>
            <div className="dot_1"></div>
            <div className="to">{destination}</div>
          </div>
          </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
  );
}