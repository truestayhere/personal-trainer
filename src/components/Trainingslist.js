import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";


export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(responce => responce.json())
            .then(data => setTrainings(data.content))
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const fetchCustomer = (link) => {
        fetch(link, { method: 'GET' })
            .then(responce => responce.json())
            .then(data => setCustomer(data))
            .catch(err => console.error(err))
    };

    const findCustomer = (link) => {
        fetchCustomer(link);
    }



    const columns = [
        {
            Header: 'Date',
            id: 'date',
            width: 150,
            accessor: (row) => moment(row.date).format('LL')
        },
        {
            Header: 'Time',
            id: 'time',
            width: 100,
            accessor: (row) => moment(row.date).format('LT')
        },
        {
            Header: 'Duration(min)',
            width: 120,
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            width: 150,
            accessor: 'activity'
        },
        {
            sortable: false,
            filterable: false,
            width: 150,
            id: 'customer',
            accessor: 'links[2].href',
            Cell: row => <Button variant="outlined" size="small" color="secondary" >Show customer</Button>
        }
    ];

    return (
        <div>
            <Grid item xs={12}>
                <ReactTable sortable={true} filterable={true} data={trainings} columns={columns} />
            </Grid>
        </div >
    );
};