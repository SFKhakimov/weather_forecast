import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import api from '../api/api';

const useStyles = makeStyles((theme) => ({
  card: {
    zIndex: '50',
    position: 'relative',
    boxShadow: '0 0 8px rgba(255, 255, 255, .7)',
  },
  container: {
    display: 'flex',
  },
  forecastContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '40%',
  },
  expand: {
    transform: 'rotate(0deg)',
    margin: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  close: {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
  },
}));

const WeatherCard = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [loading, setLoadig] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    async function fetchWeather() {
      try {
        const current = await axios.get(
          `${api.baseUrl}/${api.current}?q=${city}&${api.metric}&${api.id}&${api.lang}`
        );
        const forecast = await axios.get(
          `${api.baseUrl}/${api.forecast}?q=${city}&${api.metric}&${api.id}&${api.lang}`
        );
        setCurrentWeather(current.data);
        setForecastWeather(forecast.data);
        setLoadig(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchWeather();
  }, [city]);

  console.log(currentWeather, forecastWeather);

  const temp = (c) => {
    const t = Math.round(c);

    if (t > 0) {
      return ` +${t}`;
    }
    if (t < 0) {
      return ` -${t}`;
    }
    if (t === 0) {
      return ` ${t}`;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const icon = (img) => img.weather[0].icon;

  return (
    <Card className={classes.card}>
      {loading ? (
        <>
          <div className={classes.container}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              title="Contemplative Reptile"
              image={`http://openweathermap.org/img/wn/${`${icon(currentWeather)}`}@2x.png`}
              className={classes.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {city}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`На улице ${temp(currentWeather.main.temp)}, ${
                  currentWeather.weather[0].description
                }`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`Влажность: ${currentWeather.main.humidity}`}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                {`Атмосферное давление: ${currentWeather.main.pressure}`}
              </Typography>
            </CardContent>
          </div>
          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div className={classes.forecastContainer}>
                {forecastWeather.list.map((weather) => {
                  return (
                    <div className={classes.container} key={weather.dt}>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        title="Contemplative Reptile"
                        image={`http://openweathermap.org/img/wn/${`${icon(weather)}`}@2x.png`}
                        className={classes.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {weather.dt_txt}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {`Температура: ${temp(weather.main.temp)}, ${
                            weather.weather[0].description
                          }`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {`Влажность: ${weather.main.humidity}`}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                          {`Атмосферное давление: ${weather.main.pressure}`}
                        </Typography>
                      </CardContent>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Collapse>
        </>
      ) : null}
    </Card>
  );
};

WeatherCard.propTypes = {
  city: PropTypes.string.isRequired,
};

export default WeatherCard;
