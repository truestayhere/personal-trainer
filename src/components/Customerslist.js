import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Grid from "@mui/material/Grid";
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton, Tooltip } from '@mui/material';


export default function Carlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [link, setLink] = useState('');

    useEffect(() => fetchData(), []);

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
    };

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(responce => responce.json())
            .then(data => setCustomers(data.content))
    };

    const updateCustomer = (customer, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
    };


    const deleteCustomer = (link) => {
        setLink(link);
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    useEffect(() => {
        if (confirm) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
            setConfirm(false);
        }
    }, [confirm])

    const action = (
        <React.Fragment>
            <Button color="error" size="small" onClick={() => setConfirm(true)}>
                DELETE
            </Button>
        </React.Fragment>
    );


    const columns = [
        {
            Header: 'First Name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress',
            width: 150
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email',
            width: 175
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            width: 110
        },
        {
            sortable: false,
            filterable: false,
            width: 45,
            accessor: 'links.0.href',
            Cell: row => <Tooltip title="Delete" placement="top"><IconButton size="small" color="warning" onClick={() => deleteCustomer(row.value)}><RemoveCircleIcon /></IconButton></Tooltip>
        },
        {
            sortable: false,
            filterable: false,
            width: 45,
            Cell: row => <EditCustomer customer={row.original} updateCustomer={updateCustomer} />
        },
    ];

    return (
        <div>
            <Grid item xs={12}>
                <AddCustomer saveCustomer={saveCustomer} />
                <ReactTable sortable={true} filterable={true} data={customers} columns={columns} />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message="Confirm delete"
                    action={action}
                />
            </Grid>
        </div>
    );
};