import { useState } from 'react'
import './App.css'


function App() {

  const [flavors, setFlavors] = useState([
    { name: "Vanilla", isSoldOut: false, scoopsSelected: 0 },
    { name: "Chocolate", isSoldOut: true, scoopsSelected: 0 },
    { name: "Nogat", isSoldOut: false, scoopsSelected: 0 },
    { name: "Pistachio", isSoldOut: false, scoopsSelected: 0 }
  ]);
  const [scoopLimit, setScoopLimit] = useState(5);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const totalScoops = flavors.reduce((sum, flavor) => {
    return sum + flavor.scoopsSelected;
  }, 0);

  const totalPrice = totalScoops * 5;

  const visibleFlavors = showOnlyAvailable ? flavors.filter((flavor) => {
    return !flavor.isSoldOut;

  }) : flavors;

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

  function removeScoop(flavorName) {
    const selectedFlavor = flavors.find((flavor) => {
      return flavor.name === flavorName;
    });
    if (selectedFlavor.scoopsSelected > 0) {
      setFlavors(
        flavors.map((flavor) => {
          if (flavor.name === flavorName) {
            return {
              ...flavor,
              scoopsSelected: flavor.scoopsSelected - 1
            };
          }

          return flavor;
        })
      )
    }
  }


  return (
    <>
      <h1> Ice-Cream Kiosk </h1>
      <label>
        <input
          type="checkbox"
          checked={showOnlyAvailable}
          onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
        />
        Show only available
      </label>
      {showOnlyAvailable && visibleFlavors.length === 0 && (
        <p>No flavors to show</p>
      )}
      {
        visibleFlavors.map((flavor) => {
          return (
            <div key={flavor.name}>
              <h2>{flavor.name}</h2>
              <p>{flavor.scoopsSelected}</p>

              {flavor.isSoldOut && <span>Sold Out</span>}

              <button disabled={flavor.isSoldOut} onClick={() => addScoop(flavor.name)}>
                +
              </button>
              <button
                disabled={flavor.isSoldOut || flavor.scoopsSelected === 0}
                onClick={() => removeScoop(flavor.name)}
              >
                -
              </button>
            </div>
          )
        })
      }
      <div>
        <h2>Order Summary</h2>
        <p>Total scoops: {totalScoops}</p>
        <p>Total price: ${totalPrice}</p>

        {totalScoops === 0 && <p>Your order is empty</p>}
      </div>
      {totalScoops >= scoopLimit && (
        <p>Scoop limit reached!</p>
      )}

    </>
  );

}

export default App
