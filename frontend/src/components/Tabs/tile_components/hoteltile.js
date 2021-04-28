import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './HotelTile.css';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'grid',
      gridTemplateColumns:"300px auto 100px",
      height:'250px',
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
        display:'flex',
        justifyContent:'flex-end'
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
                Panchavati Nagar, Arvi Road, Pipri Meghe, Wardha
            </Typography>
            <Typography variant="subtitle3" color="textSecondary">
                4-star
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Mac Miller
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
                Mac Miller
            </Typography>
            </CardContent>
        </div>
        <div className="hotel__pricing">
            <Typography className={classes.price} variant="subtitle2" color="textSecondary">
                Mac Miller
            </Typography>
        </div>
      
    </Card>
    )
}

export default HotelTile

// import React, { useEffect } from "react";
// import "./hoteltile.css";
// import { v4 as uuidv4 } from "uuid";

// export default function HotelTile({ hotel }) {
//   return (
//     hotel[0]["optimizedThumbUrls"]["srpDesktop"].match(/\.(jpeg|jpg|gif|png)$/) != null && (
//       <div
//         className="recipeTile"
//         onClick={() => window.open(hotel["recipe"]["url"])}
//       >
//          <div className="bigtile">
//         <img className="recipeTile__img" src={hotel["0"]["optimizedThumbUrls"]["srpDesktop"]} />
//         {/* <div className="imgtext">
//           <p>{recipe["recipe"]["ingredientLines"]["0"]}  </p>
//           <p>{recipe["recipe"]["ingredientLines"]["1"]}  </p>
//           <p>{recipe["recipe"]["ingredientLines"]["2"]}  </p>
//         </div> */}
//         </div>
//         <p className="recipeTile__name" key={uuidv4()}>
//           {hotel["name"]}
//         </p>
//       </div>
//     )
//   );
// }