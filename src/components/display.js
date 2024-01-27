import { useState } from "react";
import { useEffect } from "react";

const countBalance = (db) => {
    var count = 0.0;
    db.map((item) => {
        count += parseFloat(item.value)
    });
    return parseFloat(count).toFixed(2)
}

const  Display = ({ sdata, stime }) => {
    const data = sdata
    const timespan = stime
    const [db,setDb] = useState([]);
    
    useEffect(() => {
      setDb(data);
    },[data]);

    return (
        <div className="stats shadow-lg w-full">
            <div className="stat">
                <div className="stat-title xl:text-4xl 2xl:text-6xl">Current balance</div>
                <div className="stat-value xl:text-6xl 2xl:text-8xl">{countBalance(db)}</div>
                <div className="stat-desc xl:text-2xl 2xl:text-3xl">Results for {timespan} day/s</div>
            </div>
        </div>);
}

export default Display;