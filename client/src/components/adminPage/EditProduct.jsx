import Select from 'react-select'
import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import InputComponent from './InputComponent'
import { categoriesTypes } from "../../redux/actions/galleryActions"
import Swal from 'sweetalert2'


const EditProduct = () => {
  const dispatch = useDispatch()

  //===== PUT REQUEST
  const url = process.env.REACT_APP_URL
  localStorage.getItem("itemInfo")
  const artworkTypes = useSelector(state => state.galleryReducer.types);



  const categoryOptions = artworkTypes

  //form state - state del form
  const [formInfo, setFormInfo] = useState(JSON.parse(localStorage.getItem("itemInfo")))

  //handles every change but submit's - maneja todo change excepto el del select
  const handleChange = e => {
    let name = e.target.name
    if(name === "culture") return setFormInfo({...formInfo, culture:[e.target.value]})
    setFormInfo({
      ...formInfo,
      [name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(categoriesTypes());
  }, [dispatch])

  //handles changes on inputs, adds to state - maneja los cambios en el inputs, añade al state
  const handleSelectChange = e => {
    let valueArr = e.map(el => el.id)
    setFormInfo({
      ...formInfo,
      types: valueArr
    })
  }

  function processImage(e) {
    const imageFile = e.target.files[0];
    const imageUrl = new FileReader();
    imageUrl?.readAsDataURL(imageFile)
    imageUrl.onload = (e) => {
      setFormInfo({
        ...formInfo,
        images: e.target.result
      })
    };
  };

  const handleCheckChange = e => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.checked
    })
  }

  //handle dispatch action
  const handleSubmit = async (e) => {
    e.preventDefault()
    const request = await axios.put(`${url}/artwork/put/${formInfo.id}`, formInfo)
    const { data } = request  
    console.log(request)
    if (request?.status === 200) return Swal.fire({
      title: "Success!",
      text: data.msg,
      icon: "success",
      timer: 3000,
      showConfirmButton:false
    })

  }
  
  return (
    <form onSubmit={handleSubmit} style={{ margin: "50px auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "600px" }} >
      <h2 style={{ gridColumn: "1/3" }} >Edit product</h2>
      <div style={{ width: "280px", margin: "auto" }}>

        <InputComponent labelTxt={"Title"} name={"title"} propVal={formInfo.title} handleFunc={handleChange} />

        <InputComponent labelTxt={"Artist Details"} name={"creators_description"} propVal={formInfo.creators_description} handleFunc={handleChange} />

        <InputComponent labelTxt={"Technique"} name={"technique"} propVal={formInfo.technique} handleFunc={handleChange} />

        <InputComponent labelTxt={"Culture"} name={'culture'} propVal={formInfo.culture} handleFunc={handleChange} />

        <InputComponent labelTxt={"Creation Date"} name={"creation_date"} propVal={formInfo.creation_date} handleFunc={handleChange} />

        <InputComponent labelTxt={'Current Location'} name={'current_location'} propVal={formInfo.current_location} handleFunc={handleChange} />

        <InputComponent labelTxt={'Collection'} name={'collection'} propVal={formInfo.collection} handleFunc={handleChange} />

        <InputComponent labelTxt={'Price'} name={'price'} propVal={formInfo.price} handleFunc={handleChange} />

        <label htmlFor="types">Type</label>
        <Select
          onChange={handleSelectChange}
          name="types"
          options={categoryOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          getOptionLabel={(option) => option.type}
          getOptionValue={(option) => option.id}
          isMulti
        />
      </div>
      <div style={{ width: "280px", margin: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <InputComponent labelTxt={'Height'} name={'dimensions_height'} propVal={formInfo.dimensions_height} handleFunc={handleChange} />

          <InputComponent labelTxt={'Width'} name={'dimensions_width'} propVal={formInfo.dimensions_width} handleFunc={handleChange} />
        </div>

        <div style={{ width: "200px", border: "1px solid black", margin: "20px auto", overflow: "hidden" }}>

          <img src={formInfo.images} alt="" style={{ width: "100%", objectFit: "contain", objectPosition: "center center" }} />
        </div>

        <label htmlFor="image">Image</label>
        <input onChange={(e) => processImage(e)} name="images" type="file" accept="image/*" placeholder="Select image"/>

        {/*NO LOGRO QUE SE REGISTRE EL CAMBIO DE TRUE A FALSE */}
        <label htmlFor="stock">Stock</label>
        <input type="checkbox" name="stock" id="" defaultChecked={formInfo.stock} onChange={handleCheckChange} />

        <label htmlFor="description">Description</label>
        <br />
        <textarea name="description" id="" cols="30" rows="5" onChange={handleChange}  ></textarea>
        <br />
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    </form>
  );
}

export default EditProduct;
