import { describe, it } from "jest-circus";
import Alert from "../Alert";
import AlertConfiguration from "../AlertConfiguration";
import { evaluateSpotAlerts, evaluateFrequencyForBands, evaluateMode } from "../AlertEvaluator";
import Spot from "../Spot"; 

describe('evaluateSpotAlerts', () => {
    let testSpot: Spot = {
        frequency: 14300000,
        mode: "SSB",
        callsign: "KN4COI",
        program: "pota"
    }

    test('should return alert when alert configuration contains only program', () => {
        let alertConfiguration: AlertConfiguration = {
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result).not.toEqual(undefined);
        expect(result?.alert_fields).toContain("program");
    })

    test('should return null when callsign is not an exact match', () => {
        let alertConfiguration: AlertConfiguration = {
            callsign: "AB4EN",
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result).toEqual(undefined);
    })

    test('alert callsign should match spot', () => {
        let alertConfiguration: AlertConfiguration = {
            callsign: "KN4COI",
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result?.callsign).toEqual(testSpot.callsign);
        expect(result?.alert_fields).toContain("callsign");
    })

    test('alert frequency should match spot', () => {
        let alertConfiguration: AlertConfiguration = {
            callsign: "KN4COI",
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result?.frequency).toEqual(testSpot.frequency);
    })

    test('alert mode should match spot', () => {
        let alertConfiguration: AlertConfiguration = {
            callsign: "KN4COI",
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result?.mode).toEqual(testSpot.mode);
    })

    test('alert frequency should match spot', () => {
        let alertConfiguration: AlertConfiguration = {
            callsign: "KN4COI",
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result?.location).toEqual(testSpot.location);
    })

    test('alert unit should match spot', () => {
        let alertConfiguration: AlertConfiguration = {
            callsign: "KN4COI",
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result?.unit).toEqual(testSpot.unit);
    })

    test('Band mismatch should prevent alert', () => {
        let alertConfiguration: AlertConfiguration = {
            callsign: "KN4COI",
            band: ["40m"],
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result).toEqual(undefined);
    })

    test('Band match should present alert', () => {
        let alertConfiguration: AlertConfiguration = {
            band: ["20m"],
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result).not.toEqual(undefined);
        expect(result?.alert_fields).toContain("band");
    })

    test('SSB or CW spot should match SSB', () => {
        let alertConfiguration: AlertConfiguration = {
            mode: ["SSB", "CW"],
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result).not.toEqual(undefined);
        expect(result?.alert_fields).toContain("mode");
    })

    test('CW alert should not match SSB', () => {
        let alertConfiguration: AlertConfiguration = {
            mode: ["CW"],
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result).toEqual(undefined);
    })

    test('DIGITAL alert should not match SSB', () => {
        let alertConfiguration: AlertConfiguration = {
            mode: ["DIGITAL"],
            program: ["pota"]
        }

        const result: Alert | undefined = evaluateSpotAlerts(testSpot, [alertConfiguration])

        expect(result).toEqual(undefined);
    })
})

describe("evaluateFrequencyForBands", () => {
    test('7.1 MHz matches 40m band', () => {
        let bands = ["40m"];
        let frequency = 7100000;

        expect(evaluateFrequencyForBands(frequency, bands)).toEqual(true)

    })

    test('7.1 MHz does not match 20m band', () => {
        let bands = ["40m"];
        let frequency = 7100000;

        expect(evaluateFrequencyForBands(frequency, bands)).toEqual(true)

    })

    test('14.3 MHz matches 20m band', () => {
        let bands = ["20m"];
        let frequency = 14300000;

        expect(evaluateFrequencyForBands(frequency, bands)).toEqual(true)

    })

})

describe("evaluateMode", () => {
    test('CW matches CW', () => {
        let modes = ["CW"];
        let mode = "CW";

        expect(evaluateMode(mode, modes)).toEqual(true)

    })

    test('SSB matches SSB', () => {
        let modes = ["SSB"];
        let mode = "SSB";

        expect(evaluateMode(mode, modes)).toEqual(true)

    })

    test('CW or SSB matches SSB', () => {
        let modes = ["CW", "SSB"];
        let mode = "SSB";

        expect(evaluateMode(mode, modes)).toEqual(true)

    })

    test('SSB does not match CW', () => {
        let modes = ["SSB"];
        let mode = "CW";

        expect(evaluateMode(mode, modes)).toEqual(false)
    })

    test('DIGITAL does not match SSB', () => {
        let modes = ["DIGITAL"];
        let mode = "SSB";

        expect(evaluateMode(mode, modes)).toEqual(false)
    })

    test('DIGITAL does not match CW', () => {
        let modes = ["DIGITAL"];
        let mode = "CW";

        expect(evaluateMode(mode, modes)).toEqual(false)
    })

    test('DIGITAL does match FT8', () => {
        let modes = ["DIGITAL"];
        let mode = "FT8";

        expect(evaluateMode(mode, modes)).toEqual(true)
    })
})