import Canvas from './canvas';
import Customiser from './pages/Customizer';
import Home from './pages/Home';

Home
function App() {

  return (
   <main className="app transition-allease-in">
    <Home />
    <Canvas />
    <Customiser />
   </main>
  )
}

export default App
