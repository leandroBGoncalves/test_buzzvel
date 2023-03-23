import { createContext, useState } from "react";
import { supabase } from "../services/supaClient";


export const ContextApi = createContext({});

export function ContextProvider({ children }) {
    const [responseQrGenerate, setResponseQrGenerate] = useState([]);
    const [dataToQgCode, setDataToQgCode] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

    async function innerDataQrCode(body) {
        const { data, error } = await supabase
        .from('data-qrcode')
        .insert(body)
        .select()

        if (!error) {
            setResponseQrGenerate(data);
            handleOpenAlert();
        } else {
            window.alert(error)
            console.log(error)
        }
    }

    async function getDataQrCode(id) {
        const { data, error } = await supabase
            .from('data-qrcode')
            .select("*")
            .eq('id', id)

        if (data) {
            setDataToQgCode(data);
            console.log('getData', data)
        }

        if (error || !data) {
            console.log('getDataError', error)
            handleOpenAlert();
        }
    }

    function handleOpenAlert() {
        setOpenAlert(true)
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
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