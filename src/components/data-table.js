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
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>{item.value}</td>
                            <td>{item.title}</td>
                            <td><button className="btn-xs btn btn-error rounded-full">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);
}
export default DataTable;