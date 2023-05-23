// @ts-nocheck

import { Settings } from "../../views/Settings"
import React from 'react';
import {SwitchChangeEvent} from 'react-native'
import { render, fireEvent } from '@testing-library/react-native';
import { deleteAllFavourites, deleteAllHistory, getDBConnection } from '../../db-service';
import {SettingsSingleton} from '../../SettingsSingleton'

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

        const { getAllByRole, debug } = render(<Settings />);
        const switchElement = getAllByRole('switch');
        debug();
        expect(switchElement.length).toBe(1);
    });
})