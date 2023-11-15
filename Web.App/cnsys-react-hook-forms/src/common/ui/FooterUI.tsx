import React from 'react';
import { appConfig } from 'utilities';

const FooterUI = () => {

    return <div className="footer-wrapper">
        <footer className="footer">
            <div className="footer-text">
                <span className="font-weight-bold">СОКСО</span> - Система за одитиране киберсигурността на стратегическите обекти</div>
            <div className="software-version">Версия: { appConfig.version }</div>
        </footer>
    </div>
}

export default FooterUI;