import { statusOptions, typeOptions } from "../constants";
import {v4} from 'uuid';
import { addJob } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)

    const dataObj = Object.fromEntries(formData)

    dataObj.id = v4();

    dataObj.date = new Date().toLocaleDateString();
    
    axios.post("http://localhost:3030/jobs", dataObj)
    .then(()=>{
      dispatch(addJob(dataObj))
      navigate("/")
      toast.success('Başarıyla eklendi!', {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        });
    })
  }
  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Pozisyon</label>
          <input name="position" type="text"/>
        </div>
        <div className="field">
          <label>Şirket</label>
          <input name="company" type="text"/>
        </div>
        <div className="field">
          <label>Lokasyon</label>
          <input name="location" type="text"/>
        </div>
        <div className="field">
          <label>Durum</label>
          <select name="status">
          {statusOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Tür</label>
          <select name="type">
          {typeOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button>Ekle</button>
      </form>
    </div>
  )
}

export default AddJob