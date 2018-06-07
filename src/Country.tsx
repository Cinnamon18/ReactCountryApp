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
    currencies: string;
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
        currencies: string,
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

    public static SecretCountry(): Country {
        return (new Country(
            "Squidland",
            "SL",
            "SQL",
            ["Promised Land", "A Very Real Place"],
            360000000,
            ["Atlantic Ocean", "Pacific Ocean", "Caribbean"],
            ["667"],
            "Atlantis",
            "SQD",
            "SquidCoin",
            "Squid",
            "https://upload.wikimedia.org/wikipedia/commons/9/90/Squid_icon_%28Splatoon%29.svg",
            2.7,
            "Squideese",
            [0, 0],
            "Squidland",
            "667",
            270000,
            "Ocean",
            "Varries",
            ["UTC+00:00"],
            [".sq"]
        ))
    }
}