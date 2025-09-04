import { useAddress } from "../hooks/useAdress";
import { AddressAutocompleteRow } from "./AdressAutocompleteRow";
import { AddressInfoRow } from "./AdressInfoRow";
import Map from "./Map";

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
      isLoading,
  } = useAddress();

  const selectedStreetNumberData = streetNumbersData?.find((streetData) => streetData.streetNo === selectedStreetNumber);

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
        isLoading={isLoading}
      />
      <AddressInfoRow
        selectedStreetNumber={selectedStreetNumber}
        streetNumbersData={streetNumbersData}
        selectedStreet={selectedStreet}
      />
        {selectedStreetNumberData && (
            <Map posix={[selectedStreetNumberData.latitude, selectedStreetNumberData.longitude]} zoom={19} />
        )}


    </div>
  );
}
