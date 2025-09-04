import {Provider} from 'react-redux';
import {store} from './src/Redux/Store/Store';
import MainApp from './src/MainApp';
const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
