import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {RoadConditions} from './weater.utils';

export interface Props {
  date: string;
  ranking: RoadConditions[];
  style: any;
}

export const WeatherItem: React.FC<Props> = ({date, ranking, style}) => {
  return (
    <View style={style}>
      <Text style={styles.day} adjustsFontSizeToFit={true}>
        {date}
      </Text>
      <View style={styles.iconContainer}>
        {ranking.map((_, i: number) => (
          <Icon
            key={i}
            reverse
            name="bicycle-outline"
            type="ionicon"
            color="green"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  day: {
    color: 'white',
    fontSize: 30,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 2,
    flex: 1,
    backgroundColor: 'green',
  },
});
