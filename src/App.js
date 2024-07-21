import React, { useState, useEffect } from "react";
import "./index.css";

const surahNames = [
  "Al-Fatihah",
  "Al-Baqarah",
  "Aali Imran",
  "An-Nisa'",
  "Al-Ma'idah",
  "Al-An'am",
  "Al-A'raf",
  "Al-Anfal",
  "At-Tawbah",
  "Yunus",
  "Hud",
  "Yusuf",
  "Ar-Ra'd",
  "Ibrahim",
  "Al-Hijr",
  "An-Nahl",
  "Al-Isra'",
  "Al-Kahf",
  "Maryam",
  "Ta-Ha",
  "Al-Anbiya'",
  "Al-Hajj",
  "Al-Mu'minun",
  "An-Nur",
  "Al-Furqan",
  "Ash-Shu'ara'",
  "An-Naml",
  "Al-Qasas",
  "Al-Ankabut",
  "Ar-Rum",
  "Luqman",
  "As-Sajda",
  "Al-Ahzab",
  "Saba'",
  "Fatir",
  "Ya-Sin",
  "As-Saffat",
  "Sad",
  "Az-Zumar",
  "Ghafir",
  "Fussilat",
  "Ash-Shura",
  "Az-Zukhruf",
  "Ad-Dukhan",
  "Al-Jathiya",
  "Al-Ahqaf",
  "Muhammad",
  "Al-Fath",
  "Al-Hujurat",
  "Qaf",
  "Adh-Dhariyat",
  "At-Tur",
  "An-Najm",
  "Al-Qamar",
  "Ar-Rahman",
  "Al-Waqi'a",
  "Al-Hadid",
  "Al-Mujadila",
  "Al-Hashr",
  "Al-Mumtahina",
  "As-Saff",
  "Al-Jumu'a",
  "Al-Munafiqun",
  "At-Taghabun",
  "At-Talaq",
  "At-Tahrim",
  "Al-Mulk",
  "Al-Qalam",
  "Al-Haqqa",
  "Al-Ma'arij",
  "Nuh",
  "Al-Jinn",
  "Al-Muzzammil",
  "Al-Muddathir",
  "Al-Qiyama",
  "Al-Insan",
  "Al-Mursalat",
  "An-Naba'",
  "An-Nazi'at",
  "Abasa",
  "At-Takwir",
  "Al-Infitar",
  "Al-Mutaffifin",
  "Al-Inshiqaq",
  "Al-Buruj",
  "At-Tariq",
  "Al-A'la",
  "Al-Ghashiya",
  "Al-Fajr",
  "Al-Balad",
  "Ash-Shams",
  "Al-Layl",
  "Ad-Duha",
  "Ash-Sharh",
  "At-Tin",
  "Al-Alaq",
  "Al-Qadr",
  "Al-Bayyina",
  "Az-Zalzala",
  "Al-Adiyat",
  "Al-Qari'a",
  "At-Takathur",
  "Al-Asr",
  "Al-Humaza",
  "Al-Fil",
  "Quraysh",
  "Al-Ma'un",
  "Al-Kawthar",
  "Al-Kafirun",
  "An-Nasr",
  "Al-Masad",
  "Al-Ikhlas",
  "Al-Falaq",
  "An-Nas",
];

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
  const [surahName, setSurahName] = useState("");
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const randomNumber = Math.floor(Math.random() * 604) + 1;

  useEffect(() => {
    const url = `http://api.alquran.cloud/v1/page/${randomNumber}/quran-uthmani`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const result = await response.json();
        setPage(result.data.ayahs);
        setSurahName(result.data.ayahs[0].surah.englishName);
      } catch (error) {
        setError(`Fetch error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function checkGuess(value) {
    if (value === surahName) {
      console.log(value, "is correct");
      setGuess1("correct");
      setGuess2("incorrect");
      setGuess3("incorrect");
    }
  }

  return (
    <div>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {page &&
        page.map((ayah, index) => {
          return <li key={index}>{ayah.text}</li>;
        })}
      <h3>Which surah is this?</h3>
      <button
        className={guess1}
        value={surahName}
        onClick={(e) => checkGuess(e.target.value)}
      >
        {surahName}
      </button>
      <button className={guess2}>
        {surahNames[Math.floor(Math.random() * surahNames.length)]}
      </button>
      <button className={guess3}>
        {surahNames[Math.floor(Math.random() * surahNames.length)]}
      </button>
    </div>
  );
}

export default App;
