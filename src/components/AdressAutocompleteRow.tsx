import { Autocomplete, TextField } from "@mui/material";
import type { Street } from "../types/Street";

interface Props {
  streets: Street[];
  selectedStreet: Street | null;
  selectedStreetNumber: number | null;
  streetNumbers: number[];
  handleStreetSearch: (event: React.SyntheticEvent, value: string) => void;
  handleSelectingStreet: (
    event: React.SyntheticEvent,
    value: Street | null
  ) => void;
  handleSelectingStreetNumber: (
    event: React.SyntheticEvent,
    value: number | null
  ) => void;
    isLoading: boolean;
}

export function AddressAutocompleteRow({
  streets,
  selectedStreet,
  selectedStreetNumber,
  streetNumbers,
  handleStreetSearch,
  handleSelectingStreet,
  handleSelectingStreetNumber,
    isLoading,
}: Props) {
  return (
    <div className="address-input-row">

      <Autocomplete
        className={`address-input ${selectedStreet ? "address-confirmed" : ""}`}
        onInputChange={handleStreetSearch}
        onChange={handleSelectingStreet}
        options={streets}
        getOptionLabel={(option) =>
          `${option.streetName.toLowerCase()}, ${option.city}`
        }
        renderInput={(params) => <TextField {...params} label="Gatenavn" />}
        forcePopupIcon={false}
        loading={isLoading}
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
  );
}
