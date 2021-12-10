import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import AddTraining from './AddTraining';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton, Tooltip } from '@mui/material';


export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [link, setLink] = useState('');


    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(responce => responce.json())
            .then(data => setTrainings(data))
    };

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    date: training.date,
                    activity: training.activity,
                    duration: training.duration,
                    customer: training.customer.links[0].href
                })
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
    };

    const deleteTraining = (id) => {
        setLink(`https://customerrest.herokuapp.com/api/trainings/${id}`);
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
            Header: 'Date',
            id: 'date',
            width: 160,
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
            width: 115,
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            width: 150,
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            width: 150,
            id: 'customer',
            accessor: (row) => `${row.customer.firstname} ${row.customer.lastname}`
        },
        {
            sortable: false,
            filterable: false,
            width: 45,
            accessor: 'id',
            Cell: row => <Tooltip title="Delete" placement="right"><IconButton size="small" color="warning" onClick={() => deleteTraining(row.value)}><RemoveCircleIcon /></IconButton></Tooltip>
        },
    ];

    return (
        <div>
            <Grid item xs={12}>
                <AddTraining saveTraining={saveTraining} />
                <ReactTable sortable={true} filterable={true} data={trainings} columns={columns} />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message="Confirm delete"
                    action={action}
                />
            </Grid>
        </div >
    );
};