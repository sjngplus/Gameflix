import './App.scss';
import TopNav from './components/TopNav';
import SideControls from './components/SideControls/SideControls';
import GamesList from './components/GamesList';
import StateProvider from './providers/StateProvider';

export default function App() {
  return (
    <main>
      <TopNav />
      <StateProvider>
        <SideControls />
        <GamesList/>
      </StateProvider>
    </main>
  );
}