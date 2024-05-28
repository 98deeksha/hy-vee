"use client"
import { useState } from "react";
import Form from "./components/Form";

export default function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (name) => {
    setLoading(true);
    const ageResponse = await fetch(`https://api.agify.io?name=${name}`);
    const genderResponse = await fetch(`https://api.genderize.io?name=${name}`);
    const countryResponse = await fetch(
      `https://api.nationalize.io?name=${name}`
    );

    const ageData = await ageResponse.json();
    const genderData = await genderResponse.json();
    const countryData = await countryResponse.json();

    setResults({
      age: ageData.age,
      gender: genderData.gender,
      countries: countryData.country,
    });
    setLoading(false);
  };

  const handleSubmit = (name) => {
    fetchData(name);
  };

  return (
    <div>
      <h1>Guess Age, Gender, and Country</h1>
      <Form onSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      {results && (
        <div>
          <p>Age: {results.age}</p>
          <p>Gender: {results.gender}</p>
          <p>Country Predictions:</p>
          <ul>
            {results.countries.map((country) => (
              <li key={country.country_id}>
                {country.country_id} ({Math.round(country.probability * 100)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
