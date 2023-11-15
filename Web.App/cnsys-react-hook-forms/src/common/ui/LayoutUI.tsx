import React from 'react';
import { Outlet } from "react-router-dom";
import FooterUI from './FooterUI';
import NavigationUI from './NavigationUI';

interface ILayoutUIProps {}

export const LayoutUI: React.FC<ILayoutUIProps> = () => {
    
    return <div className="layout-wrapper" id="LAYOUT">
        <div className="main-wrapper">
            <NavigationUI />
            <main className="page-wrapper">
                <div className="container-fluid">
                    <Outlet />
                </div>
            </main>
        </div>
        <FooterUI />
    </div>
}