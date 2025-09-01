import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

interface Street {
  countryCode: string;
  city: string;
  streetName: string;
  streetIds: number[];
}

function App() {
  const [streets, setStreets] = useState<Street[]>([]);

  const handleStreetSearch = async (
    _event: React.SyntheticEvent,
    value: string
  ) => {
    console.log(value);
    if (value.length < 2) return;

    const res = await fetch(
      `https://staging-ws.di.no/ws/json/addressHelper/v-2/NO/streetSearch/${value}?apiKey=${
        import.meta.env.VITE_API_KEY
      }`,
      { headers: { referer: "http://localhost:5173" } }
    );

    const data = await res.json();

    setStreets(data.streets);
  };

  return (
    <>
      <div className="address-container">
        <Autocomplete
          onInputChange={handleStreetSearch}
          options={streets}
          getOptionLabel={(option) => option.streetName}
          renderInput={(params) => <TextField {...params} label="Gatenavn" />}
          forcePopupIcon={false}
        />
      </div>
    </>
  );
}

export default App;
