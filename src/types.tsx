/* tslint:disable */
import { Country } from "./Country";

export interface ICountryListProps {
    url: string;
  }

export interface ICountryModalProps {
    country: Country;
  }

  export interface IClockProps {
    timeZone: string[];
  }