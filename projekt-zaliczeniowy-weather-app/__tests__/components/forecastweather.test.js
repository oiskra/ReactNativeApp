//@ts-nocheck
import { render } from "@testing-library/react-native";
import { ForecastWeather } from "../../components/ForecastWeather";
import { colors } from "../../constants";

describe("ListItem", () => {

    it('Component generate properly', () => {

        const { getByTestId } = render(<ForecastWeather />);

        expect(getByTestId('weather-forecast-wrapper')).toBeDefined();
        expect(getByTestId('weather-forecast-scrollview')).toBeDefined();

    });

    it('Component have proper style', () => {

        const style = {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
            padding: 10,
        }

        const { getByTestId } = render(<ForecastWeather />);

        expect(JSON.stringify(getByTestId('weather-forecast-wrapper').props.style)).toContain(JSON.stringify(style));

    });

    it('Component pass proper data for 1 forecast', () => {

        props = {
            forecast: [{
                main: {
                    temp_min: 13,
                    temp_max: 16,
                },
                weather: [
                    {
                        icon: '04d'
                    }
                ],
                dt_txt: '2023-05-24 21:00:00'
            }]
        }

        const { forecast } = props;
        const { getAllByTestId, getByTestId } = render(<ForecastWeather forecast={forecast} />);

        expect(getAllByTestId('forecast-item-wrapper').length).toBe(1);
        expect(getByTestId('forecast-item-day').children).toContain('Wed, 21:00');
        expect(getByTestId('forecast-item-icon').props.source.uri).toContain('https://openweathermap.org/img/wn/04d.png');
        expect(getByTestId('forecast-item-temp').children).toContain('16/13');

    });

    it('Component pass proper data for many forecasts', () => {

        props = {
            forecast: [
                {
                    main: {
                        temp_min: 13,
                        temp_max: 16,
                    },
                    weather: [
                        {
                            icon: '04d'
                        }
                    ],
                    dt_txt: '2023-05-24 21:00:00'
                },
                {
                    main: {
                        temp_min: 10,
                        temp_max: 14,
                    },
                    weather: [
                        {
                            icon: '01n'
                        }
                    ],
                    dt_txt: '2023-05-25 00:00:00'
                },
                {
                    main: {
                        temp_min: 8,
                        temp_max: 10,
                    },
                    weather: [
                        {
                            icon: '02n'
                        }
                    ],
                    dt_txt: '2023-05-25 03:00:00'
                },
            ]
        }

        const { forecast } = props;
        const { getAllByTestId } = render(<ForecastWeather forecast={forecast} />);

        expect(getAllByTestId('forecast-item-wrapper').length).toBe(3);

        expect(getAllByTestId('forecast-item-day')[0].children).toContain('Wed, 21:00');
        expect(getAllByTestId('forecast-item-icon')[0].props.source.uri).toContain('https://openweathermap.org/img/wn/04d.png');
        expect(getAllByTestId('forecast-item-temp')[0].children).toContain('16/13');

        expect(getAllByTestId('forecast-item-day')[1].children).toContain('Thu, 00:00');
        expect(getAllByTestId('forecast-item-icon')[1].props.source.uri).toContain('https://openweathermap.org/img/wn/01n.png');
        expect(getAllByTestId('forecast-item-temp')[1].children).toContain('14/10');

        expect(getAllByTestId('forecast-item-day')[2].children).toContain('Thu, 03:00');
        expect(getAllByTestId('forecast-item-icon')[2].props.source.uri).toContain('https://openweathermap.org/img/wn/02n.png');
        expect(getAllByTestId('forecast-item-temp')[2].children).toContain('10/8');
    });

});