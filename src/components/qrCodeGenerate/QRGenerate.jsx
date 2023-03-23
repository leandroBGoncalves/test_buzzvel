import QRCode from "react-qr-code";

import styles from './styles.module.scss';

export function GeneratorQr({ value }) {
    console.log('GeneratorQr', value)
    return (
        <div className={styles.QRCode}>
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
            />
        </div>
    )
}