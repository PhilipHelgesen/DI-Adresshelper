import { useState } from "react";
import type { Street, StreetResponse } from "../types/Street";
import type { StreetNumberData, StreetNumberResponse } from "../types/StreetNumber";

export function useAddress() {
  const [streets, setStreets] = useState<Street[]>([]);
  const [selectedStreet, setSelectedStreet] = useState<Street | null>(null);
  const [selectedStreetNumber, setSelectedStreetNumber] = useState<
    number | null
  >(null);
  const [streetNumbers, setStreetNumbers] = useState<number[]>([]);
  const [streetNumbersData, setStreetNumbersData] = useState<
    StreetNumberData[] | null
  >(null);

  const handleStreetSearch = async (
    _event: React.SyntheticEvent,
    value: string
  ) => {
    console.log(value);
    if (value.length < 2) return;

    try {
      const res = await fetch(
        `https://staging-ws.di.no/ws/json/addressHelper/v-2/NO/streetSearch/${value}?apiKey=${import.meta.env.VITE_API_KEY
        }`,
        { headers: { referer: "http://localhost:5173" } }
      );

      const data: StreetResponse = await res.json();
      setStreets(data.streets);
    } catch (error) {
      console.error("Failed to fetch streets:", error);
      setStreets([]);
    }
  };

  const handleSelectingStreet = async (
    _event: React.SyntheticEvent,
    value: Street | null
  ) => {
    setSelectedStreet(value);

    setSelectedStreetNumber(null);
    setStreetNumbers([]);

    if (!value) {
      setStreetNumbers([]);
      return;
    }

    const streetIds = value.streetIds.join(",");
    try {
      const res = await fetch(
        `https://staging-ws.di.no/ws/json/addressHelper/v-2/NO/streetNumberSearch/${streetIds}?apiKey=${import.meta.env.VITE_API_KEY
        }`,
        { headers: { referer: "http://localhost:5173" } }
      );

      const data: StreetNumberResponse = await res.json();

      const uniqueNumbers = Array.from(
        new Set(data.streetNumbers.map((streetNr) => streetNr.streetNo))
      );

      setStreetNumbersData(data.streetNumbers);

      setStreetNumbers(uniqueNumbers);
    } catch (error) {
      console.error("Failed to fetch street numbers:", error);
      setStreetNumbers([]);
    }
  };

  const handleSelectingStreetNumber = (
    _event: React.SyntheticEvent,
    value: number | null
  ) => {
    setSelectedStreetNumber(value);
  };

  return {
    streets,
    selectedStreet,
    selectedStreetNumber,
    streetNumbers,
    streetNumbersData,
    handleStreetSearch,
    handleSelectingStreet,
    handleSelectingStreetNumber,
  };
}
