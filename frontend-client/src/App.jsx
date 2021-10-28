import './App.scss';
import TopNav from './components/TopNav';
import SideControls from './components/SideControls/SideControls';
import GamesList from './components/GamesList';
import StateProvider from './providers/StateProvider';
import ItemChart from './components/ItemChart/ItemChart';

export default function App() {
  return (
    <>
      <TopNav />
      <main>
        <StateProvider>
          <SideControls />
          <ItemChart />
        </StateProvider>
      </main>
      <GamesList/>
    </>
  );
}