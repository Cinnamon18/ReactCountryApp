/* tslint:disable */
import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './CountryModal.css';

export class CountryModal extends React.Component<ICountryModalProps, {showModal: boolean}> {

    contentsTitle: string;
    contentsBody: string;

    constructor(props: ICountryModalProps) {
        super(props);
        this.state = {
            showModal: false
        };
        this.contentsTitle = props.contentsTitle;
        this.contentsBody = props.contentsBody;
    }

    public render(): JSX.Element {
        return (
            <div>
                <DefaultButton
                    secondaryText={this.contentsTitle}
                    onClick={this._showModal}
                    text={this.contentsTitle}
                />
                <Modal
                    isOpen={this.state.showModal}
                    onDismiss={this._closeModal}
                    isBlocking={false}
                    containerClassName='ms-modalExample-container'
                >
                    <div className='ms-modalExample-header'>
                        <span>{this.contentsTitle}</span>
                    </div>
                    <div className='ms-modalExample-body'>
                        <p>{this.contentsBody}</p>
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