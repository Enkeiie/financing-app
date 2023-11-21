import { useState } from "react";
import { useEffect } from "react";

function countBalance(db){
    var count = 0.0;
    db.map((item) => {
        if(item.type == 'expense'){
            count -= parseFloat(item.value)
        } else {
            count += parseFloat(item.value)
        }
    });
    return parseFloat(count).toFixed(2)
}

function Display(props) {
    const data = props.data
    const [db,setDb] = useState([]);
    
    useEffect(() => {
      setDb(data);
    },[data]);

    return (
        <div className="stats shadow-lg w-full md:w-1/3">
            <div className="stat">
                <div className="stat-title xl:text-6xl">Current balance</div>
                <div className="stat-value xl:text-8xl">{countBalance(db)}</div>
                <div className="stat-desc xl:text-3xl">Results for last 30 days</div>
            </div>
        </div>);
}

export default Display;