import React, {useEffect, useState} from "react";
import {
    Button,
    Card, Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup, FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import Typography from '@mui/material/Typography';

import {fetchData, postData} from "../axios/axiosHelper";
import {useData} from "../contexts/DataContext";

function SectorForm() {
    const { updateData, triggerApiCall } = useData();

    const [sector, setSector] = useState()
    const [selectedOptions, setSelectedOptions] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        selection: '',
        agree: false,
    });

    const [formErrors, setFormErrors] = useState({
        id: null,
        name: false,
        selection: false,
        agree: false,
    });

    useEffect(() => {
        fetchData('/api/sectors/all')
            .then(response => {
                console.log(response.data);
                setSector(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleOptionChange = (level, value) => {
        setSelectedOptions({
            ...selectedOptions,
            [level]: value,
        });
    };

    const renderDropdown = (options, level) => {
        const selectedValue = selectedOptions[level] || '';
        const handleDropdownChange = (event) => {
            const selectedValue = event.target.value;
            handleOptionChange(level, selectedValue);
        };

        return (
            <FormControl fullWidth variant="outlined" margin="normal" key={level}>
                <InputLabel id={`selection-label-${level}`}>Select an Option</InputLabel>
                <Select
                    labelId={`selection-label-${level}`}
                    id={`selection-${level}`}
                    value={selectedValue}
                    onChange={handleDropdownChange}
                    label={`Select an Option ${level}`}
                    required
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                {selectedValue && (
                    <div>
                        {options
                            .filter((option) => option.id === selectedValue)
                            .map((selectedOption) =>
                                selectedOption.children && selectedOption.children.length > 0 ? (
                                    renderDropdown(selectedOption.children, level + 1)
                                ) : null
                            )}
                    </div>
                )}
            </FormControl>
        );
    };





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
        formData.selection = selectedOptions
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
            if (!formData.id) {
                postData('/api/record/add', formData).then(res => {
                    setFormData({
                        name: res.data.name,
                        selection: res.data.selection,
                        agree: res.data.agree,
                        id: res.data.id
                    });
                    updateData(res.data.id)
                    triggerApiCall()
                    alert('Added Successfully!')
                });
            } else {
                postData('/api/record/update', formData).then(res => {
                    setFormData({
                        name: res.data.name,
                        selection: res.data.selection,
                        agree: res.data.agree,
                        id: res.data.id
                    });
                    updateData(res.data.id)
                    triggerApiCall()

                    alert('Updated Successfully!')
                });
            }

            console.log('Form submitted:', formData);
            // Reset form data

        }


    };

    return (
        <Card sx={{padding: '20px', minWidth: "300px", width: "100%"}}>
            <Typography variant="h5" component="div">
                { formData.id ? "Edit" : "Add"} Profile
            </Typography>
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
                {renderDropdown(sector, 1)}

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
    );
}

export default SectorForm;