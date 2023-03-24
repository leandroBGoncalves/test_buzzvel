import React, { useContext, useEffect } from "react";
import { ContextApi } from "../../contexts/contextApi";

import styles from './styles.module.scss';

export function ProfilePage() {
    const url_params = window.location.search.slice(1);
    const { 
        getDataQrCode,
        dataToQgCode
    } = useContext(ContextApi)

    useEffect(() => {
        getDataQrCode(url_params)
    }, [url_params])

    return (
        <div className={styles.container}>
            <p><span className={styles.amphasisYellow}>Hello,</span> this is my portfolio</p>
            <span>
                My name is <span className={styles.amphasisCyan}>{dataToQgCode[0]?.name}!</span> and i would like to introduce you to my qualifications, 
                experiences and i would love to contribute to the growth of your business.
            </span>
            <span>
                fell free to visit my Linkedin profile and also learn more about my technical
                skills by accessing my repository collection on GitHub
            </span>
            <div>
                <button className={styles.BTNGitHub}>
                    <a href={dataToQgCode[0]?.urls?.gitHub ? dataToQgCode[0]?.urls?.gitHub : '#'} target='_blank'>
                            GitHub
                    </a>
                </button>
                <button className={styles.BTNLinkedin}>
                    <a href={dataToQgCode[0]?.urls?.linkedin ? dataToQgCode[0]?.urls?.linkedin : '#'} target='_blank'>
                            Linkedin
                    </a>
                </button>
            </div>
        </div>
    )
}