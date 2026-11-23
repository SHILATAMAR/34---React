import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Flavor from './component/Flavor'


function App() {

  const [flavors, setFlavors] = useState([
    { name: "Vanilla", isSoldOut: false, scoopsSelected: 0 },
    { name: "Chocolate", isSoldOut: true, scoopsSelected: 0 },
    { name: "Nogat", isSoldOut: false, scoopsSelected: 0 },
    { name: "Pistachio", isSoldOut: false, scoopsSelected: 0 }
  ]);
  const [scoopLimit, setScoopLimit] = useState(5);
  const [showOnlyAvailable, setshowOnlyAvailable] = useState(false);

  const totalScoops = flavors.reduce((sum, flavor) => {
    return sum + flavor.scoopsSelected;
  }, 0);

  function addScoop(flavorName) {
    const selectedFlavor = flavors.find((flavor) => {
      return flavor.name === flavorName;
    });

    if (!selectedFlavor.isSoldOut && totalScoops < scoopLimit) {

      setFlavors(
        flavors.map((flavor) => {
          if (flavor.name === flavorName) {
            return {
              ...flavor,
              scoopsSelected: flavor.scoopsSelected + 1
            };
          }

          return flavor;
        })
      )
    }
  }
   
  function removeScoop(flavorName){
     const selectedFlavor = flavors.find((flavor) => {
    return flavor.name === flavorName;
  });
    if (selectedFlavor.scoopsSelected > 0) {
  // כאן נעדכן את המערך
}
  }
  return (
    <>
      <h1> Ice-Cream Kiosk </h1>
      {
        flavors.map((flavor) => {
          return (
            <div key={flavor.name}>
              <h2>{flavor.name}</h2>
              <p>{flavor.scoopsSelected}</p>
              {flavor.isSoldOut && <span>Sold Out</span>}
              <button disabled={flavor.isSoldOut} onClick={() => addScoop(flavor.name)}>
                +
              </button>
            </div>
          )
        })
      }
    </>
  );

}

export default App
