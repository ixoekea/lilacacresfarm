const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Vegetables = () => {
  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    const fetchVegetables = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "vegetables"));
      setVegetables(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchVegetables();
  }, []);

  return (
    <div>
      {vegetables.map((veg) => (
        <div key={veg.id}>
          <img src={veg.image} alt={veg.name} width="100" />
          <h3>{veg.name}</h3>
          <p>${veg.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Vegetables;
