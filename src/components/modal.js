import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../axios.config';
import { useDispatch } from 'react-redux'
import { increment } from '../store/counterDataset'

const Modal = (props) => {
  const dispatch = useDispatch();
  const [modTitle, setTitle] = useState('');
  const [modValue, setValue] = useState(0.0);
  const [modType, setType] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    data.type=modType;
    if(data.type === "expense"){
      data.value = data.value*(-1)
    }
    axiosInstance.post('', data)
      .then(response => {
        console.log(response.data);
        dispatch(increment(response.data));
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  useEffect(() => {
    switch (props.type) {
      case "modal-expense":
        setType("expense")
        break;
      case "modal-income":
        setType("income")
        break;
      default:
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
    const inputValue = parseFloat(event.target.value);
    setValue(isNaN(inputValue) ? 0 : inputValue);
  }
  const handleChange = (event) => {
    setTitle(event.target.value);
  }
  return (
    <dialog id={props.type} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add {modType}</h3>
        <form className="py-4 form-control w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" value={modTitle} placeholder="Type here" className="input input-bordered w-full max-w-xs" {...register("title", {required: "Title is required", minLength: 1, maxLength: 255})} onChange={handleChange}/>
          {errors.title && <span className='label-text-alt py-2 text-error'>- {errors.title.message}</span>}
          <label className="label">
            <span className="label-text">Value [zł]</span>
          </label>
          <div className="relative w-40">
            <p className="absolute left-0 top-0 rounded-r-none btn btn-square input input-bordered" onClick={handleReduce}>-</p>
            <input type="number" className="w-full text-center px-12 input input-bordered max-w-xs" value={modValue} onInput={handleInput} {...register("value",{ required: "Value is required", min: { value: 0.03, message: "Value must be greater than or equal to 0,03 zł" }})}/>
            <p className="absolute right-0 top-0 rounded-l-none btn btn-square input input-bordered" onClick={handleIncrease}>+</p>
          </div>
          {errors.value && <span className='label-text-alt py-2 text-error'>- {errors.value.message}</span>}
          <input type="hidden" value={modType} {...register("type")}/>
          <input type="submit" className='btn btn-primary my-2' value="Submit"/>
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