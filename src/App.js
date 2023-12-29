import "./App.css"
import React, {useEffect, useState} from 'react';
import {Card} from "@mui/material";
import { fetchData , postData} from "./axios/axiosHelper";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button,
    FormGroup,
    FormHelperText,
    Container,
} from '@mui/material';

function App() {
    useEffect(() => {
        fetchData('/api/sectors/all')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        selection: '',
        agree: false,
    });

    const [formErrors, setFormErrors] = useState({
        name: false,
        selection: false,
        agree: false,
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
        setFormErrors({...formErrors, [event.target.name]: false});
    };

    const handleAgreeChange = (event) => {
        setFormData({...formData, agree: event.target.checked});
        setFormErrors({...formErrors, agree: false});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = false;

        if (formData.name === '') {
            setFormErrors({...formErrors, name: true});
            errors = true;
        }

        if (formData.selection === '') {
            setFormErrors({...formErrors, selection: true});
            errors = true;
        }

        if (!formData.agree) {
            setFormErrors({...formErrors, agree: true});
            errors = true;
        }

        if (!errors) {
            // Form submission logic can go here
            console.log('Form submitted:', formData);
            // Reset form data
            setFormData({name: '', selection: '', agree: false});
        }
    };

    return (
        <div className={"main-bg"}>
            <Container maxWidth="sm" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Optional: set a minimum height for the container
            }}>
                <Card sx={{padding: '20px', minWidth: "300px"}}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={formErrors.name}
                            helperText={formErrors.name ? 'Name is required' : ''}
                            fullWidth
                            margin="normal"

                        />
                        <FormControl fullWidth variant="outlined" margin="normal" error={formErrors.selection}>
                            <InputLabel id="selection-label">Select an Option</InputLabel>
                            <Select
                                labelId="selection-label"
                                id="selection"
                                name="selection"
                                value={formData.selection}
                                onChange={handleChange}
                                label="Select an Option"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Option 1">Option 1</MenuItem>
                                <MenuItem value="Option 2">Option 2</MenuItem>
                                <MenuItem value="Option 3">Option 3</MenuItem>
                            </Select>
                            {formErrors.selection && <FormHelperText>Please select an option</FormHelperText>}
                        </FormControl>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.agree}
                                        onChange={handleAgreeChange}
                                        name="agree"
                                        color="primary"

                                    />
                                }
                                label="Agree to terms"
                            />
                            {formErrors.agree && (
                                <FormHelperText error>Please agree to the terms</FormHelperText>
                            )}
                        </FormGroup>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </Card>
            </Container>
        </div>
    );
}

export default App;
