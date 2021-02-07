/* Header.js
Application Header
Author(s):
    Sonal Khare
Date Created:
    February 07th, 2021
*/
import React from 'react';
import classes from './Header.module.css';
/*
    React Header component for application
    Args:
      props: NA
    Returns:
      Header component
*/
const Header=props=>(
    <header className={classes['Header__header']}>
        <h2 className={classes['Header_h1']}>Bunnings Catalog</h2>
    </header>
)

export default Header;