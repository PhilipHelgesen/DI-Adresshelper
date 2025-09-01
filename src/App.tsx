import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

interface Street {
  countryCode: string;
  city: string;
  streetName: string;
  streetIds: number[];
}

interface StreetNumberData {
  streetNo: number;
  addressId: number;
  entrance: string;
  houseType: string;
  deliveryPointId: number;
  postalCode: string;
  duplicateNumberAndEntrance: boolean;
  latitude: number;
  longitude: number;
  showHouseholds: boolean;
}

interface StreetNumberResponse {
  streetNumbers: StreetNumberData[];
}

function App() {
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
        `https://staging-ws.di.no/ws/json/addressHelper/v-2/NO/streetSearch/${value}?apiKey=${
          import.meta.env.VITE_API_KEY
        }`,
        { headers: { referer: "http://localhost:5173" } }
      );

      const data = await res.json();
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

    if (!value) {
      setStreetNumbers([]);
      return;
    }

    const streetIds = value.streetIds.join(",");
    try {
      const res = await fetch(
        `https://staging-ws.di.no/ws/json/addressHelper/v-2/NO/streetNumberSearch/${streetIds}?apiKey=${
          import.meta.env.VITE_API_KEY
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

  return (
    <>
      <div className="address-container">
        <div className="address-input-row">
          <Autocomplete
            className={`address-input ${
              selectedStreet ? "address-confirmed" : ""
            }`}
            onInputChange={handleStreetSearch}
            onChange={handleSelectingStreet}
            options={streets}
            getOptionLabel={(option) =>
              `${option.streetName.toLowerCase()}, ${option.city}`
            }
            renderInput={(params) => <TextField {...params} label="Gatenavn" />}
            forcePopupIcon={false}
          />
          <Autocomplete
            className={`address-input-number ${
              selectedStreetNumber ? "address-confirmed" : ""
            }`}
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => <TextField {...params} label="GateNr." />}
            options={streetNumbers}
            forcePopupIcon={false}
            onChange={handleSelectingStreetNumber}
            value={selectedStreetNumber}
          />
        </div>
        <div className="address-input-row">
          <TextField
            className={` ${selectedStreetNumber ? "address-confirmed" : ""}`}
            label="PostNr."
            value={
              streetNumbersData?.find(
                (item) => item.streetNo === selectedStreetNumber
              )?.postalCode || ""
            }
            disabled
          />

          <TextField
            className={` ${selectedStreetNumber ? "address-confirmed" : ""}`}
            label="Poststed"
            value={selectedStreet?.city || ""}
            disabled
          />
        </div>
      </div>
    </>
  );
}

export default App;
