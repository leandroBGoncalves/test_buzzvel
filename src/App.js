import { BrowserRouter as Router } from 'react-router-dom';
import history from './hitory';
import RoutesApp from './routes';

import { ContextProvider } from './contexts/contextApi';

import '../src/styles/global.scss';

function App() {
  return (
    <ContextProvider>
      <Router history={history}>
        <RoutesApp />
      </Router>
    </ContextProvider>
  );
}

export default App;
