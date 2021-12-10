import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({ 'firstname': '', 'lastname': '', 'streetaddress': '', 'postcode': '', 'city': '', 'email': '', 'phone': '' });

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addCustomer = () => {
        props.saveCustomer(customer);
        setCustomer({ 'firstname': '', 'lastname': '', 'streetaddress': '', 'postcode': '', 'city': '', 'email': '', 'phone': '' });
        handleClose();
    }

    return (
        <div style={{ margin: 1 }}>
            <Button style={{ margin: 10 }} size="small" variant="contained" color="secondary" onClick={handleOpen}>
                Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={(event) => handleInputChange(event)}
                        label="Firstname"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={(event) => handleInputChange(event)}
                        label="Lastname"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={(event) => handleInputChange(event)}
                        label="Street address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={(event) => handleInputChange(event)}
                        label="Postcode"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={(event) => handleInputChange(event)}
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={(event) => handleInputChange(event)}
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={(event) => handleInputChange(event)}
                        label="Phone"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={addCustomer} variant="contained" color="success">Save</Button>
                </DialogActions>
            </Dialog>
        </div >
    );

}
