"use client";
import { useState, useEffect } from "react";
import { getCountries } from "@/app/_lib/data-service"; // Adjust import based on your project structure

function SelectCountry({ defaultCountry, className }) {
  const [countries, setCountries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchedCountries = await getCountries();
        setCountries(fetchedCountries);
        const foundFlag =
          fetchedCountries.find((country) => country.name === defaultCountry)
            ?.flag ?? "";
        setFlag(foundFlag);
      } catch (err) {}
    };

    fetchCountries();
  }, [defaultCountry]);

  const handleSelect = (country) => {
    setSelectedCountry(country.name);
    setFlag(country.flag);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        className="hidden"
        name="nationality"
        value={`${selectedCountry}%${flag}`}
        required
      />
      <button
        type="button"
        className="flex justify-between items-center  rounded-md  w-full"
        onClick={() => setIsOpen(!isOpen)}
        id="nationality"
        name="nationality"
      >
        <div className="flex items-center">
          {flag && (
            <img
              className="h-6 w-6 mr-2"
              alt={`${selectedCountry} flag`}
              src={flag}
            />
          )}
          <span>{selectedCountry || defaultCountry}</span>
        </div>
        <span className="ml-[.8rem]">&#x25BC;</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 ml-0 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="max-h-96 rounded-md overflow-auto py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {countries.map((c) => (
              <li
                key={c.name}
                className="flex items-center p-[.8rem] text-[1.4rem] hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(c)}
              >
                <img
                  className="h-[2.4rem] w-[2.4rem] mr-[.8rem]"
                  alt={`${c.name} flag`}
                  src={c.flag}
                />
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectCountry;
