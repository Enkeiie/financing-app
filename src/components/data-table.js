import { useEffect } from "react";
import axiosInstance from "../axios.config";
import { useDispatch, useSelector } from "react-redux";
import { update } from '../store/counterDataset'

function DataTable(props) {
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
        <div className="card bg-neutral shadow-lg overflow-x-auto w-full md:w-2/3 flex justify-center h-96 md:p-4 p-2">
          <div className="w-full h-full overflow-y-auto">
            <table className="table md:table-lg table-xs w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.value}</td>
                    <td className="">{item.title}</td>
                    <td>
                      <button className="btn-xs hover:text-error">
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