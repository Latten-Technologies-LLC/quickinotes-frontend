/**
 * Ads.js
 * Type: Utility
 * Description: Helper functions for ads and making them either show or not
 * 
 */
import React from 'react'

import { useAuthContext } from "../context/AuthContext";
import moment from 'moment';

import { http } from '../helpers/http';

import { message, } from "antd";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

// Framer motion
import { motion } from 'framer-motion';

// Square Modal
import { SquareModal } from './Square';

/**
 * Display Ads 
 * @param {string} adType - The type of ad to display
 * @param {string} adSize - The size of the ad to display
 * 
 */
export const DisplayAd = (adType, adSize) => {

    return (
        <div className="ad">
            <div className="ad-container">
                <div className="ad-header">
                    <h1>Advertisement</h1>
                    <SquareModal />
                </div>
                <div className="ad-content">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2085234864180580"
                        crossOrigin="anonymous"></script>
                    <ins className="adsbygoogle"
                        data-ad-format="fluid"
                        data-ad-layout-key="-6t+ed+2i-1n-4w"
                        data-ad-client="ca-pub-2085234864180580"
                        data-ad-slot="1132166304"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({ });
                    </script>
                </div>
            </div>
        </div>
    )
};
