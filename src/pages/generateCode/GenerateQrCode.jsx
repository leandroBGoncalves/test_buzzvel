import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Inputs } from "../../components/inputs/inputs";
import { ContextApi } from "../../contexts/contextApi";
import ToastAlert from "../../libs/alert/alertSucess";

import styles from './styles.module.scss';

export function GenerateQrCodePage() {
    let navigate = useNavigate()
    const { 
        innerDataQrCode, 
        responseQrGenerate,
    } = useContext(ContextApi)
    const [name, setName] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [gitHub, setGitHub] = useState('');

    async function registerQrCodeData() {
        await innerDataQrCode({
            name: name,
            urls: {
                linkedin: linkedin,
                gitHub: gitHub
            }
        })
    }

    useEffect(() => {
        if (responseQrGenerate[0]?.id) {
            navigate(`/myqr-code/${responseQrGenerate[0]?.id}`)
        }
    }, [responseQrGenerate])

    return (
        <div className={styles.containerGenerateCode}>
            <h1>QR Code Image Generator</h1>
            <div className={styles.contentForm}>
                <p>Please fill in all the data to generate your QR Code</p>
                <Inputs 
                label='Name:'
                type='text'
                changeState={setName}
                value={name}
                />
                <Inputs 
                label='Linkedin URL:'
                type='URL'
                changeState={setLinkedin}
                value={linkedin}
                />
                <Inputs 
                label='GitHub URL:'
                type='URL'
                changeState={setGitHub}
                value={gitHub}
                />
                <div 
                className={styles.boxBTN}
                onClick={null}
                >
                    <button
                    onClick={() => registerQrCodeData()}
                    >
                        Generate Image
                    </button>
                </div>
            </div>
            <ToastAlert 
            vertical='top'
            horizontal='center'
            />
        </div>
    )
}