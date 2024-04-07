import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box,Typography,  TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useUserAuth } from '../context/UserAuthContext'; // Adjust the path as necessary



function ItineraryTab({ country, setCountry, startDate, setStartDate, endDate, setEndDate, travelers, setTravelers, source, setSource, itinerary, setItinerary,setPace, pace, setIsGenerating, isGenerating }) {

  const [save, setSave] = useState(false);
  const [error, setError] = useState("");


  const { user } = useUserAuth(); // Assuming `user` object includes `email` field
  const navigate = useNavigate();

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
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

    const handleSourceChange = (event) => {
        setSource(event.target.value);
    };
    const handlePaceChange = (event) => {
        setPace(event.target.value);
    };


    const handleGenerate = async () => {
         setError(""); 
        if (!country || !startDate || !endDate || !pace || !travelers) {
            const missingFields = [
              country ? null : 'country',
              startDate ? null : 'start date',
              endDate ? null : 'end date',
              pace ? null : 'pace',
              travelers ? null : 'travelers',
            ].filter(Boolean).join(', ');
            
            setItinerary(``);
            setError('Please check and provide the missing details');

            return; // Exit the function if validation fails
          }

        try {
        
          setIsGenerating(true);
          const apiEndpoint = 'http://localhost:8080/api/v1/generateItinerary';
          const requestBody = {
            source: source, // Assuming 'source' is a fixed value as per your curl command
            destination: country, // assuming country is the state variable for destination
            startDate: startDate, // assuming startDate is the state variable for startDate
            endDate: endDate, // assuming endDate is the state variable for endDate
            pace: pace, // assuming pace is fixed as per your curl command
            travelers: travelers, // assuming travelers is the state variable for number of travelers
          };
    
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
        
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setItinerary(data.itinerary.content); // assuming the response has a key 'generatedItinerary'
          } else {
            console.error('Response error:', data);
            setItinerary('');
            setError('An error occurred while generating the itinerary. Please try again.');

          }
        } catch (error) {
          console.error('Request failed:', error);
          setItinerary('');
          setError('An error occurred while generating the itinerary. Please try again.');

        }
        finally {
            setIsGenerating(false); // Stop loading regardless of outcome
        }
    
    };
      
    const handleReset = () => {
        setCountry('');
        setStartDate('');
        setEndDate('');
        setTravelers('');
        setItinerary('');
        setPace('');
        setSave(false);
    };

    const handleSave = async () => {
      setError(""); 
      // Check if user is logged in and has an email
      if (!user || !user.email) {
        navigate('/login'); // Redirect to login if no user or user email is found
        return;
      }
  

      if(!itinerary) {
        setError('Please generate the itineraray!');
         return;
      }
      try {
        setSave(true); // Indicate loading state
        
        const apiEndpoint = 'http://localhost:8080/api/v1/createItinerary';
        const requestBody = {
          source: source,
          destination: country,
          startDate: startDate,
          endDate: endDate,
          pace: pace,
          travelers: travelers,
          email: user.email, // Use the user's email from context
          generatediItinerary: itinerary, // Assuming this is the correct field name
        };
  
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.status===201) {
          const data = await response.json();
          console.log("Itinerary saved successfully", data);
          // Handle successful save, maybe set some state or show a message
        } else {
          // Handle API errors (e.g., display an error message)
          console.error("Failed to save itinerary");
          setError('An error occurred while generating the itinerary. Please try again.');

        }
      } catch (error) {
        console.error("An error occurred while saving the itinerary:", error);
        setError('An error occurred while generating the itinerary. Please try again.');

        // Handle general errors (e.g., network issues)
      } finally {
        setSave(false); // Reset loading state
      }
    };
  
    return (
<Grid container spacing={2}>

{error && (
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: "error.main", color: "error.contrastText", p: 2, borderRadius: 1 }}>
          <Typography textAlign="center">{error}</Typography>
        </Box>
      </Grid>
    )}

      <Grid item xs={6}>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '45%' },
          '& .MuiFormControl-root': {
            m: 1, // Margin top and bottom for FormControl
            width: '45%' // Width for FormControl, you can adjust as needed
          },
        }}
        noValidate
        autoComplete="off"
      >


          <FormControl fullWidth>
              <InputLabel id="country-select-label">Source</InputLabel>
              <Select
                labelId="country-select-label"
                value={source}
                label="Select Source"
                onChange={handleSourceChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Boston">Boston</MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth>
              <InputLabel id="country-select-label">Select Destination</InputLabel>
              <Select
                labelId="country-select-label"
                value={country}
                label="Select Destination"
                onChange={handleCountryChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Paris">Paris</MenuItem>
                <MenuItem value="Newyork">Newyork</MenuItem>
              </Select>
            </FormControl>
            <TextField
                label="From"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="To"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
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

<FormControl fullWidth>
              <InputLabel id="country-select-label">Select Pace</InputLabel>
              <Select
                labelId="country-select-label"
                value={pace}
                label="Select Pace"
                onChange={handlePaceChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="medium">medium</MenuItem>
                <MenuItem value="slow">slow</MenuItem>
                <MenuItem value="fast">fast</MenuItem>
              </Select>
            </FormControl>
            <Box  sx={{ 
                 display: 'flex',
                 justifyContent: 'center',
                 '& > *': {
      width: '30%', 
      m: 2, 
    }}}>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
            <Button
    variant="contained"
    onClick={handleGenerate}
    disabled={isGenerating}
  >
    {isGenerating ? <CircularProgress size={24} /> : "Generate"}
  </Button>
            </Box>
    </Box>
    </Grid>
<Grid item xs={6}>

    <div className="itinerary-display">
          {itinerary && (
    <Box>
      {itinerary.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Box>
  )}
  
    </div>
    <Box  sx={{ 
                 display: 'flex',
                 justifyContent: 'center',
                 '& > *': { 
      width: '30%', 
      m: 2, 
    }}}>
          <Button variant="contained" 
          sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }} 
          onClick={handleSave}
          disabled={save}
          >
                {save ? <CircularProgress size={24} /> : "Save"}

          </Button>
          </Box>

    
  </Grid>
</Grid>

    );
}

export default ItineraryTab;
