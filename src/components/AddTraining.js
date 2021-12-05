import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/lab';
import { MobileDateTimePicker } from '@mui/lab';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { formatISO } from 'date-fns';
import { MenuItem } from '@mui/material';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { Box } from '@mui/system';
import { FormControl } from '@mui/material';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({ 'date': formatISO(new Date()), 'duration': '', 'activity': '', 'customer': "" });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(responce => responce.json())
            .then(data => setCustomers(data.content))
    }, []);

    const activityTypes = [
        "Gym training",
        "Jogging",
        "Swimming session",
        "Spinning",
        "Dance class",
        "Zumba",
        "Yoga"
    ]

    const durationTypes = [
        25,
        45,
        60,
        90
    ]

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => {
        setTraining({ ...training, 'date': date });
    }

    const handleOpen = () => {
        setTraining({
            'date': '', 'duration': '', 'activity': '',
            'customer': ''
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addTraining = () => {
        props.saveTraining(training);
        setTraining({ 'date': formatISO(new Date()), 'duration': '', 'activity': '', 'customer': '' });
        handleClose();
    }

    return (
        <div style={{ margin: 1 }}>
            <Button style={{ margin: 10 }} size="small" variant="contained" color="secondary" onClick={handleOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <Box style={{ margin: 10 }}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <MobileDateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Pick date"
                                    name='date'
                                    value={training.date}
                                    onChange={(date) => handleDateChange(date)}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                    <Box style={{ margin: 10 }}>
                        <FormControl fullWidth>
                            <InputLabel id="activity">Activity</InputLabel>
                            <Select
                                labelId="activity"
                                id="select-standard"
                                name="activity"
                                value={training.activity}
                                onChange={(event) => handleInputChange(event)}
                                label="Activity"
                            >
                                <MenuItem value={training.activity}>
                                    ...
                                </MenuItem>
                                {activityTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box style={{ margin: 10 }}>
                        <FormControl fullWidth>
                            <InputLabel id="duration">Duration</InputLabel>
                            <Select
                                labelId="duration"
                                id="select-standard"
                                name="duration"
                                value={training.duration}
                                onChange={(event) => handleInputChange(event)}
                                label="Duration"
                            >
                                <MenuItem value={training.duration}>
                                    ...
                                </MenuItem>
                                {durationTypes.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box style={{ margin: 10 }}>
                        <FormControl fullWidth>
                            <InputLabel id="customer">Customer</InputLabel>
                            <Select
                                labelId="customer"
                                id="select-standard"
                                name="customer"
                                value={training.customer}
                                onChange={(event) => handleInputChange(event)}
                                label="Customer"
                            >
                                {customers.map((customer) => (
                                    <MenuItem key={customer.id} value={customer}>
                                        {customer.firstname} {customer.lastname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="small" color="primary">Cancel</Button>
                    <Button onClick={addTraining} size="small" variant="contained" color="success">Save</Button>
                </DialogActions>
            </Dialog>
        </div >
    );

}
