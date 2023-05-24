import { SettingsSingleton } from "../SettingsSingleton";

describe("SettingSingleton", () => {

    let settings: SettingsSingleton;
    beforeEach(() => {
        settings = SettingsSingleton.getInstance();
    });

    it('Should return same instance', () => {

        const instance1 = SettingsSingleton.getInstance();
        const instance2 = SettingsSingleton.getInstance();

        expect(instance1).toBe(instance2);

    });

    it('Initial values and gets works', () => {

        expect(settings.units).toBe('metric');
        expect(settings.isImperial).toBe(false);

    });

    it('changeUnits works', () => {

        expect(settings.units).toBe('metric');
        expect(settings.isImperial).toBe(false);

        settings.changeUnits();

        expect(settings.units).toBe('imperial');
        expect(settings.isImperial).toBe(true);

    });

    it('changeUnits works in both ways', () => {

        expect(settings.units).toBe('metric');
        expect(settings.isImperial).toBe(false);

        settings.changeUnits();

        expect(settings.units).toBe('imperial');
        expect(settings.isImperial).toBe(true);

        settings.changeUnits();

        expect(settings.units).toBe('metric');
        expect(settings.isImperial).toBe(false);

    });

});