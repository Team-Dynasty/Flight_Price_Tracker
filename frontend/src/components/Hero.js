import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Flight from './Tabs/Flight';
import Experience from './Tabs/Experience';
import Hotels from './Tabs/Hotels';



const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'white',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: 'white',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(0),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  demo3:{
    backgroundColor:'black',
  }
}));

export default function CustomizedTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <div className={classes.demo3}>
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example" centered>
            <StyledTab label="Flights" />
            <StyledTab label="Experiences" />
            <StyledTab label="Hotels" />
          </StyledTabs>
          <TabPanel>
          <BackgroundImage>
          <Span>
          { value === 0 && <Flight/>}
          { value === 1 && <Experience/>}
          { value === 2 && <Hotels/>}
          </Span>
          </BackgroundImage>
          </TabPanel>
        </div>
    </div>
  );
}

const TabPanel = styled.div `
width:100%;
height:calc(100vh + 100px);
background-color:black;
margin-top:70px;
`
const Span = styled.div `
margin-top:-60px;

`
const BackgroundImage = styled.div `
background-image:url('/airplane.jpg');
background-size:cover;
display:flex;
justify-content:center;
width:95%;
margin-top:20px;
height:600px;
margin-left:auto;
margin-right:auto;
`
