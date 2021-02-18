import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  createWeatherForecast,
  RoadConditions,
  WeatherRange,
} from './weater.utils';
import {WeatherItem} from './WeatherItem';

export interface State {
  date: string;
  ridingPossibility: RoadConditions[];
}

const initialState: State = {
  date: '',
  ridingPossibility: [],
};

export const WeatherContainer: React.FC<{}> = () => {
  const [weatherState, setWeatherState] = useState<State[]>([initialState]);

  const apiUrl =
    'http://api.openweathermap.org/data/2.5/forecast?id=2867714&appid=28cedb2751556fdaac5fdfd09f345ab2';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        setWeatherState(createWeatherForecast(json.list));
      });
  }, []);

  return (
    <View style={styles.container}>
      {weatherState.map((forecastItem: WeatherRange, i: number) => (
        <WeatherItem
          key={i}
          style={styles.item}
          date={forecastItem.date}
          ranking={forecastItem.ridingPossibility}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    alignSelf: 'stretch',
    flex: 1,
    color: 'white',
    backgroundColor: 'blue',
  },
});
