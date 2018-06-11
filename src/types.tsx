/* tslint:disable */
import * as moment from 'moment';
import { Country } from "./Country";

export interface ICountryListProps {
    url: string;
  }

export interface ICountryTileProps {
    country: Country;
  }

  export interface IClockProps {
    timeZone: string[];
  }

  export interface IClockState {
    localTime: moment.Moment;
  }