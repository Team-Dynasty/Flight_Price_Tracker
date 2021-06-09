import React from 'react'
import Profile from './Profile'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import {useState} from 'react'
import '../components/Sign/PopupHero';



function Header(handleLogin) {
    const [selectedTab, setSelectedTab] = useState("0");
    
    const useStyles = makeStyles((theme) => ({
        
        button: {
            padding: '5px 5px 5px 12px',
            height:'42px',
            borderRadius: '21px',
        },
        toolbar: {
            backgroundColor: 'black',
            display:'flex',
            justifyContent:'space-between',
        },
        root: {
        flexGrow: 1,
        },
        menuButton: {
        marginRight: theme.spacing(2),
        },
        title: {
        flexGrow: 1,
        },
    }));
  
    const classes = useStyles();

    return (
        <Container>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <AppLogo variant="h6" className={classes.title}>
                        Flight Price Tracker
                    </AppLogo>
                    {/* <botton onClick={handleLogout}>Logout</botton> */}
                    <div>
                        <User  style={{display:"flex", alignItems:"center"}}>
                            <Typography variant="subtitle1" style={{marginRight:"10px"}}>
                            {/* Guest user */}
                            {!window.useremail?"Guest user":window.useremail}
                                {/* Guest user   {user.name} */}
                            </Typography>

                            <Profile/>    
                        </User>
                        
                    </div>
                </Toolbar>
            </AppBar>
                        
        </Container>
    )
}

export default Header

const User = styled.div ``


const Container = styled.div `
height:40px;
background-color: black;
margin-bottom:22px;
`
const AppLogo = styled(Typography)`
flex-grow: 0;

`