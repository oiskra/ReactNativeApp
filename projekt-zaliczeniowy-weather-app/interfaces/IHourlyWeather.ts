export interface IHourlyWeather {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
  }

export interface List {
    dt: number;
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level: number,
        humidity: number,
        temp_kf: number,
    };
    weather: Weather[];
    clouds: { all: number };
    wind: {
        speed: number,
        deg: number,
        gust: number,
    };
    visibility: number;
    pop: number;
    rain: { "3h": number };
    sys: { pod: string };
    dt_txt: string;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
