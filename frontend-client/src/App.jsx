import './App.scss';
import TopNav from './components/TopNav/TopNav';
import SideControls from './components/SideControls/SideControls';
import StateProvider from './providers/StateProvider';
import ItemChart from './components/ItemChart/ItemChart';

export default function App() {
  return (
    <>
      <StateProvider>
        <TopNav />
        <main>
          <SideControls />
          <ItemChart />
        </main>
      </StateProvider>
    </>
  );
}