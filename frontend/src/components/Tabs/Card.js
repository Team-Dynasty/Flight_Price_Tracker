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

export default function SimpleAccordion() {
  const classes = useStyles();

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
            <div className="logo">Logo</div>
            <div className="time_flight_container">
              <div className="time">Time</div>
              <div className="flight_name">Flight Name</div>
            </div>
            <div className="duration_destination_container">
              <div className="duration">Duration</div>
              <div className="destination">Destination</div>
            </div>
            <div className="stop">Stop</div>
            <div className="select_flight">Select Flight</div>
            <div className="price_trip_container">
              <div className="price">Price</div>
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
            <div className="source_arrival_time">6 AM</div>
            <div className="dot_1">&nbsp;</div>
            <div className="from"> Dr. Babasaheb Ambedkar International Airport (NAG)</div>
           </div>
          </div>
          <div className="duration_internal">
            <div className="t">Travel Time: </div>
            <div className="travel_time">1 Min</div>
          </div>
          <div className="destination">
           <div className="dot"></div>
           <div className="destination_time">
            <div className="destination_arrival_time">6:01 AM</div>
            <div className="dot_1"></div>
            <div className="to">Chhatrapati Shivaji Maharaj International Airport (BOM)</div>
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