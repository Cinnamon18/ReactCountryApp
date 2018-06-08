/* tslint:disable */

import { IClockProps } from "./types";
import * as React from 'react';

export class Clock extends React.Component<IClockProps, {}> {

    private timeZone: string[];

    constructor(props: IClockProps) {
        super(props);
        this.timeZone = props.timeZone;
    }

    public render(): JSX.Element {
        this.timeZone;
        return (
            <p>Current time: </p>
        );
    }

}