import SettingsSingleton from "./SettingsSingletone";

export const colors = {
    oxfordBlue: '#0b132bff',
    celticBlue: '#4472caff',
    glaucous: '#5e7ce2ff',
    jordyBlue: '#92b4f4ff',
    background: SettingsSingleton.getInstance().theme === 'light' ? '#cfdee7ff' : '#0b132bff',
    white: '#fff',
    black: '#000'
};

export const weatherApiKey = 'e90e0b5a70ccd873175190ae64d3431a';
