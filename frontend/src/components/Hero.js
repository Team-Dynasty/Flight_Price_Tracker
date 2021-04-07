import React,{useState} from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Flight from './Tabs/Flight';
import Hotels from './Tabs/Hotels';
import Experience from './Tabs/Experience';





export default function CenteredTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TopTab
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label="Flights" />
        <Tab label="Hotels" />
        <Tab label="Experiences" />
      </TopTab>
      { value === 0 && <Flight/> }
      { value === 1 && <Hotels/> }
      { value === 2 && <Experience/> }


    </>
  );
}


const TopTab = styled(Tabs)`
    color:black;
    background-color:white;
    display:inline-block;
    width:auto;
    .MuiTab-root {
        text-transform:none;
    }
`
