import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    // Load countries from an API or static data
    setCountries([
      { label: 'USA', value: 'usa' },
      { label: 'India', value: 'india' },
      { label: 'Australia', value: 'australia' }
    ]);
    // Default country could be set here (optional)
    setSelectedCountry('usa'); // Setting default or initial country
  }, []);

  useEffect(() => {
    // Load states based on selected country from an API or static data
    if (selectedCountry === 'usa') {
      setStates([
        { label: 'California', value: 'california' },
        { label: 'Texas', value: 'texas' }
      ]);
    } else if (selectedCountry === 'india') {
      setStates([
        { label: 'Delhi', value: 'delhi' },
        { label: 'Maharashtra', value: 'maharashtra' }
      ]);
    } else {
      setStates([]); // Clear states if country changes to one without specific states handled
    }
  }, [selectedCountry]);

  const handleStateSelect = (value) => {
    setSelectedState(value);
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: `Selected State: ${value}`,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40
    });
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedCountry(value)}
        items={countries}
        placeholder={{ label: 'Select a country', value: null }}
        value={selectedCountry}
      />
      <RNPickerSelect
        onValueChange={handleStateSelect}
        items={states}
        placeholder={{ label: 'Select a state', value: null }}
        disabled={!selectedCountry}
        value={selectedState}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default App;
