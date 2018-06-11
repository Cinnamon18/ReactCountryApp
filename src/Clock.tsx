/* tslint:disable */

import { IClockProps, IClockState } from "./types";
import * as React from 'react';
import * as moment from 'moment';


export class Clock extends React.Component<IClockProps, IClockState> {

    private timeZones: string[];
    private timeZoneDifference: number;
    private localTimeInCountry: moment.Moment;

    constructor(props: IClockProps) {
        super(props);
        this.timeZones = props.timeZone;

        this.localTimeInCountry = moment.utc();

        //Pick a timezone around the middle
        let timeZone: string = this.timeZones[Math.floor(this.timeZones.length / 2)];
        if (timeZone === "UTC") {
            this.timeZoneDifference = 0;
        } else {
            this.timeZoneDifference = Clock.timeZoneToMinutes(timeZone);
        }

        this.localTimeInCountry.add(this.timeZoneDifference, 'm');
        this.state = { localTime: this.localTimeInCountry };

    }

    public static timeZoneToMinutes(timeZone: string): number {
        //I'd forgotten what a pain working with timezones is. Parse the JSON timezone, convert it to js usable
        let timeZoneDifference: number;
        let isEastOfGrenwich: boolean = timeZone.charAt(3) === '+'
        timeZoneDifference =
            (parseInt(timeZone.charAt(4)) * 10 * 60) +
            (parseInt(timeZone.charAt(5)) * 60) +
            (parseInt(timeZone.charAt(7)) * 10) +
            (parseInt(timeZone.charAt(8)));
        if (!isEastOfGrenwich) {
            timeZoneDifference *= -1;
        }
        return timeZoneDifference;
    }

    componentDidMount() {
        //Make the clock tick every second
        setInterval(
            () => {
                this.updateState();
            },
            1000
        );
    }

    private updateState(): void {
        this.localTimeInCountry = moment().utc().add(this.timeZoneDifference, 'm');
        this.setState({
            localTime: this.localTimeInCountry
        });
    }

    public render(): JSX.Element {
        return (
            <p>
                Current time in {this.timeZones[0]}: {this.localTimeInCountry.format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </p>
        );
    }
}