type Theme = 'light' | 'dark';
type Units = 'celcius' | 'fahrenheit';

export class SettingsSingleton {

    private static instance: SettingsSingleton;

    private _theme: Theme = 'light';
    private _units: Units = 'celcius';

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
        return this._units;
    }

    public changeTheme() {

        this._theme = this._theme === 'light' ? 'dark' : 'light';

        console.log(this._theme);

    }

    public changeUnits() {

        this._units = this._units === 'celcius' ? 'fahrenheit' : 'celcius';

        console.log(this._units);

    }

}