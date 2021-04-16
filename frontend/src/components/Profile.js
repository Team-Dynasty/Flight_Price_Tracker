import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import Signup from './Sign/Signup';
import Login from './Sign/Login';
import Hero from './Sign/PopupHero';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    menuList:{
        marginTop:'10px',
        minHeight:'200px',
        minWidth:'200px',
        width:'200px',
        maxWidth:'500px !important',
    },
    avatar:{
        display:"flex",
        height:'30px',
        paddingLeft:'10px',
        fill:'gray'
    },
    button: {
        padding: '5px 5px 5px 12px',
        height:'42px',
        borderRadius: '21px',
        backgroundColor: 'white',
    },
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));



export default function MenuPopupState() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)} className={classes.button}>
            <MenuIcon fontSize="small" color="gray"/>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={classes.avatar} aria-hidden="true" role="presentation" focusable="false" ><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
          </Button>
          <StyleTextField {...bindMenu(popupState)}>
            <span aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
              <MenuItem onClick={popupState.close}>Log in</MenuItem>
            <MenuItem onClick={popupState.close}>Sign up</MenuItem>
            </span>
          </StyleTextField>
        </React.Fragment>
      )}
    </PopupState>
    <Popup
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 750 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Hero/>
      </Popup>
    </>
  );
}

const StyleTextField = styled(Menu)`
    margin-top:50px;
    .MuiPopover-paper {
      outline: 0;
      position: absolute;
      max-width: calc(100% - 32px);
      width: 200px;
      max-height: calc(100% - 32px);
      min-height: 16px;
      overflow-x: hidden;
      overflow-y: auto;
    }
`

const Popup = styled(Popover)`
.MuiPopover-paper {
  width:400px;
}
`