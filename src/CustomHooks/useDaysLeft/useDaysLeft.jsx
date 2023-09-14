import { useState} from 'react';

const useDaysLeft = (futureDateStr) => { 
  //const [daysLeft, setDaysLeft] = useState(null);
  let daysLeft;
  if(futureDateStr){
     const currentDate = new Date();
      const [futureYear, futureMonth, futureDay] = futureDateStr.match(/\d+/g);
      const futureDate = new Date(futureYear, futureMonth - 1, futureDay);
      const timeDifferenceMs = futureDate - currentDate;
       daysLeft = Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24));
      //setDaysLeft(dayLeft);
  }
  return daysLeft;
};
export default useDaysLeft;


// import { useState, useEffect } from 'react';

// const useDaysLeft = (futureDateStr) => {
//   const [daysLeft, setDaysLeft] = useState(null);

//   useEffect(() => {
//     const calculateDaysLeft = () => {
//       const currentDate = new Date();
//       const [futureYear, futureMonth, futureDay] = futureDateStr.match(/\d+/g);
//       const futureDate = new Date(futureYear, futureMonth - 1, futureDay);
//       const timeDifferenceMs = futureDate - currentDate;
//       const daysLeft = Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24));
//       setDaysLeft(daysLeft);
//     };

//     calculateDaysLeft();

//     const intervalId = setInterval(calculateDaysLeft, 1000 * 60 * 60); 
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [futureDateStr]);

//   return daysLeft;
// };
// export default useDaysLeft;

