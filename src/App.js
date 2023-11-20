import './App.css';
import Navbar from './components/navbar';
import DataTable from './components/data-table';
import Display from './components/display';

function App() {
  return (
<div className="App w-screen">
  <Navbar />
  <div className='w-full flex justify-center flex-col md:flex-row items-start gap-6 px-6 md:mt-10 mt-6'>
    <Display/>
    <DataTable/>
  </div>
</div>
  );
}

export default App;
