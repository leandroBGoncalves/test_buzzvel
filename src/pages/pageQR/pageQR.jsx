import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCodeLink from 'qrcode';

import { GeneratorQr } from "../../components/qrCodeGenerate/QRGenerate";
import { ContextApi } from "../../contexts/contextApi";
import ToastAlert from "../../libs/alert/alert";

import styles from './styles.module.scss';

let dataProfile;
export function PageQR() {
    const { dataQrCode } = useParams();
    const { 
        getDataQrCode,
        dataToQgCode
    } = useContext(ContextApi)
    const [qrCodeLink, setQrCodeLink] = useState('');
    
    useEffect(() => {
        getDataQrCode(dataQrCode)
    }, [dataQrCode])

    console.log('PageQR', dataQrCode, 'dataToQgCode', dataToQgCode)
    useEffect(() => {
        dataProfile = {
            name: dataToQgCode[0]?.name,
            linkedin: dataToQgCode[0]?.urls?.linkedin,
            gitHub: dataToQgCode[0]?.urls?.gitHub
        }
        handleDownload(`http://localhost:3000/profile/${JSON.stringify(dataProfile)}`)
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
            {dataToQgCode && 
            <div className={styles.contentQrCode}>
                <span>{dataProfile?.name}</span>
                <div className={styles.boxCode}>
                    <p>Scan me to see my profile</p>
                    <GeneratorQr 
                    value={`http://localhost:3000/profile/${JSON.stringify(dataProfile)}`}
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
            message='Error fetching data from QR Code'
            vertical='top'
            horizontal='center'
            type='error'
            />
        </div>
    )
} 