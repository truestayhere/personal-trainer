import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Grid from "@mui/material/Grid";


export default function Carlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(responce => responce.json())
            .then(data => setCustomers(data.content))
    };

    const handleClose = (event) => {
        setOpen(false);
    };



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
            accessor: 'streetaddress'
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
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        }
    ];

    return (
        <div>
            <Grid item xs={12}>
                <ReactTable sortable={true} filterable={true} data={customers} columns={columns} />
            </Grid>
        </div>
    );
};