import { Autocomplete, TextField } from "@mui/material";

function App() {
  return (
    <>
      <div className="address-container">
        <Autocomplete
          className=""
          options={[]}
          renderInput={(params) => <TextField {...params} label="Gatenavn" />}
        />
      </div>
    </>
  );
}

export default App;
