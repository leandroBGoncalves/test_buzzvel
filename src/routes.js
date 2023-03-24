import { 
    Routes, 
    Route 
} from 'react-router-dom';
import { GenerateQrCodePage } from './pages/generateCode/GenerateQrCode';
import { PageQR } from './pages/pageQR/pageQR';
import { ProfilePage } from './pages/profilePage/profilePage';


export default function RoutesApp() {
    return (
        <Routes>
            <Route 
            exact
            path='/'
            element={<GenerateQrCodePage />}
            />
            <Route 
            exact
            path='/myqr-code/:dataQrCode'
            element={<PageQR />}
            />
            <Route 
            path='/profile'
            element={<ProfilePage />}
            />
        </Routes>
    )
}