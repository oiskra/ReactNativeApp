// @ts-nocheck
import { Settings } from "../../views/Settings"
import React from 'react';
import { render } from '@testing-library/react-native';

describe('settings', () => {
    it('render', () => {
        const nav = {navigate: () => {}}
        const p = render(<Settings navigation={nav}/>);
        const { getAllByText } = p
        expect(getAllByText('Units').length).toBe(1);
        expect(getAllByText('Celcius').length).toBe(1);
        expect(getAllByText('Fahrenheit').length).toBe(1);
        expect(getAllByText('Clear History').length).toBe(1);
        expect(getAllByText('Clear Favourites').length).toBe(1);

    })


    it('render units switch', () => {

        const { getAllByRole } = render(<Settings />);
        const switchElement = getAllByRole('switch');
        expect(switchElement.length).toBe(1);
    });
})