/* Footer.js
Application Footer
Author(s):
    Sonal Khare
Date Created:
    January 23rd, 2021
*/
import React from 'react';
import classes from './Footer.module.css';
/*
    React Footer component for application
    Args:
      props: NA
    Returns:
      Footer component
*/
const Footer=props=>(
    <footer className={classes['Footer__footer']}>
        <p>designed by @sonalkhare</p>
    </footer>
)

export default Footer;