/* tslint:disable */

export class Country {
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    altSpellings: string[];
    area: number;
    borders: string[];
    callingCodes: string[];
    capital: string;
    cioc: string;
    currencies: string[];
    demonym: string;
    flag: string;
    flagImage: HTMLImageElement;
    gini: number;
    languages: string;
    latlng: number[];
    nativeName: string;
    numericCode: string;
    population: number;
    region: string;
    subregion: string;
    timezones: string[];
    topLevelDomain: string[];

constructor(
    name: string,
    alpha2Code: string,
    alpha3Code: string,
    altSpellings: string[],
    area: number,
    borders: string[],
    callingCodes: string[],
    capital: string,
    cioc: string,
    currencies: string[],
    demonym: string,
    flag: string,
    gini: number,
    languages: string,
    latlng: number[],
    nativeName: string,
    numericCode: string,
    population: number,
    region: string,
    subregion: string,
    timezones: string[],
    topLevelDomain: string[]
    ) {
    this.name = name;
    this.alpha2Code = alpha2Code;
    this.alpha3Code = alpha3Code;
    this.altSpellings = altSpellings;
    this.area = area;
    this.borders = borders;
    this.callingCodes = callingCodes;
    this.capital = capital;
    this.cioc = cioc;
    this.currencies = currencies;
    this.demonym = demonym;
    this.flag = flag;
    this.gini = gini;
    this.languages = languages;
    this.latlng = latlng;
    this.nativeName = nativeName;
    this.numericCode = numericCode;
    this.population = population;
    this.region = region;
    this.subregion = subregion;
    this.timezones = timezones;
    this.topLevelDomain = topLevelDomain;

    this.flagImage = new Image(300, 200);
    this.flagImage.src = this.flag;
}

    public toString(): string {
    return this.name + ' ' + this.alpha2Code;
}
}