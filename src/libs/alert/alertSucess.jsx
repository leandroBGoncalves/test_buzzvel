import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useContext } from 'react';
import { ContextApi } from '../../contexts/contextApi';

const ToastAlert = ({ 
  message,
  vertical,
  horizontal,
  type
 }) => {
  const { 
    openAlert,
    handleCloseAlert 
  } = useContext(ContextApi)

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar 
    open={openAlert.active} 
    autoHideDuration={6000} 
    onClose={handleCloseAlert}
    anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleCloseAlert} severity={openAlert.type} sx={{ width: '100%' }}>
        {openAlert.message}
      </Alert>
    </Snackbar>
  );
};

export default ToastAlert;