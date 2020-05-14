import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ props }) => {
  const {weather, temperature, location, country, feelsLike, currentDateTime, minTemp, maxTemp} = props;
  if (weather != null) {
    return (
      <View
        style={[
          styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color }
        ]}
      >
        <View>
          <Text style={styles.locationText}>{location}, {country}</Text>
        </View>
        <View>
          <Text style={styles.dateText}>
            {currentDate(currentDateTime)}
          </Text>
        </View>
        <View>
          <Text style={styles.timeText}>
            {currentTime(currentDateTime)}
          </Text>
        </View>
        <View style={styles.maxMinTempContainer}>
          <Text style={styles.maxMinTemp}>Max {maxTemp}˚</Text>
          <MaterialCommunityIcons
            size={20}
            name={'arrow-up'}
            color={'#fff'}
            style={{marginRight: 10}}
          />
          <Text style={styles.maxMinTemp}>Min {minTemp}˚</Text>
          <MaterialCommunityIcons
            size={20}
            name={'arrow-down'}
            color={'#fff'}
            style={{marginRight: 10}}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.tempText}>{temperature}˚</Text>
          <MaterialCommunityIcons
            size={120}
            name={weatherConditions[weather].icon}
            color={'#fff'}
            style={{marginBottom: 25, marginRight: 40}}
          />
        </View>
        <View>
          <Text style={styles.feelsLikeText}>Feels like {feelsLike}˚</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Oh no, something went wrong</Text>
      </View>
    )
  };
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  feelsLike: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 52,
    color: '#fff',
    marginRight: 'auto',
    marginBottom: 40,
    marginLeft: 5
  },
  locationText: {
    fontSize: 27,
    color: '#fff',
    marginLeft: 10,
    marginTop: 20
  },
  dateText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
    marginTop: 20
  },
  timeText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
    marginTop: 5
  },
  feelsLikeText: {
    fontSize: 17,
    color: '#fff',
    marginLeft: 10,
    marginTop: -40
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  },
  maxMinTempContainer: {
    display: 'inline',
    marginTop: 20
  },
  maxMinTemp: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 10
  }
});

function currentDate(currentDateTime) {
  var myDatetimeString = moment.unix(currentDateTime).format('dddd, MMMM Do')
  return myDatetimeString;
}

function currentTime(currentDateTime) {
  var myDatetimeString = moment.unix(currentDateTime).format('h:mm A')
  return myDatetimeString;
}

export default Weather;