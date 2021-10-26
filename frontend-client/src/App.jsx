import './App.scss';
import TopNav from './components/TopNav';
import SideControls from './components/SideControls';
import GamesList from './components/GamesList';

function App() {
  return (
    <main>
      <TopNav />
      <SideControls />
      <GamesList/>
    </main>
  );
}

export default App;
