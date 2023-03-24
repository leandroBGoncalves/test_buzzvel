import { createContext, useState } from "react";
import { supabase } from "../services/supaClient";


export const ContextApi = createContext({});

export function ContextProvider({ children }) {
    const [responseQrGenerate, setResponseQrGenerate] = useState([]);
    const [dataToQgCode, setDataToQgCode] = useState([]);
    const [openAlert, setOpenAlert] = useState({
        active: false,
        type: '',
        message: ''
    });

    async function innerDataQrCode(body) {
        const { data, error } = await supabase
        .from('data-qrcode')
        .insert(body)
        .select()

        if (!error) {
            setResponseQrGenerate(data);
            handleOpenAlert('success', 'Your data has been saved!');
        } else {
            handleOpenAlert('error');
            console.log('innerErro', error)
        }
    }

    async function getDataQrCode(id) {
        try {
            const { data, error } = await supabase
            .from('data-qrcode')
            .select("*")
            .eq('id', id)

            if (data) {
                setDataToQgCode(data);
            }
        } catch (error) {
            if (error) {
                console.log('getDataError', error)
                handleOpenAlert('error', 'Error fetching data from QR Code');
            }
        }
    }

    function handleOpenAlert(params, message) {
            setOpenAlert({
                active: true,
                type: params,
                message: message
            })
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert({
            active: false,
            type: ''
        });
      };
    return (
        <ContextApi.Provider value={{
            innerDataQrCode,
            responseQrGenerate,
            handleOpenAlert,
            openAlert,
            handleCloseAlert,
            getDataQrCode,
            dataToQgCode
        }}>
            { children }
        </ContextApi.Provider>
    )
}