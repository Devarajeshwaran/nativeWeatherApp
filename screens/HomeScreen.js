import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { API_KEY } from '../utils/WeatherAPIKey';

import Weather from '../components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weather: null,
    location: null,
    country: null,
    feelsLike: null,
    currentDateTime: null,
    minTemp: null,
    maxTemp: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: Math.trunc(json.main.temp),
          weather: json.weather[0].main,
          location: json.name,
          country: json.sys.country,
          feelsLike: Math.trunc(json.main.feels_like),
          currentDateTime: json.dt,
          minTemp: Math.trunc(json.main.temp_min),
          maxTemp: Math.trunc(json.main.temp_max),
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather</Text> : 
          <Weather props={this.state} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});