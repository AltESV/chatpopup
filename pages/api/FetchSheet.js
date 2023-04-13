// import { useEffect, useState } from "react";

// export default function fetchSheet() {

//     const [faq, setFaq] = useState([])

//     useEffect(() => {
//       async function fetchData() {
//         try {
//         const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
//           const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1A79Unz4DfHwPeLPuDHYytOTHHSm9fzAdHumJrTao2tM/values/Sheet1!A:B?key=${googleKey}`);
//           const data = await response.json();
//           console.log(data);
//           setFaq(data)
//         } catch (err) {
//           console.error(err);
//         }
//       }
  
//       fetchData();
//     }, []);
  
    
//   }


