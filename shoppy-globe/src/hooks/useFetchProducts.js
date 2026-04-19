import { useState, useEffect } from "react";

// local names mapping - product IDs matches 
const desiNames = {
  1: { title: "Lakme Mascara", brand: "Lakme" },
  2: { title: "Lotus Eyeshadow", brand: "Lotus" },
  3: { title: "Ponds Powder", brand: "Ponds" },
  4: { title: "Sugar Lipstick", brand: "Sugar" },
  5: { title: "Elle 18 Nail Paint", brand: "Elle 18" },
  6: { title: "Titan Skinn Perfume", brand: "Titan" },
  7: { title: "Wild Stone Ittar", brand: "Wild Stone" },
  8: { title: "Fogg Body Spray", brand: "Fogg" },
  9: { title: "Park Avenue Deo", brand: "Park Avenue" },
  10: { title: "Envy Perfume", brand: "Envy" },
  11: { title: "Sleepwell Luxury Bed", brand: "Sleepwell" },
  12: { title: "Godrej Modern Sofa", brand: "Godrej" },
  13: { title: "Nilkamal Side Table", brand: "Nilkamal" },
  14: { title: "Featherlite Chair", brand: "Featherlite" },
  15: { title: "Hindware Basin", brand: "Hindware" }
};

const indianCats = {
  "beauty": "Sringar & Beauty",
  "fragrances": "Ittar & Deo",
  "furniture": "Ghar Furniture",
  "groceries": "Kirana Items"
};

const useFetchProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    // api se products lane ka function
    const fetchDuniya = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=15");
        if (!res.ok) throw new Error("Data nahi mila");
        const json = await res.json();
        
        // indian names change kar rhe yahan
        const fixedData = json.products.map(p => ({
          ...p,
          title: desiNames[p.id]?.title || p.title,
          brand: desiNames[p.id]?.brand || p.brand,
          category: indianCats[p.category] || p.category
        }));

        setData(fixedData);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDuniya();
  }, []);

  return { products: data, loading, error: err };
};

export default useFetchProducts;
