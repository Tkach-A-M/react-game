import React from 'react';
import './Footer.css';

const Footer = () => {
    const GHLink = () => {
        return (
            <a href="https://github.com/Tkach-A-M" target='_blank'>
                <img src="https://tkach-a-m-english-for-kids.netlify.app/assets/images/GitHub-Mark-64px.png" alt="GitHub Logo"/>
            </a> 
        )
    }

    const RSReactLink = () => {
        return (
            <a href="https://rs.school/react/" target='_blank'>
                <img src="https://rs.school/images/rs_school_js.svg" alt="RSReact" height='64px'/>
            </a>
        )
    }

    const YTLink = () => {
        return (
            <a href="https://www.youtube.com/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube logo"/>
            </a>
        )
    }

    return (
        <footer className="footer">
            
            { GHLink() }
            { RSReactLink() }
            { YTLink() }
        </footer>
    )


}

export default Footer;