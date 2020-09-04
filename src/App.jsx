import React, { useState } from 'react';
import { List, ListItem, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WeatherCard from './components/WeatherCard';
import Overlay from './components/Overlay';

const useStyles = makeStyles({
  container: {
    marginTop: '40px',
  },
});

const App = () => {
  const [visible, setVisible] = useState(false);
  const [cityWeather, setCityWeather] = useState('');

  const cites = ['Москва', 'Санкт-Петербург', 'Казань'];
  const classes = useStyles();

  const visibleHandler = () => {
    setVisible(false);
  };

  const openCard = (city) => {
    setVisible(true);
    setCityWeather(city);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <List>
        {cites.map((city) => {
          return (
            <ListItem key={city}>
              <Button onClick={() => openCard(city)}>{city}</Button>
            </ListItem>
          );
        })}
      </List>
      {visible === false ? null : (
        <>
          <Overlay onClick={visibleHandler} />
          <WeatherCard city={cityWeather} />
        </>
      )}
    </Container>
  );
};

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default app;
