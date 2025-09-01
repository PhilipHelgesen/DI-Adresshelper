import { useAddress } from "../hooks/useAdress";
import { AddressAutocompleteRow } from "./AdressAutocompleteRow";
import { AddressInfoRow } from "./AdressInfoRow";

export function AddressHelper() {
  const {
    streets,
    selectedStreet,
    selectedStreetNumber,
    streetNumbers,
    streetNumbersData,
    handleStreetSearch,
    handleSelectingStreet,
    handleSelectingStreetNumber,
  } = useAddress();

  return (
    <div className="address-container">
      <AddressAutocompleteRow
        streets={streets}
        selectedStreet={selectedStreet}
        selectedStreetNumber={selectedStreetNumber}
        streetNumbers={streetNumbers}
        handleStreetSearch={handleStreetSearch}
        handleSelectingStreet={handleSelectingStreet}
        handleSelectingStreetNumber={handleSelectingStreetNumber}
      />
      <AddressInfoRow
        selectedStreetNumber={selectedStreetNumber}
        streetNumbersData={streetNumbersData}
        selectedStreet={selectedStreet}
      />
    </div>
  );
}
