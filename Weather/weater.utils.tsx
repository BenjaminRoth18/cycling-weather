import moment from 'moment';

export interface WeatherRange {
  date: string;
  ridingPossibility: RoadConditions[];
}

export interface DayForecast {
  time: string;
  condition: RoadConditions;
}

export enum RoadConditions {
  DRY = 'DRY',
  WET = 'WET',
}

export const createWeatherForecast = (apiResponse: any): WeatherRange[] => {
  const uniqueDaysList = apiResponse.reduce((acc: string[], curr: any) => {
    const unqiueDay = moment.unix(curr.dt).format('dddd');

    return acc.includes(unqiueDay) ? acc : [...acc, unqiueDay];
  }, []);

  return weatherForecast(uniqueDaysList, apiResponse);
};

const weatherForecast = (uniqueDaysList: string[], apiResponse: any) =>
  uniqueDaysList
    .map((day: string) => {
      const foreCast: DayForecast[] = apiResponse
        .map((forecastItem: any) => {
          const unqiueDay = moment.unix(forecastItem.dt).format('dddd');

          if (unqiueDay === day) {
            return {
              time: moment.unix(forecastItem.dt).utc().format('kk'),
              condition: forecastItem.rain
                ? RoadConditions.WET
                : RoadConditions.DRY,
            };
          }
        })
        .filter(Boolean)
        .filter((dayForecast: DayForecast) => {
          const minHour = '09';
          const maxHour = '21';

          return (
            dayForecast &&
            dayForecast.time >= minHour &&
            dayForecast.time <= maxHour
          );
        });

      return {
        date: day,
        ridingPossibility: getRidingPossibilityList(foreCast),
      };
    })
    .slice(0, 5);

const getRidingPossibilityList = (
  forecast: (DayForecast | undefined)[],
): RoadConditions[] => {
  const conditionRanking = forecast.reduce((acc: any, curr: any) => {
    if (curr.condition === RoadConditions.DRY) {
      acc.push(curr.condition);
    }

    return acc;
  }, []);

  return conditionRanking;
};
