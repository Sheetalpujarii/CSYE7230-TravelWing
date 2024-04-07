// FlightsTab.js
import React from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import FlightTable from '../components/FlightsDetails';

function FlightsTab({ country, setCountry,destCountry, setDestinationCountry, startDate, setStartDate, endDate, setEndDate, travelers, setTravelers, flightOffers, setFlightOffers }) {

    const handleReset = () => {
        setCountry('');
        setDestinationCountry('');
        setStartDate('');
        setEndDate('');
        setTravelers('');
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleDestinationCountryChange = (event) => {
      setDestinationCountry(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleTravelersChange = (event) => {
        setTravelers(event.target.value);
    };
    const handleSearchFlights = async () => {
      const originLocationCode = country;
      const destinationLocationCode = destCountry;
      const departureDate = startDate;
      const adults = travelers;
      try {
          // Append the query parameters to the URL
          const url = `http://localhost:8080/api/v1/flights/search-flights?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}`;

          const response = await fetch(url, {
              method: 'GET', // Specify the method as GET
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          console.log(response)
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          setFlightOffers(data.data); 
      } catch (error) {
          console.error('Error fetching flights:', error);
         
      }
  };
    return (

 
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '45%' },
          '& .MuiFormControl-root': {
            m: 1, // Margin top and bottom for FormControl
            width: '45%' // Width for FormControl, you can adjust as needed
          },

        }}
        noValidate
        autoComplete="off"
      >
            <FormControl fullWidth>
              <InputLabel id="country-select-label">Select Country</InputLabel>
              <Select
                labelId="country-select-label"
                value={country}
                label="Select Country"
                onChange={handleCountryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="BOS">Boston</MenuItem>
                <MenuItem value="BLR">Bangalore</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="destination-country-select-label">Select Destination Country</InputLabel>
                <Select
                    labelId="destination-country-select-label"
                    value={destCountry}
                    label="Select Destination Country"
                    onChange={handleDestinationCountryChange}
                >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="PAR">Paris</MenuItem>
                    <MenuItem value="JFK">New York</MenuItem>
                    <MenuItem value="BKK">Bangkok</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="From"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                sx={{ width: '45%', mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="To"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                sx={{ width: '45%', mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
  
            <TextField
              label="Travelers"
              type="text"
              placeholder="Travelers"
              value={travelers}
              onChange={handleTravelersChange}
              sx={{ width: '40%', marginTop: 2 }}
            />
            <Box  sx={{ 
                 display: 'flex',
                 justifyContent: 'center',
                 '& > *': {
      width: '30%', 
      m: 2, 
    }}}>
            <Button variant="outlined" onClick={handleReset} sx={{ marginTop: 2 }}>
              Reset
            </Button>
            <Button
    variant="contained"
    sx={{ marginTop: 2 }} onClick = {handleSearchFlights}
  > Fetch Flights! </Button>
    </Box>
    {flightOffers && flightOffers.length > 0 && (
                <FlightTable flights={flightOffers} />
            )}
    </Box>
    );
}

export default FlightsTab;
