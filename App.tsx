import {Provider} from 'react-redux';
import {store} from './src/Redux/Store/Store';
import MainApp from './src/MainApp';
import {useEffect} from 'react';
import {setupPlayer} from './src/Services/PlaybackService';
const App = () => {
  useEffect(() => {
    (async function () {
      await setupPlayer();
    })();
  }, []);

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
