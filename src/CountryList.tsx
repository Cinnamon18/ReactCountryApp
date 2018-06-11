/* tslint:disable */
import * as React from 'react';
import { Country } from "./Country";
import { CountryTile } from './CountryTile';
import { ICountryListProps } from "./types";
import 'office-ui-fabric-react/dist/css/fabric.css';
import './CountryList.css';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as _ from 'node_modules/underscore';
import { Clock } from './Clock';
//var _ = require('underscore');

export class CountryList extends React.Component<ICountryListProps, { countriesLoaded: boolean }> {

    private countries: Country[];
    private readonly COUNTRIES_PER_ROW: number = 4;
    //Delay to retry the API query if it fails
    private fetchRetryDelay: number = 5000;
    private fetchURL: string;

    constructor(props: ICountryListProps) {
        super(props);
        this.fetchURL = props.url;
        this.state = { 'countriesLoaded': false };
        this.fetchData(this.fetchURL);
    }

    private fetchData(url: string): void {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                //Construct the country objects from the queried data
                this.countries = new Array();
                this.countries.push(Country.SecretCountry());
                for (let country of myJson) {
                    this.countries.push(new Country(
                        country.name,
                        country.alpha2Code,
                        country.alpha3Code,
                        country.altSpellings,
                        country.area,
                        country.borders,
                        country.callingCodes,
                        country.capital,
                        country.cioc,
                        _.pluck(country.currencies, 'name') as Array<string>,
                        country.demonym,
                        country.flag,
                        country.gini,
                        _.pluck(country.languages, 'name') as Array<string>,
                        country.latlng,
                        country.nativeName,
                        country.numericCode,
                        country.population,
                        country.region,
                        country.subregion,
                        _.sortBy(country.timezones, (timeZone: string) => { return Clock.timeZoneToMinutes(timeZone); }),
                        country.topLevelDomain
                    ));
                }
                this.setState({ 'countriesLoaded': true });
            });
    }

    public render(): JSX.Element {
        if (this.state != null && this.state.countriesLoaded) {
            //Success!
            //return (<Grid items={this.countries}/>);
            //return (<div className="ms-Grid" items={this.countries}/>);
            return (<div> {this.makeGrid(this.countries, this.COUNTRIES_PER_ROW)} </div>);
        } else {
            //Retry until the heat death of the universe
            setInterval(
                () => {
                    this.fetchData(this.fetchURL);
                },
                this.fetchRetryDelay
            );
            return (<ProgressIndicator label="Loading countries..." description="They're probably loading I promise" />);
        }
    }

    private makeGrid(countries: Country[], countriesPerRow: number): JSX.Element {
        let countryRowsArr: Country[][] = CountryList.make2DArray(Math.floor(countries.length / countriesPerRow), countriesPerRow);

        /*for (let x = 0; x < Math.floor(countries.length / countriesPerRow); x++) {
            for (let y = 0; y < countriesPerRow; y++) {
                //Just to catch the out of bounds that might happen at the very end
                if (x * countriesPerRow + y < countries.length) {
                    countryRowsArr[x][y] = countries[(x * countriesPerRow) + y];
                }
            }
        }*/
        //All that! Refactored into one line! These libraries are wild.
        countryRowsArr = _.chunk(countries, 4);

        return (
            <div className="ms-Grid">
                {countryRowsArr.map((countryRow: Country[]) => {
                    return (
                        this.makeRow(countryRow)
                    );
                })}
            </div>
        );

    }

    private makeRow(countries: Country[]): JSX.Element {
        return (
            <div className="ms-Grid-row FlagRow" key={countries[0].name}>
                {countries.map((country: Country) => {
                    return (
                        <div className={"ms-Grid-col ms-sm" + Math.floor(12 / this.COUNTRIES_PER_ROW)} key={country.name}>
                            {CountryList.createCountryTile(country)}
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }

    private static createCountryTile(country: Country): JSX.Element {
        return (
            <div>
                <CountryTile country={country} />
            </div>
        );
    }

    private static make2DArray<T>(x: number, y: number): T[][] {
        //I... feel like there should be a better way to do this. .fill(Array<T>(y)) doesn't work unfortunately
        let arr: T[][] = new Array<T[]>(x);
        for (let i = 0; i < x; i++) {
            arr[i] = (new Array<T>(y));
        }
        return arr;
    }

}