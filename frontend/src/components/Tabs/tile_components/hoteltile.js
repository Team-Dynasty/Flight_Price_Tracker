import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'grid',
      gridTemplateColumns:"300px auto 100px",
      height:'150px',
      margin:'5px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: '100%',
      height:'inherit'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    price:{
        color:'green',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        fontSize:'25px',
        padding:'10px'
    }
  }));

function HotelTile({ name, image, reviews, address, price, stars}) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={image}
                title={name}
            />
        <div className={classes.details}>
            <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
                {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {address.streetAddress},{address.locality}
            </Typography>
            <Typography variant="subtitle3" color="textSecondary">
                {stars}-star
            </Typography>
            </CardContent>
        </div>
        <div className="hotel__pricing">
            <Typography className={classes.price} variant="subtitle2" color="textSecondary">
                {price}
            </Typography>
        </div>
      
    </Card>
    )
}

export default HotelTile

