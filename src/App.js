import React, { useState, useEffect } from "react";

function Header() {
  return (
    <>
      <header>Qur'an Page Guesser</header>
      <h2>Guess which page this surah is from</h2>
    </>
  );
}

function App() {
  const [guess1, setGuess1] = useState("");
  const [guess2, setGuess2] = useState("");
  const [guess3, setGuess3] = useState("");
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const randomNumber = Math.floor(Math.random() * 604) + 1;

  useEffect(() => {
    const url = `http://api.alquran.cloud/v1/page/${randomNumber}/quran-uthmani`;

    const fetchData = async () => {
      try {
        console.log("Fetching data from:", url); // Log the URL for debugging
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const result = await response.json();
        console.log(result.data.ayahs); // Log the API response
        setPage(result.data.ayahs); // Adjust based on actual response structure
      } catch (error) {
        setError(`Fetch error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {page &&
        page.map((ayah, index) => {
          return <li key={index}>{ayah.text}</li>;
        })}
    </div>
  );
}

export default App;
