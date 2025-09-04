import { TextField } from "@mui/material";
import type { Street } from "../types/Street";
import type { StreetNumberData } from "../types/StreetNumber";

interface Props {
  selectedStreetNumber: number | null;
  streetNumbersData: StreetNumberData[] | null;
  selectedStreet: Street | null;
}

export function AddressInfoRow({
  selectedStreetNumber,
  streetNumbersData,
  selectedStreet,
}: Props) {


  return (
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
        className={` ${selectedStreet ? "address-confirmed" : ""}`}
        label="Poststed"
        value={selectedStreet?.city || ""}
        disabled
      />
    </div>
  );
}
