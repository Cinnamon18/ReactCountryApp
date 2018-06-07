/* tslint:disable */
import * as React from 'react';
import { Country } from "./Country";
import { CountryModal } from './CountryModal';
import { ICountryListProps } from "./types";
import 'office-ui-fabric-react/dist/css/fabric.css';
import './CountryList.css';


export class CountryList extends React.Component<ICountryListProps, { countriesLoaded: boolean }> {

    private countries: Country[];
    private readonly COUNTRIES_PER_ROW: number = 4;

    constructor(props: ICountryListProps) {
        super(props);
        //This line below feels right, but react complains that the object hasn't been rendered yet
        //this.setState({ 'countriesLoaded': false });

        fetch(props.url)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                //Turns out myJson is an array not a json object -_-
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
                        country.currencies[0].name,
                        country.demonym,
                        country.flag,
                        country.gini,
                        //that's a readable line of code if I ever saw one. It parses the json, and formats + concats the .name fields together
                        country.languages.slice(1).reduce((languages: string, currentLanguage: any): string => {
                            return (languages + currentLanguage.name + ", ")
                        }, country.languages[0].name + ", ", 1),
                        country.latlng,
                        country.nativeName,
                        country.numericCode,
                        country.population,
                        country.region,
                        country.subregion,
                        country.timezones,
                        country.topLevelDomain
                    ));
                }
                console.log(this.countries);
                this.setState({ 'countriesLoaded': true });
            });
    }

    public render(): JSX.Element {
        if (this.state != null && this.state.countriesLoaded) {

            let makeRow = (countries: Country[]): JSX.Element => {
                return (
                    <div className="ms-Grid-row FlagRow" key={countries[0].name}>
                        {countries.map((country: Country) => {
                            return (
                                <div className={"ms-Grid-col ms-sm" + Math.floor(12 / this.COUNTRIES_PER_ROW)} key={country.name}>
                                    {CountryList.createCountryModal(country)}
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                );
            }

            let makeGrid = (countries: Country[], countriesPerRow: number): JSX.Element => {
                let countryRowsArr: Country[][] = CountryList.make2DArray(Math.floor(countries.length / countriesPerRow), countriesPerRow);

                for (let x = 0; x < Math.floor(countries.length / countriesPerRow); x++) {
                    for (let y = 0; y < countriesPerRow; y++) {
                        //Just to catch the out of bounds that might happen at the very end
                        if (x * countriesPerRow + y < countries.length) {
                            countryRowsArr[x][y] = countries[(x * countriesPerRow) + y];
                        }
                    }
                }

                return (
                    <div className="ms-Grid">
                        {countryRowsArr.map((countryRow: Country[]) => {
                            return (
                                makeRow(countryRow)
                            );
                        })}
                    </div>
                );
            }

            return (<div> {makeGrid(this.countries, this.COUNTRIES_PER_ROW)} </div>);
        } else {
            return (<p>Loading countries...</p>);
        }
    }

    private static createCountryModal(country: Country): JSX.Element {
        return (
            <div>
                <CountryModal country={country} />
            </div>
        );
    }

    private static make2DArray<T>(x: number, y: number): T[][] {
        let arr: T[][] = new Array<T[]>(x);
        for (let i = 0; i < x; i++) {
            arr[i] = (new Array<T>(y));
        }
        return arr;
    }

}