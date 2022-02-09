import Select from 'react-select'
import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postNewArtwork } from '../../redux/actions/adminProductsActions'
import InputComponent from './InputComponent'
import { categoriesTypes } from "../../redux/actions/galleryActions"
import Swal from 'sweetalert2'

const NewProduct = () => {
  const artworkTypes = useSelector(state => state.galleryReducer.types);
  const { sendArtwork } = useSelector(state => state.adminProductsReducer)
  const dispatch = useDispatch()

  const categoryOptions = artworkTypes


  //form state - state del form
  const [formInfo, setFormInfo] = useState({
    title: "",
    creators_description: "",
    technique: "",
    culture: [],
    creation_date: "",
    current_location: "",
    collection: "",
    dimensions_height: "",
    dimensions_width: "",
    price: "",
    type: [],
    images: null,
    description: ""
  })

  //
  const handleSubmit = e => {
    e.preventDefault()
  
    dispatch(postNewArtwork(formInfo))
    if(Object.keys(sendArtwork) === 0) return Swal.fire({
      title: "Error!",
      text: sendArtwork.msg,
      icon: "success",
      timer: 3000,
      showConfirm:false
    })
    if (sendArtwork?.status === 200) Swal.fire({
      title: "Success!",
      text: sendArtwork.msg,
      icon: "success",
      timer: 3000,
      showConfirm:false
    })
  }


  useEffect(() => {
    dispatch(categoriesTypes());
  }, [dispatch])


  //handles every change but submit's - maneja todo change excepto el del select
  const handleChange = e => {
    let name = e.target.name
    if (name === "culture") return setFormInfo({ ...formInfo, culture: [e.target.value] })
    setFormInfo({
      ...formInfo,
      [name]: e.target.value
    })
  }

  //handles changes on submit, adds to state - maneja los cambios en el submit, añade al state
  const handleSelectChange = e => {
    let valueArr = e.map(el => el.id)
    console.log(valueArr)
    setFormInfo({
      ...formInfo,
      type: valueArr
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

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit} style={{ margin: "50px auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "600px" }}>
      <h2 style={{ gridColumn: "1/3" }} >New product</h2>
      <div style={{ width: "280px", margin: "auto" }}>
        <InputComponent labelTxt={"Title"} name={"title"} propVal={formInfo.title} handleFunc={handleChange} />

        <InputComponent labelTxt={"Artist Details"} name={"creators_description"} propVal={formInfo.creators_description} handleFunc={handleChange} />

        <InputComponent labelTxt={"Technique"} name={"technique"} propVal={formInfo.technique} handleFunc={handleChange} />

        <InputComponent labelTxt={"Culture"} name={'culture'} propVal={formInfo.culture} handleFunc={handleChange} />

        <InputComponent labelTxt={"Creation Date"} name={"creation_date"} propVal={formInfo.creation_date} handleFunc={handleChange} />

        <InputComponent labelTxt={'Current Location'} name={'current_location'} propVal={formInfo.current_location} handleFunc={handleChange} />

        <InputComponent labelTxt={'Collection'} name={'collection'} propVal={formInfo.collection} handleFunc={handleChange} />

        <InputComponent labelTxt={'Price'} name={'price'} propVal={formInfo.price} handleFunc={handleChange} />


        <label htmlFor="type">Type</label>
        <Select
          onChange={handleSelectChange}
          name="type"
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
        <input onChange={(e) => processImage(e)} name="images" type="file" accept="image/*" placeholder="Select image" />


        <label htmlFor="description">Description</label>
        <br />
        <textarea name="description" id="" cols="30" rows="5" onChange={handleChange} ></textarea>
        <br />
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    </form>
  );
}

export default NewProduct;
