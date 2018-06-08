/* tslint:disable */
import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Country } from "./Country";
import { Clock } from "./Clock";
import { ICountryModalProps } from "./types";
import './CountryModal.css';
import { CSSProperties } from 'react';

export class CountryModal extends React.Component<ICountryModalProps, { showModal: boolean }> {

    private country: Country;

    constructor(props: ICountryModalProps) {
        super(props);
        this.state = {
            showModal: false
        };
        this.country = props.country;
    }


    public render(): JSX.Element {
        let buttonStyle: CSSProperties = {
            backgroundImage: 'url(' + this.country.flag + ')',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "contain",
            width: "100%",
            height: "200px",
            zIndex: 2,
            filter: "alpha(opacity=25)",
            opacity: .25
        };

        /*let foregroundStyle: CSSProperties = {
            position: "absolute",
            top: "30%",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: 1
        };*/

        return (
            <div>
                <div>
                    <DefaultButton
                        onClick={this._showModal}
                        style={buttonStyle}
                    >
                    </DefaultButton>
                    <p className="ms-fontSize-xl ButtonForeground">{this.country.name}</p>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    onDismiss={this._closeModal}
                    isBlocking={false}
                    className="ModalContainer"
                >

                    <div className="ms-Grid">
                        <div className="ms-Grid-row" style={{ textAlign: "center" }}>
                            <div className="ms-Grid-col ms-sm12">
                                <div style={buttonStyle} className='ModalHeader' />
                            </div>
                            <p className="ms-fontSize-xxl ButtonForeground" style={{ top: "10%" }}>{this.country.name}</p>
                        </div>
                        <div className="HeaderClock">
                            <Clock timeZone={this.country.timezones} />
                        </div>
                        {this.makeRow(
                            "2 character code: " + this.country.alpha2Code,
                            "3 character code: " + this.country.alpha3Code,
                            "Alternate spellings: " + this.country.altSpellings.join(", "),
                            "Area (km^2): " + String(this.country.area)
                        )}
                        {this.makeRow(
                            "Neighboring countries: " + this.country.borders.join(", "),
                            "Calling codes: " + this.country.callingCodes.join(", "),
                            "Capital: " + this.country.capital,
                            "CIOC: " + this.country.cioc
                        )}
                        {this.makeRow(
                            "Currency: " + this.country.currencies,
                            "Demonym: " + this.country.demonym,
                            "Gini coefficent: " + String(this.country.gini),
                            "Languages spoken: " + this.country.languages
                        )}
                        {this.makeRow(
                            "Latitude, longitude: " + this.country.latlng.join(", "),
                            "Native country name: " + this.country.nativeName,
                            "Numeric code: " + this.country.numericCode,
                            "Population: " + String(this.country.population)
                        )}
                        {this.makeRow(
                            "Region: " + this.country.region,
                            "Subregion: " + this.country.subregion,
                            "Timezones: " + this.country.timezones.join(", "),
                            "Top level domain: " + this.country.topLevelDomain.join(", ")
                        )}

                    </div>

                </Modal>
            </div>
        );
    }

    private makeRow(content1: String, content2: String, content3: String, content4: String): JSX.Element {
        return (
            <div>
                <br /><br />
                <div className="ms-Grid-row ModalGridRow">
                    <div className="ms-Grid-col ms-sm3 ModalBody">{content1}</div>
                    <div className="ms-Grid-col ms-sm3 ModalBody">{content2}</div>
                    <div className="ms-Grid-col ms-sm3 ModalBody">{content3}</div>
                    <div className="ms-Grid-col ms-sm3 ModalBody">{content4}</div>
                </div>
            </div>
        );
    }

    private _showModal = (): void => {
        this.setState({ showModal: true });
    }

    private _closeModal = (): void => {
        this.setState({ showModal: false });
    }
}