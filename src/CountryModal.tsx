/* tslint:disable */
import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Country } from "./Country";
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

        let foregroundStyle: CSSProperties = {
            position: "absolute",
            top: "30%",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: 1
        };

        return (
            <div>
                <div>
                    <DefaultButton
                        onClick={this._showModal}
                        style={buttonStyle}
                    >
                    </DefaultButton>
                    <p className="ms-fontSize-xl" style={foregroundStyle}>{this.country.name}</p>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    onDismiss={this._closeModal}
                    isBlocking={false}
                    containerClassName='ms-modalExample-container'
                >
                    <div className='ms-modalExample-header'>
                        <span>{this.country.name}</span>
                    </div>
                    <div className='ms-modalExample-body'>
                        <p>{this.country.alpha2Code +
                            this.country.alpha3Code +
                            this.country.altSpellings +
                            this.country.area +
                            this.country.borders +
                            this.country.callingCodes +
                            this.country.capital +
                            this.country.cioc +
                            this.country.currencies +
                            this.country.demonym +
                            this.country.flag +
                            this.country.gini +
                            this.country.languages +
                            this.country.latlng +
                            this.country.nativeName +
                            this.country.numericCode +
                            this.country.population +
                            this.country.region +
                            this.country.subregion +
                            this.country.timezones +
                            this.country.topLevelDomain}</p>
                    </div>
                </Modal>
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