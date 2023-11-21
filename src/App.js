import './App.css';
import Navbar from './components/navbar';
import DataTable from './components/data-table';
import Display from './components/display';
import axiosInstance from "./axios.config";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { update } from './store/counterDataset'

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.dataset.value)
  useEffect(() => {
      axiosInstance.get('data').then(response => {
          console.log(response)
          dispatch(update(response.data))
      })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, [dispatch])
  return (
    <div className="App w-screen h-screen bg-base-200">
      <Navbar />
      <div className='w-full flex justify-center flex-col md:flex-row items-start gap-6 px-6 md:mt-10 mt-6'>
        <Display data={data}/>
        <DataTable data={data}/>
      </div>
    </div>
  );
}

export default App;
