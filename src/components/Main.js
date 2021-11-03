import { Button, Typography } from '@mui/material';
import React from 'react';
import Grid from "@mui/material/Grid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Trainingslist from './Trainingslist';
import Customerslist from './Customerslist';


export default function Main() {


    return (
        <div>
            <Grid container xs={12} spacing={0}
                justifyContent="center" style={{ minHeight: '100vh' }}>
                <Router>
                    <div>
                        <Link to="/customerslist"><Button rounded color="secondary" idleText="Customers list">Customers list</Button></Link>{' '}
                        <Link to="/trainingslist"><Button rounded color="secondary" idleText="Trainings list">Trainings list</Button></Link>{' '}
                        <Switch>
                            <Route path="/customerslist" component={Customerslist} />
                            <Route path="/trainingslist" component={Trainingslist} />
                            <Route render={() => <div><Grid item xs={12}>
                                <Typography variant='h4' color='text.v1'>Welcome to the Personal Trainer App</Typography>
                            </Grid></div>} />
                        </Switch>
                    </div>
                </Router>
            </Grid>
        </div >
    )
}