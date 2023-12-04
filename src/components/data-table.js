import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { decrement } from "../store/counterDataset";
import axiosInstance from '../axios.config';
const checkType = (type) => {
  if (type === 'expense') {
    return "text-error"
  } else {
    return "text-success"
  }
}

const formatDate = (dateString) => {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  return formattedDate;
};

const getId = (_id, db) => {
  const index = db.findIndex(item => item._id === _id);
  return index;
}

const DataTable = (props) => {
  const dispatch = useDispatch();
  const cdata = useSelector(state => state.dataset.value);

  const deleteItem = (_id,db) => {
    const itemIndex = getId(_id, db);

    if (itemIndex === -1) {
      console.error('Object not found in the database');
      return;
    }

    axiosInstance.delete('/' + _id)
      .then(response => {
        console.log(response.data);
        dispatch(decrement(itemIndex));
      })
      .catch(error => {
        console.error('Error while deleting data:', error);
      });
    }

    const data = props.data
    const [db, setDb] = useState([]);

    useEffect(() => {
      setDb(data);
    }, [data]);
  
    return (
      <div className="card bg-base-100 shadow-lg overflow-x-auto flex justify-center h-96 md:p-4 p-2">
        <div className="w-full h-full overflow-y-auto">
          <table className="table xl:table-lg table-xs w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {db.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className={checkType(item.type)}>{item.value}</td>
                  <td>{item.title}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <button className="btn-xs hover:text-error" onClick={() => {deleteItem(item._id,cdata)}}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.0}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  export default DataTable;