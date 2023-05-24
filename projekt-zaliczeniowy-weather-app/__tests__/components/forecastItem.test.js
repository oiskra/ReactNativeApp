//@ts-nocheck
import React from 'react'
import { render } from "@testing-library/react-native"
import { ForecastItem } from "../../components/ForecastItem"

describe('forecast item', () => {
    beforeEach(() => {
        props = {
            date: '2022-08-30 21:00:00',
            icon: '10n',
            tempMax: 20,
            tempMin: 13
        }
    })

    it('renders', () => {
        const {getByTestId} = render(
            <ForecastItem 
                date={props.date}
                icon={props.icon}
                tempMax={props.tempMax}
                tempMin={props.tempMin}
            />
        )

        expect(getByTestId('forecast-item-wrapper')).toBeDefined()
        expect(getByTestId('forecast-item-day')).toBeDefined()
        expect(getByTestId('forecast-item-icon')).toBeDefined()
        expect(getByTestId('forecast-item-temp')).toBeDefined()
    })

    it('renders correct values', () => {
        const {getByTestId, debug} = render(
            <ForecastItem 
                date={props.date}
                icon={props.icon}
                tempMax={props.tempMax}
                tempMin={props.tempMin}
            />
        )
        expect(getByTestId('forecast-item-temp').children.at(0)).toBe(`${props.tempMax}/${props.tempMin}`)
        expect(getByTestId('forecast-item-day').children.at(0)).toBe('Tue, 21:00')
        expect(getByTestId('forecast-item-icon').props.source.uri).toBe(`https://openweathermap.org/img/wn/${props.icon}.png`)
    })

    
})