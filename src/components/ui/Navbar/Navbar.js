import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from './../../../constants/routes'
import styles from './navbar.module.css'

function Navbar({ username }){
    return(
        <div className={styles.navbar}>
            <ul>
                <li>
                    <Link to={ROUTES.FEED(username)}><p>HOME</p></Link>
                </li>
                <li>
                    <Link to={ROUTES.TOPICS(username)}><p>TOPICS</p></Link>
                </li>
                <li>
                    <p>More</p>
                </li>
                <li>
                    <Link to=''><p>ARTICLES</p></Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT(username)}><p>ACCOUNT</p></Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar