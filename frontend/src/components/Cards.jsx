import * as React from 'react'
import {Grid} from "@mui/material"
import Card from "./MyCard"
import Team from "../assets/images/team.png";
import Growth from "../assets/images/growth.png";
import Schedule from "../assets/images/schedule.png";

const cardInfo = {
    team: {
        img: Team,
        title: 'Team Work',
        description: 'Co-ordinate with your team, assign roles, host meetings, and many more!'
    },
    growth: {
        img: Growth,
        title: 'Better Performance',
        description: 'Get instant reports about the project progess and rate all the work in once place!'
    },
    schedule: {
        img: Schedule,
        title: 'Schedule Your Tasks',
        description: 'Schedule your tasks using a user-friendly interface and monitor the progress for all the tasks at once!'
    },
}

export default function Cards() {
    return <>
        <Grid container justifyContent="center" gap={10}>
            <Grid item lg={3} md={4} xs={12}> <Card img={cardInfo.schedule.img} title={cardInfo.schedule.title} description={cardInfo.schedule.description}/> </Grid>
            <Grid item lg={3} md={4} xs={12}> <Card img={cardInfo.growth.img} title={cardInfo.growth.title} description={cardInfo.growth.description}/> </Grid>
            <Grid item lg={3} md={4} xs={12}> <Card img={cardInfo.team.img} title={cardInfo.team.title} description={cardInfo.team.description}/> </Grid>
        </Grid>
    </>
}
