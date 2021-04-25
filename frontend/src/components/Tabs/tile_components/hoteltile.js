
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