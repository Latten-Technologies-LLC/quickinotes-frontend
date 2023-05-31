/**
 * Square.js
 * Type: Utility
 * Description: This file contains the Square class, which is used to interact with the Square API.
 */

import React, { useState } from 'react'

import { useAuthContext } from "../context/AuthContext";

import { http } from '../helpers/http';

import { message, Modal, Button } from "antd";

// Square
import { Client } from 'square';
import { randomUUID } from 'crypto';

import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

// Square constants
import { SQUARE_LOCATION_ID, SQUARE_ENVIROMENT, SQUARE_SANDBOX_APP_ID, SQUARE_SANDBOX_ACCESS_TOKEN, SQUARE_PRODUCTION_APP_ID, SQUARE_PRODUCTION_ACCESS_TOKEN, APP_ENV } from '../config/const';

const { paymentsApi } = new Client({
    accessToken: SQUARE_SANDBOX_ACCESS_TOKEN,
    environment: SQUARE_ENVIROMENT
});

/**
 * Square
 * ---
 * Will be used to interact with the Square API
 * 
 */
export const SquareApi = () => {
    var applicationId = '';
    var accessToken = '';
    var locationId = SQUARE_LOCATION_ID;

    if (SQUARE_ENVIROMENT === 'sandbox') {
        applicationId = SQUARE_SANDBOX_APP_ID;
        accessToken = SQUARE_SANDBOX_ACCESS_TOKEN;
    } else {
        applicationId = SQUARE_PRODUCTION_APP_ID;
        accessToken = SQUARE_PRODUCTION_ACCESS_TOKEN;
    }
    return (
        <PaymentForm
            applicationId={applicationId}
            cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                console.log('token', token);
                console.log('verifiedBuyer', verifiedBuyer);
            }}
            locationId={locationId}
        >
            <CreditCard />
        </PaymentForm>
    );
}

/**
 * Square Modal
 * ---
 * Will be used to interact with the Square API
 */
export const SquareModal = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Paying for ad removal helps keep us going! We really appreciate you for using our website!');

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        if(APP_ENV === 'development') {
            console.log('Clicked cancel button');
        }
        setOpen(false);
    };

    return (
        <>
            <a type="primary" onClick={showModal}>
                Remove Ads!
            </a>
            <Modal
                title="Pay $2 to get rid of ads"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>
                ]}
            >
                <p>{modalText}</p>
                <div className='square-modal'>
                    <SquareApi />
                </div>
            </Modal>
        </>
    );
}