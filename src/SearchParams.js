import React, { useState, useEffect, useContext } from "react";

import useDropdown from "./useDropdown";
import Results from "./Results";

import pet from "@frontendmasters/pet";

import ThemeContext from "./ThemeContext";
import SearchContext from "./SearchContext";

export default function SearchParams() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [search, setSearch] = useContext(SearchContext);

  const [breeds, setBreeds] = useState([]);

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", search.species);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
    const { animals } = await pet.animals({
      location: search.location,
      breed,
      type: animal
    });

    setSearch({ ...search, results: animals || [] });
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      if (breeds) {
        const breedNames = breeds.map(({ name }) => name);
        setBreeds(breedNames);
      }
    }, console.error);
  }, [animal, setBreed]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={search.location}
            placeholder="location"
            onChange={e => setSearch({ ...search, location: e.target.value })}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={search.results} />
    </div>
  );
}
