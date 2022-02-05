import Select from 'react-select'
import { Button } from 'semantic-ui-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postNewArtwork } from '../../redux/actions/adminProductsActions'

const NewProduct = () => {
  const artworkTypes = useSelector(state => state.galleryReducer.types);

  const dispatch = useDispatch()

  const categoryOptions = artworkTypes

  // const categoryOptions = [
  //   { value: "1", label: "Painting" },
  //   { value: "6", label: "Sculpture" },
  //   { value: "4", label: "Ceramic" },
  //   { value: "9", label: "Textile" }
  // ]

  //form state - state del form
  const [formInfo, setFormInfo] = useState({
    title: "",
    creators_description: "",
    technique: "",
    culture: "",
    creation_date: "",
    current_location: "",
    collection: "",
    price: "",
    types: [],
    stock: true,
    images: null,
    description: ""
  })

  //
  const handleSubmit = e => {
    e.preventDefault()

    dispatch(postNewArtwork(formInfo))
  }

  //handles every change but submit's - maneja todo change excepto el del select
  const handleChange = e => {
    let name = e.target.name
    setFormInfo({
      ...formInfo,
      [name]: e.target.value
    })
  }

  //handles changes on submit, adds to state - maneja los cambios en el submit, añade al state
  const handleSelectChange = e => {
    let valueArr = e.map(el => el.type)
    setFormInfo({
      ...formInfo,
      types: valueArr
    })
  }

  const handleImagesChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setFormInfo({
        ...formInfo,
        images: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit} style={{ margin: "50px auto" }}>
      <h2>New product</h2>

      <label htmlFor="title">Title</label>
      <input type="text" name='title' onChange={handleChange} />

      <label htmlFor="creators_description">Artist Details</label>
      <input type="text" name='creators_description' onChange={handleChange} />

      <label htmlFor="technique">Technique</label>
      <input type="text" name='technique' onChange={handleChange} />

      <label htmlFor="culture">Culture</label>
      <input type="text" name='culture' onChange={handleChange} />

      <label htmlFor="creation_date">Creation Date</label>
      <input type="text" name='creation_date' onChange={handleChange} />

      <label htmlFor="current_location">Current Location</label>
      <input type="text" name='current_location' onChange={handleChange} />

      <label htmlFor="collection">Collection</label>
      <input type="text" name='collection' onChange={handleChange} />

      <label htmlFor="price">Price</label>
      <input type="text" name='price' onChange={handleChange} />

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

      <div style={{ width: "150px", height: "200px", border: "1px solid black", margin: "20px auto", overflow: "hidden" }}>
        {formInfo.images !== null ? (
          <img src={formInfo.images} alt="" style={{ width: "100%", objectFit: "contain", objectPosition: "center center" }} />
        ) : null}
      </div>
      <label htmlFor="images">Images</label>
      <input accept='image/*' type="file" name="image" onChange={handleImagesChange} />


      <label htmlFor="description">Description</label>
      <br />
      <textarea name="description" id="" cols="30" rows="5" onChange={handleChange} ></textarea>
      <br />
      <Button primary>Submit</Button>
    </form>
  );
}

export default NewProduct;