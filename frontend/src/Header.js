import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react"
import StyleSheet from "./css/header.module.css";
import logo from "./img/logo.png";

export default function Header() {
    return <Fragment>
        <div className={StyleSheet.Header}>
            <div className={StyleSheet.inner}>
                <Link to="/"><img src={logo} alt="League Challenges Logo" />League Challenges</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/titles">Titles</Link>
            </div>
        </div>

        <a className={StyleSheet.git} href="https://github.com/DarkIntaqt/challenges" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i> open source</a>

        <div className={StyleSheet.HeaderPlaceholder}>

        </div>
        <div className={StyleSheet.content}>

            <Outlet></Outlet>
        </div>

    </Fragment >
}