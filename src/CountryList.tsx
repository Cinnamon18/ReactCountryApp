/* tslint:disable */
import * as React from 'react';
import { Country } from "./Country";

export class CountryList extends React.Component<ICountryListProps> {

    private countries: Country[];

    constructor(props: ICountryListProps) {
        super(props);

        fetch(props.url)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
                //Turns out myJson is an array not a json object -_-
                this.countries = new Array();
                for (let country of myJson) {
                    this.countries.push(new Country(country.name, country.alpha2Code));
                }
                console.log(this.countries);
                this.setState({ 'countriesLoaded' : true })
            });
    }

    public render() {
        if (this.countries != null) {
            let countriesHtml = new Array();
            for (let country of this.countries) {
                countriesHtml.push(<p key={country.toString()}>{country.toString()}</p>);
            }

            return (countriesHtml);
        } else {
            console.log("Countries not rendered")
            return (<p>ERROR: Unsupported browser</p>);
        }
    }

}