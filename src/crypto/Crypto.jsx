import React, { useState, useEffect } from 'react';

const Crypto = () => {
  const [cInput, setCInput] = useState('');
  const [cList, setCList] = useState(['Dogecoin']);

  const searchButton = () => {
    const cName = cInput.toUpperCase();
    if (!cList.includes(cName)) {
      addList(cName);
    }
  };

  const addList = (cName) => {
    const BASE_URL = `https://min-api.cryptocompare.com/data/price?fsym=${cName}&tsyms=USD&api_key=YOUR_API_KEY`;

    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        setCList((prevList) => [...prevList, cName]);
        setInterval(() => refreshCrypto(cName), 5000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const refreshCrypto = (cName) => {
    const BASE_URL = `https://min-api.cryptocompare.com/data/price?fsym=${cName}&tsyms=USD&api_key=YOUR_API_KEY`;

    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        const currentPrice = parseFloat(data.USD);
        const listItem = document.getElementById(cName);

        if (listItem) {
          const previousPrice = parseFloat(listItem.textContent.split(': $')[1]);

          if (currentPrice > previousPrice) {
            listItem.style.color = 'green';
          } else if (currentPrice < previousPrice) {
            listItem.style.color = 'red';
          } else {
            listItem.style.color = 'black';
          }

          listItem.textContent = `${cName}: $${currentPrice}`;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    refreshCrypto('Dogecoin');
  }, []);

 return (
   <div className="flex justify-center items-center h-screen">
     <div className="w-full max-w-md p-4">
       <input
         type="text"
         id="cInput"
         className="w-full border rounded-md py-2 px-3 mb-2 focus:outline-none focus:border-blue-500"
         placeholder="Kriptovalyuta nomini kiriting"
         value={cInput}
         onChange={(e) => setCInput(e.target.value)}
       />
       <button
         className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         onClick={searchButton}
       >
         Izlash
       </button>

       <ul className="mt-4">
         {cList.map((cName) => (
           <li key={cName} id={cName} className="text-lg py-1">
             {cName}: $0.00
           </li>
         ))}
       </ul>
     </div>
   </div>
 );

};

export default Crypto;