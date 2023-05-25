// import React, { useState } from "react";

// const MainPage = () => {
//   const [splashVisible, setSplashVisible] = useState(true);

//   const hideSplashScreen = () => {
//     setTimeout(() => {
//       setSplashVisible(false);
//     }, 610);
// };

//   return (
//   <div>
//     <h1>Welcome to Waste-less Bytes!</h1>
//       <h3> Empowering Communities, Reducing Food Waste</h3>
//         <p>Waste-less Bytes is dedicated to reducing food waste and improving
//           access to food for those in need. Our platform connects individuals, restaurants, and charities,
//           fostering a community-driven approach to minimize food waste. We provide a convenient and free solution
//           for individuals and restaurants to share surplus food with those who can benefit from it.
//           Charities can also request food donations from restaurants for their events.
//           Join us in the fight against food waste and be part of a world where everyone has access to quality food.
//           Waste-less Bytes - making a difference, one byte at a time.
//         </p>
//       {splashVisible && (
//         <div className="splash" onCLick={ hideSplashScreen }>
//           <h1 className="splash-header">Take your first bite to a waste-less future.</h1>
//         </div>
//       )}
//   </div>
// );
// }

// export default MainPage;



import React, { useState } from "react";

const MainPage = () => {
  const [splashVisible, setSplashVisible] = useState(true);

  const hideSplashScreen = () => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 610);
  };

  return (
    <div>
      {splashVisible ? (
        <div className="splash" onClick={hideSplashScreen}>
          <h1 className="splash-header">
            Take your first bite to a waste-less future.
          </h1>
        </div>
      ) : (
        <div className= "splash-container">
          <h1>Welcome to Waste-less Bytes!</h1>
          <h3>Empowering Communities, Reducing Food Waste</h3>
          <p>
            Waste-less Bytes is dedicated to reducing food waste and improving
            access to food for those in need. Our platform connects individuals,
            restaurants, and charities, fostering a community-driven approach to
            minimize food waste. We provide a convenient and free solution for
            individuals and restaurants to share surplus food with those who can
            benefit from it. Charities can also request food donations from
            restaurants for their events. Join us in the fight against food
            waste and be part of a world where everyone has access to quality
            food. Waste-less Bytes - making a difference, one byte at a time.
          </p>
          <script
          src="https://images.pexels.com/photos/3184188/pexels-photo-3184188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Waste-less Bytes"
          ></script>
        </div>
      )}
    </div>
  );
};

export default MainPage;
