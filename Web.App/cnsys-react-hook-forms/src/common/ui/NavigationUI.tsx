import $ from 'jquery';
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { appConfig, Constants, debounce } from 'utilities';

const NavigationUI = () => {

    const location = useLocation();

    useEffect(() => {

        $('#navbar-left').find('.nav-link').on('click', debounce(function (e) {
            // e.preventDefault();
            e.stopPropagation();

            if (document.getElementsByClassName('mini-navbar-left')?.length > 0) {
                $(e.currentTarget).closest('.nav.collapse.show').slideUp(
                    function () {
                        $(this).css('display', '');
                        $(this).removeClass('show');
                    }
                ).siblings('.nav-link').addClass('collapsed').attr('aria-expanded', 'false');
            }

            if ($(e.currentTarget).closest('.nav-item').has('>.nav').length > 0) {
                $(e.currentTarget).toggleClass('collapsed');
                $(e.currentTarget).attr('aria-expanded', ($(e.currentTarget).attr('aria-expanded') === "false" ? "true" : "false"));
            }

            $(e.currentTarget).closest('.nav-item').find('>.nav').slideToggle(
                function () {
                    $(this).css('display', '');
                    $(this).toggleClass('show');
                }
            );

            $(e.currentTarget).closest('.nav-item').siblings().find('.nav.collapse.show').slideUp(
                function () {
                    $(this).css('display', '');
                    $(this).removeClass('show');
                }
            ).siblings('.nav-link').addClass('collapsed').attr('aria-expanded', 'false');

            $(e.currentTarget).closest('.nav-item').find('.nav.collapse.show').slideUp(
                function () {
                    $(this).css('display', '');
                    $(this).removeClass('show');
                }
            ).siblings('.nav-link').addClass('collapsed').attr('aria-expanded', 'false');

        }));

    }, [])

    const isCollapsableMenuActive = (menuType: 'nom' | 'analysis') => {

        if (menuType === 'nom') {
            return location.pathname === Constants.PAGES_PATHS.NOM_SECTORS
                || location.pathname === Constants.PAGES_PATHS.NOM_ACTIVITIES
                || location.pathname === Constants.PAGES_PATHS.NOM_EVENT_TYPES

        } else {
            return location.pathname === Constants.PAGES_PATHS.ANALYSIS_CVE
                || location.pathname === Constants.PAGES_PATHS.ANALYSIS_EVENTS
        }
    }

    return <div className="nav-wrapper">
        <nav id="navbar-left" className="navbar-left" aria-label="Основна навигация">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink to={'/'} className={({ isActive }) => isActive || location.pathname === Constants.PAGES_PATHS.ROOT ? "nav-link active" : "nav-link"}>
                        <i className="nav-icon nav-icon-list"></i>
                        <span className="nav-text">Начало</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/full-form'} className={({ isActive }) => isActive || location.pathname === Constants.PAGES_PATHS.ROOT ? "nav-link active" : "nav-link"}>
                        <i className="nav-icon nav-icon-list"></i>
                        <span className="nav-text">Пълна форма</span>
                    </NavLink>
                </li>
                {/*<li className="nav-item">*/}
                {/*    <button type="button" className={isCollapsableMenuActive('nom') ? 'nav-link active toggle-collapse' : 'nav-link toggle-collapse collapsed'}*/}
                {/*        aria-expanded={isCollapsableMenuActive('nom') ? "true" : "false"}>*/}
                {/*        <i className="nav-icon nav-icon-list"></i>*/}
                {/*        <span className="nav-text">Номенклатури</span>*/}
                {/*    </button>*/}
                {/*    <ul className={isCollapsableMenuActive('nom') ? "nav collapse show" : "nav collapse"}>*/}
                {/*        <li className="nav-item">*/}
                {/*            <NavLink to={Constants.PAGES_PATHS.NOM_SECTORS} className="nav-link">*/}
                {/*                <span className="nav-text">Стратегически сектори</span>*/}
                {/*            </NavLink>*/}
                {/*        </li>*/}
                {/*        <li className="nav-item">*/}
                {/*            <NavLink to={Constants.PAGES_PATHS.NOM_ACTIVITIES} className="nav-link">*/}
                {/*                <span className="nav-text">Стратегически дейности</span>*/}
                {/*            </NavLink>*/}
                {/*        </li>*/}
                {/*        <li className="nav-item">*/}
                {/*            <NavLink to={Constants.PAGES_PATHS.NOM_EVENT_TYPES} className="nav-link">*/}
                {/*                <span className="nav-text">Типове събития</span>*/}
                {/*            </NavLink>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*    <button type="button" className={isCollapsableMenuActive('analysis') ? 'nav-link active toggle-collapse' : 'nav-link toggle-collapse collapsed'}*/}
                {/*        aria-expanded={isCollapsableMenuActive('nom') ? "true" : "false"}>*/}
                {/*        <i className="nav-icon nav-icon-report"></i>*/}
                {/*        <span className="nav-text">Анализ</span>*/}
                {/*    </button>*/}
                {/*    <ul className={isCollapsableMenuActive('analysis') ? "nav collapse show" : "nav collapse"}>*/}
                {/*        <li className="nav-item">*/}
                {/*            <NavLink to={Constants.PAGES_PATHS.ANALYSIS_CVE} className="nav-link">*/}
                {/*                <span className="nav-text">Уязвими системи на база CVE</span>*/}
                {/*            </NavLink>*/}
                {/*        </li>*/}
                {/*        <li className="nav-item">*/}
                {/*            <NavLink to={Constants.PAGES_PATHS.ANALYSIS_EVENTS} className="nav-link">*/}
                {/*                <span className="nav-text">Уязвими системи на база събития</span>*/}
                {/*            </NavLink>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*    <NavLink to={Constants.PAGES_PATHS.AUDIT} className="nav-link">*/}
                {/*        <i className="nav-icon nav-icon-history"></i>*/}
                {/*        <span className="nav-text">Одит</span>*/}
                {/*    </NavLink>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*    <a href={appConfig.openCVECurrentCVEUrl} target="_blank" rel="noreferrer" className="nav-link">*/}
                {/*        <i className="nav-icon nav-icon-shield-shadow"></i>*/}
                {/*        <span className="nav-text">Уязвимости (CVE)</span>*/}
                {/*    </a>*/}
                {/*</li>*/}
            </ul>
        </nav>
    </div>
}

export default NavigationUI;