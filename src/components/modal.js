import { useEffect, useState } from 'react';

function Modal(props) {
  const [modValue, setValue] = useState(0.0);
  const [modType, setType] = useState('');

  useEffect(() => {
    switch (props.type) {
      case "modal-expense":
        setType("expense")
        break;
      case "modal-income":
        setType("income")
        break;
    }
  }, [props.type]);

  const handleIncrease = () => {
    setValue(parseFloat((modValue + 1).toFixed(2)));
  }

  const handleReduce = () => {
    if (parseFloat((modValue - 1).toFixed(2)) <= 0) {
      setValue(0)
    } else {
      setValue(parseFloat((modValue - 1).toFixed(2)));
    }
  }

  const handleInput = (event) => {
    setValue(parseFloat(event.target.value));
  }

  return (
    <dialog id={props.type} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add {modType}</h3>
        <form className="py-4 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <label className="label">
            <span className="label-text">Value</span>
          </label>
          <div className="relative w-40">
            <p className="absolute left-0 top-0 rounded-r-none btn btn-square input input-bordered" onClick={handleReduce}>-</p>
            <input type="number" name="modValue" className="w-full text-center px-12 input input-bordered max-w-xs" value={modValue} onInput={handleInput} />
            <p className="absolute right-0 top-0 rounded-l-none btn btn-square input input-bordered" onClick={handleIncrease}>+</p>
          </div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;