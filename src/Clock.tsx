/* tslint:disable */

import { IClockProps, IClockState } from "./types";
import * as React from 'react';

export class Clock extends React.Component<IClockProps, IClockState> {

    private timeZones: string[];
    private timeZoneDifference: number;
    private localToThisComputer: Date;

    constructor(props: IClockProps) {
        super(props);
        this.timeZones = props.timeZone;
        this.localToThisComputer = new Date();
        this.state = {
            localTime: new Date(Date.UTC(this.localToThisComputer.getFullYear(), this.localToThisComputer.getMonth()))
        };

        //Temp, until I decide which time zone to display
        let timeZone: string = this.timeZones[0];
        //I'd forgotten what a pain working with timezones is. Parse the JSON timezone, convert it to js usable
        if (timeZone === "UTC") {

        } else {
            let isEastOfGrenwich: boolean = timeZone.charAt(3) === '+'
            let minToMs: number = 60 * 1000;
            this.timeZoneDifference =
                (parseInt(timeZone.charAt(4)) * 10 * 60 * minToMs) +
                (parseInt(timeZone.charAt(5)) * 60 * minToMs) +
                (parseInt(timeZone.charAt(7)) * 10 * minToMs) +
                (parseInt(timeZone.charAt(8)) * minToMs);
            if (!isEastOfGrenwich) {
                this.timeZoneDifference *= -1;
            }
        }

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

    componentWillUnmount() {
        //Stop the ticking when we close the modal
        clearInterval();
        this.timeZoneDifference = 0;
    }

    private updateState(): void {
        this.localToThisComputer = new Date();
        this.setState({
            localTime: new Date(Date.UTC(
                this.localToThisComputer.getFullYear(),
                this.localToThisComputer.getMonth(),
                this.localToThisComputer.getDate(),
                this.localToThisComputer.getHours(),
                this.localToThisComputer.getMinutes(),
                this.localToThisComputer.getSeconds(),
            ))
        });
    }

    public render(): JSX.Element {
        this.state.localTime.setTime(this.state.localTime.getTime() - this.timeZoneDifference)
        return (
            <p>
                Current time: {this.state.localTime.toDateString() +
                    ", " + this.state.localTime.getHours() +
                    ":" + this.state.localTime.getMinutes() +
                    ":" + this.state.localTime.getSeconds()}
            </p>
        );
    }

}