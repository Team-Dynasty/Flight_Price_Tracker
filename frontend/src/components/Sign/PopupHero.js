import React,{useState} from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from './Login';
import Signup from './Signup';





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
        <Tab label="Login" />
        <Tab label="Signup" />
      </TopTab>
      { value === 0 && <Login/> }
      { value === 1 && <Signup/> }


    </>
  );
}


const TopTab = styled(Tabs)`
    flex-grow:2;
    color:black;
    background-color:white;
    display:flex;
    width:auto;
    .MuiTab-root {
        text-transform:none;
    }
`
