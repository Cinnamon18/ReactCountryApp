/* tslint:disable */

export class Country {
    name: string;
    alpha2Code: string;

    constructor(name: string, alpha2Code: string) {
        this.name = name;
        this.alpha2Code = alpha2Code;
    }

    public toString(): string {
        return this.name + ' ' + this.alpha2Code;
    }
}