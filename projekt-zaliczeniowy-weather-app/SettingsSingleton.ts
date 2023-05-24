
type Units = 'metric' | 'imperial';

export class SettingsSingleton {

    private static instance: SettingsSingleton;
    private _units: Units = 'metric';
    private _isImperial: boolean = false;

    private constructor() {}

    public static getInstance(): SettingsSingleton {
        if (!SettingsSingleton.instance) {
            SettingsSingleton.instance = new SettingsSingleton();
        }

        return SettingsSingleton.instance;
    }

    public get units(): string {
        return this._units;
    }

    public get isImperial(): boolean {
        return this._isImperial;
    }

    public changeUnits() {

        this._units = this._units === 'metric' ? 'imperial' : 'metric';
        this._isImperial = !this._isImperial;
        console.log('units changed', this._units);

    }

}