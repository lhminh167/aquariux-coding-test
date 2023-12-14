import dayjs from "dayjs";

export interface GetWeatherErrorResponse {
  message: string;
  cod: number;
}

export interface GetWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: GetWeatherResponseItem[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface GetWeatherResponseItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface SearchInput {
  city: string;
  country: string;
}

export const defaultSearchInput: SearchInput = {
  city: "",
  country: "",
};

export interface Weather {
  city: string;
  country: string;
  description: string;
  minTemperature: number;
  maxTemperature: number;
  humidity: number;
  main: string;
  date: Date;
}

export const defaultWeather: Weather = {
  city: "",
  country: "",
  description: "",
  minTemperature: 0,
  maxTemperature: 0,
  humidity: 0,
  main: "",
  date: new Date(),
};

export interface HistoryRecord {
  city: string;
  country: string;
  date: Date;
}

export const defaultHistoryRecord: HistoryRecord = {
  city: "",
  country: "",
  date: new Date(),
};

export function formatDateTime(input: Date, format: string): string {
  return dayjs(input).format(format);
}
