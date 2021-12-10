import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import { Paper } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';




export default function Calendar() {
    const [trainings, setTrainings] = useState([]);
    const [trainerData, setTrainerData] = useState([]);


    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(responce => responce.json())
            .then(data => setTrainings(data))

    };

    const mapData = () => {
        setTrainerData(trainings.map((t, index) => {
            const training = {};

            training.startDate = t.date;
            training.endDate = moment(t.date).add(t.duration, 'm');
            training.title = `${t.activity} / ${t.customer.firstname} ${t.customer.lastname}`;

            return training;
        }));
    }

    useEffect(() => mapData(), [trainings]);



    return (
        <div>
            <Grid xs={12}>
                <Paper>
                    <Scheduler
                        data={trainerData}
                        height={660}
                    >
                        <ViewState
                            defaultCurrentDate="2021-12-10"
                            defaultCurrentViewName="Week"
                        />

                        <DayView
                            startDayHour={8}
                            endDayHour={23}
                        />
                        <WeekView
                            startDayHour={8}
                            endDayHour={23}
                        />
                        <MonthView
                            startDayHour={8}
                            endDayHour={23}
                        />
                        <Toolbar />
                        <ViewSwitcher />
                        <DateNavigator />
                        <Appointments />
                    </Scheduler>
                </Paper>
            </Grid>
        </div >
    )
}