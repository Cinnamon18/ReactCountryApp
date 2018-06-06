/* tslint:disable */
import * as React from 'react';
import { Country } from "./Country";
import { CountryModal } from './CountryModal';
//import { Modal } from 'office-ui-fabric-react/lib/Modal';
//import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export class CountryList extends React.Component<ICountryListProps, { countriesLoaded: boolean }> {

    private countries: Country[];

    constructor(props: ICountryListProps) {
        super(props);
        this.setState({ 'countriesLoaded': false });

        fetch(props.url)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                //Turns out myJson is an array not a json object -_-
                console.log(myJson);
                this.countries = new Array();
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
                        country.currencies,
                        country.demonym,
                        country.flag,
                        country.gini,
                        country.languages,
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

    public render() {
        if (this.state != null && this.state.countriesLoaded) {
            let countriesHtml = new Array();
            for (let country of this.countries) {
                countriesHtml.push(
                    <div>
                        <CountryModal
                            contentsTitle = {country.name}
                            contentsBody = {
                                country.alpha2Code + 
                                country.alpha3Code + 
                                country.altSpellings + 
                                country.area + 
                                country.borders + 
                                country.callingCodes + 
                                country.capital + 
                                country.cioc + 
                                country.currencies + 
                                country.demonym + 
                                country.flag + 
                                country.gini + 
                                country.languages + 
                                country.latlng + 
                                country.nativeName + 
                                country.numericCode + 
                                country.population + 
                                country.region + 
                                country.subregion + 
                                country.timezones + 
                                country.topLevelDomain
                            }
                        />
                        <br />
                    </div>
                );
            }

            return (countriesHtml);
        } else {
            return (<p>Loading countries...</p>);
        }
    }

}