//@ts-nocheck

import React from 'react';
import { Settings } from "../../views/Settings"
import { render, fireEvent } from '@testing-library/react-native';

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


    it('should have the correct initial value', () => {
        const initialValue = false;
        const { getByTestId } = render(<Settings />);
    
        const switchElement = getByTestId('units-switch');
    
        expect(switchElement.props.value).toBe(initialValue);
    });

})