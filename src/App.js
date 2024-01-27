import './App.css';
import Navbar from './components/navbar';
import DataTable from './components/data-table';
import Display from './components/display';
import axiosInstance from "./axios.config";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { update } from './store/counterDataset'
import ExpenseChart from './components/expense-chart';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.dataset.value)
  const [db, setDb] = useState(data);
  const [timeFilter, setTime] = useState(30);
  const [sortFilter, setSort] = useState("");
  useEffect(() => {
    axiosInstance.get('data').then(response => {
      console.log(response)
      dispatch(update(response.data))
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch])

  useEffect(() => {
    setDb(data);
  }, [data]);

  useEffect(() => {
    var filteredData = [...data];
    if (timeFilter === "all") {
    } else {
      const compareTimestamp = Date.now() - parseInt(timeFilter) * 24 * 60 * 60 * 1000;

      filteredData = data.filter(item => new Date(item.createdAt) >= compareTimestamp)
    }
    var filteredAndSortedData = filteredData;
    if (filteredData.length > 0) {
      switch (sortFilter) {
        case "":
          break;
        case "AZup":
          filteredAndSortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "AZdown":
          filteredAndSortedData.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "Vup":
          filteredAndSortedData = filteredData.sort((a, b) => a.value - b.value);
          break;
        case "Vdown":
          filteredAndSortedData = filteredData.sort((a, b) => b.value - a.value);
          break;
        case "Dup":
          filteredAndSortedData = filteredData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "Ddown":
          filteredAndSortedData = filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
    }
    setDb(filteredAndSortedData);
  }, [timeFilter, sortFilter, data])
  return (
    <div className="App w-screen min-h-screen bg-base-200">
      <Navbar />
      <div className='w-full flex justify-center flex-col md:flex-row items-start gap-6 px-6 md:mt-10 mt-6 md:pb-0 pb-6'>
        <div className='flex flex-col md:w-1/3 w-full md:gap-2 gap-4'>
          <Display sdata={db} stime={timeFilter} />
          <div className='card bg-base-100 shadow-lg h-fit overflow-x-auto flex items-center'>
              <div className='w-3/4 items-center'>
                <ExpenseChart db={db}/>
              </div>
          </div>
        </div>
        <div className='flex flex-col w-full md:w-2/3 md:gap-2 gap-4'>
          <div className="card bg-base-100 shadow-lg overflow-x-auto md:p-4 p-2 flex md:flex-row flex-col gap-2 justify-center">
            <button className="btn btn-ghost lg:btn-md btn-xs">Timespan:</button>
            <div className='flex items-center w-full lg:gap-6 gap-2'>
              <select className="select select-bordered w-full max-w-xs lg:select-md select-xs grow" value={timeFilter} onChange={(e) => setTime(e.target.value)}>
                <option value="all">All time</option>
                <option value="30">30 days</option>
                <option value="7">7 days</option>
                <option value="1">1 day</option>
              </select>
              <button className="lg:btn-md btn btn-xs hover:text-info" onClick={() => { setTime(30) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.0} strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg>
              </button>            </div>
            <button className="btn btn-ghost lg:btn-md btn-xs">Sort by:</button>
            <div className='flex items-center w-full lg:gap-6 gap-2'>
              <select className="select select-bordered w-full max-w-xs lg:select-md select-xs grow" value={sortFilter} onChange={(e) => setSort(e.target.value)}>
                <option value="None">Don't sort</option>
                <option value="AZup">Title [A-Z] &uarr;</option>
                <option value="AZdown">Title [A-Z] &darr;</option>
                <option value="Vup">Value &uarr;</option>
                <option value="Vdown">Value &darr;</option>
                <option value="Dup">Date &uarr;</option>
                <option value="Ddown">Date &darr;</option>
              </select>
              <button className="lg:btn-md btn btn-xs hover:text-info" onClick={() => { setSort("") }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.0} strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg>
              </button>
            </div>
          </div>

          <DataTable data={db} />
        </div>
      </div>
    </div>
  );
}

export default App;
