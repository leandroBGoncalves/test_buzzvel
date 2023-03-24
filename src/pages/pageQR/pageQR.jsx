import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mdiArrowLeftBoldCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import QRCodeLink from 'qrcode';

import { GeneratorQr } from "../../components/qrCodeGenerate/QRGenerate";
import { ContextApi } from "../../contexts/contextApi";
import ToastAlert from "../../libs/alert/alertSucess";

import styles from './styles.module.scss';

let dataProfile;
export function PageQR() {
    const { dataQrCode } = useParams();
    let navigate = useNavigate();
    const { 
        getDataQrCode,
        dataToQgCode
    } = useContext(ContextApi)
    const [qrCodeLink, setQrCodeLink] = useState('');
    
    useEffect(() => {
        getDataQrCode(dataQrCode)
    }, [dataQrCode])

    useEffect(() => {
        handleDownload(`http://localhost:3000/profile/?${dataToQgCode[0]?.id}`)
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
            onClick={() => navigate('/')}
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
                    value={`http://localhost:3000/profile/?${dataToQgCode[0]?.id}`}
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