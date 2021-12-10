import React, { useState, useEffect } from 'react';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Paper } from '@mui/material';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';
import { Button } from '@mui/material';

export default function MyChart() {
    const [trainings, setTrainings] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [activityTypes, setActivityTypes] = useState([]);
    const [activities, setActivities] = useState([]);
    const _ = require('lodash');

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(responce => responce.json())
            .then(data => setTrainings(data.content))
    };

    useEffect(() => {
        setChartData(_.chain(trainings).groupBy("activity").map((value, key) => ({ activity: key, duration: _.sumBy(value, (v) => { return v.duration }) })).value());
    }, [trainings]);



    return (<div style={{ margin: 5 }}><Paper>
        <Chart
            data={chartData}
            width={500}
            height={300}
        >
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
                valueField="duration"
                argumentField="activity"
            />
            <EventTracker />
            <HoverState />
        </Chart>
    </Paper></div>);
};