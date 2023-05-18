type Theme = 'light' | 'dark';
type Unit = 'celcius' | 'fahrenheit';

export default class SettingsSingleton {

    private static instance: SettingsSingleton;

    private _theme: Theme = 'light';
    private _unit: Unit = 'celcius';

    private constructor() {}

    public static getInstance(): SettingsSingleton {
        if (!SettingsSingleton.instance) {
            SettingsSingleton.instance = new SettingsSingleton();
        }

        return SettingsSingleton.instance;
    }

    public get theme(): string {
        return this._theme;
    }

    public get unit(): string {
        return this._unit;
    }

    public changeTheme() {
        this._theme = this._theme === 'light' ? 'dark' : 'light';
    }

    public changeUnit() {
        this._unit = this._unit === 'celcius' ? 'fahrenheit' : 'celcius';
    }

}