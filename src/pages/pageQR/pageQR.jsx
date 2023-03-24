import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mdiArrowLeftBoldCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import QRCodeLink from 'qrcode';
import history from '../../hitory';

import { GeneratorQr } from "../../components/qrCodeGenerate/QRGenerate";
import { ContextApi } from "../../contexts/contextApi";
import ToastAlert from "../../libs/alert/alertSucess";

import styles from './styles.module.scss';

export function PageQR() {
    const { dataQrCode } = useParams();
    var browserHistory = history;
    const goBack = () => {
        browserHistory.replace('/')
        browserHistory.go()
    }
    const { 
        getDataQrCode,
        dataToQgCode
    } = useContext(ContextApi)
    const [qrCodeLink, setQrCodeLink] = useState('');
    
    useEffect(() => {
        getDataQrCode(dataQrCode)
    }, [dataQrCode])

    useEffect(() => {
        handleDownload(`https://test-buzzvel.vercel.app/profile/?${dataToQgCode[0]?.id}`)
    }, [dataToQgCode])

    function handleDownload(link_url) {
        QRCodeLink.toDataURL(link_url, {
            width: 600,
            margin: 3
        }, (err, url) => {
            setQrCodeLink(url);
        })
    }

    return (
        <div className={styles.containerQRcode}>
            <div 
            className={styles.BTNReturn}
            onClick={() => goBack()}
            >
                <Icon path={mdiArrowLeftBoldCircleOutline}
                  title="return"
                  size={2}
                  />
                <p>Code</p>
                <p>QR</p> 
                <p>Generate</p> 
            </div>
            {dataToQgCode && 
            <div className={styles.contentQrCode}>
                <span>{dataToQgCode[0]?.name}</span>
                <div className={styles.boxCode}>
                    <p>Scan me to see my profile</p>
                    <GeneratorQr 
                    value={`https://test-buzzvel.vercel.app/profile/?${dataToQgCode[0]?.id}`}
                    />
                    <a
                    className={styles.BTNDownload} 
                    href={qrCodeLink} 
                    download='myQrCodeProfile.png'
                    >Download image
                    </a>
                </div>
            </div>
            }
            <ToastAlert 
            vertical='top'
            horizontal='center'
            />
        </div>
    )
} 