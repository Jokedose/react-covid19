import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  // PieChart,
  // Pie,
  // Cell,
} from "recharts";

import axios from "axios";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
// import { response } from "express";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  },
  confirmed: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    background: "#d81159",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  },
  recovered: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    background: "#218380",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  },
  hospitalized: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    background: "#73d2de",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  },
  deaths: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    background: "#b0b5b3",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  ctn: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // border: 0,
    // borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    // color: "white",
    // height: "100%",
    padding: "20px",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_timeline30: [],
      data_text: {
        confirmed: "",
        hospitalized: "",
        deaths: "",
        recovered: "",
        newConfirmed: "",
        newHospitalized: "",
        newDeaths: "",
        newRecovered: "",
      },
      data_lastestUpdate: "",
    };
  }

  componentDidMount() {
    this.callApi();
    this.covid19Dayly();
  }

  callApi() {
    axios
      .get(`https://covid19.th-stat.com/json/covid19v2/getTimeline.json`)
      .then((response) => {
        const data = response.data["Data"];
        // const fixedDate = data;
        // console.log(fixedDate);
        const lastData = data.slice(-1)[0];
        const lastestUpdate = response.data["UpdateDate"];
        // console.log(lastestUpdate);
        this.setState({
          data_lastestUpdate: lastestUpdate,
          data_timeline30: data.slice(1).slice(-30),
          data_text: {
            confirmed: lastData["Confirmed"],
            hospitalized: lastData["Hospitalized"],
            deaths: lastData["Deaths"],
            recovered: lastData["Recovered"],
            newConfirmed: lastData["NewConfirmed"],
            newHospitalized: lastData["NewHospitalized"],
            newDeaths: lastData["NewDeaths"],
            newRecovered: lastData["NewRecovered"],
          },
        });
      });
  }

  covid19Dayly() {}

  render() {
    const { classes } = this.props;
    const { data_text, data_timeline30, data_lastestUpdate } = this.state;
    // console.log(data_timeline30);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" className={classes.title}>
              Thailand Dashboard Covid 19
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" className={classes.ctn}>
          <Grid container>
            <Grid item xs={6} sm={10}></Grid>
            <Grid item xs={6} sm={2}>
              Lastest Update: {data_lastestUpdate}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.confirmed}>
                <Typography variant="h5">ติดเชื้อสะสม</Typography>
                <Typography variant="h3">
                  {data_text.confirmed.toLocaleString()}
                </Typography>
                <Typography variant="h5">
                  {data_text.newConfirmed.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.recovered}>
                <Typography variant="h5">หายแล้ว</Typography>
                <Typography variant="h3">
                  {data_text.recovered.toLocaleString()}
                </Typography>
                <Typography variant="h5">
                  {data_text.newRecovered.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.hospitalized}>
                <Typography variant="h5">รักษาอยู่ในโรงพยาบาล</Typography>
                <Typography variant="h3">
                  {data_text.hospitalized.toLocaleString()}
                </Typography>
                <Typography variant="h5">
                  {data_text.newHospitalized.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.deaths}>
                <Typography variant="h5">เสียชีวิตสะสม</Typography>
                <Typography variant="h3">
                  {data_text.deaths.toLocaleString()}
                </Typography>
                <Typography variant="h5">
                  {data_text.newDeaths.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    width="100%"
                    height="100%"
                    data={data_timeline30}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="NewConfirmed" fill="#d81159" />
                    <Bar dataKey="NewDeaths" fill="#b0b5b3" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    width={500}
                    height={300}
                    data={data_timeline30}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Confirmed"
                      stroke="#d81159"
                      dot={false}
                      name="ติดเชื้อสะสม"
                    />
                    <Line
                      type="monotone"
                      dataKey="Recovered"
                      stroke="#218380"
                      dot={false}
                      name="หายแล้ว"
                    />
                    <Line
                      type="monotone"
                      dataKey="Hospitalized"
                      stroke="#73d2de"
                      dot={false}
                      name="กำลังรักษาใน รพ."
                    />
                    <Line
                      type="monotone"
                      dataKey="Deaths"
                      stroke="#b0b5b3"
                      dot={false}
                      name="เสียชีวิต"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(App);
