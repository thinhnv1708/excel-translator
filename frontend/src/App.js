
import './App.css';
import AppLayout from './feature/app-layout';
import Login from './feature/login';

function App() {
  const isLogin = true  
  return (
    <div class="app">
      {
        isLogin ? <AppLayout /> : <Login />
      }
    </div>

  );
}

export default App;
