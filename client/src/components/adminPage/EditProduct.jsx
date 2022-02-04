import Select from 'react-select'
import { Button } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'


const EditProduct = () => {
  const url = process.env.REACT_APP_URL
  localStorage.getItem("itemInfo")
  const artworkTypes = useSelector(state => state.galleryReducer.types);
  //gets action type from url to display in title - toma el tipo de accion de la url para mostrar en el titulo
//   const params = useParams()
  //redux
//   const dispatch = useDispatch()
//   const fa = useSelector(state => state.adminProductsReducer.fetchedArtwork)

  const categoryOptions = artworkTypes

  // const categoryOptions = [
  //   { value: "1", label: "Painting" },
  //   { value: "6", label: "Sculpture" },
  //   { value: "4", label: "Ceramic" },
  //   { value: "9", label: "Textile" }
  // ]
  
  //form state - state del form
  const [formInfo, setFormInfo] = useState(JSON.parse(localStorage.getItem("itemInfo")))
  console.log(formInfo)
  //handles every change but submit's - maneja todo change excepto el del select
  const handleChange = e => {
    let name = e.target.name
    setFormInfo({
      ...formInfo,
      [name]: e.target.value
    })
  }

  //handles changes on inputs, adds to state - maneja los cambios en el inputs, añade al state
  const handleSelectChange = e => {
    let valueArr = e.map(el => el.type)
    setFormInfo({
      ...formInfo,
      categories: valueArr
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
    const {data} = request
    console.log(data)
  }

//   useEffect(() => {
//     dispatch(getArtwork(params.id))
//     const fillForm = () => {
//       if (formInfo !== fa)
//         setFormInfo(fa)
//     }
//     fillForm()
//   }, [dispatch])


  return (
    <form onSubmit={handleSubmit} style={{margin:"50px auto"}} >
      <h2>Edit product</h2>

      <label htmlFor="title">Title</label>
      <input type="text" defaultValue={formInfo.title} name='title' onChange={handleChange} />

      <label htmlFor="creators_description">Artist Details</label>
      <input type="text" name='creators_description' defaultValue={formInfo.creators_description} onChange={handleChange} />

      <label htmlFor="technique">Technique</label>
      <input type="text" name='technique' defaultValue={formInfo.technique} onChange={handleChange} />

      <label htmlFor="culture">Culture</label>
      <input type="text" name='culture' defaultValue={formInfo.culture} onChange={handleChange} />

      <label htmlFor="creation_date">Creation Date</label>
      <input type="text" defaultValue={formInfo.creation_date} name='creation_date' onChange={handleChange} />

      <label htmlFor="current_location">Current Location</label>
      <input type="text" defaultValue={formInfo.current_location} name='current_location' onChange={handleChange} />

      <label htmlFor="collection">Collection</label>
      <input type="text" defaultValue={formInfo.collection} name='collection' onChange={handleChange} />

      <label htmlFor="price">Price</label>
      <input type="text" defaultValue={formInfo.price} name='price' onChange={handleChange} />

      <label htmlFor="categories">Categories</label>
      <Select
        onChange={handleSelectChange}
        name="categories"
        options={categoryOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        getOptionLabel={(option) => option.type}
        getOptionValue={(option) => option.id}
        isMulti
      />

      <div style={{ width: "200px", border: "1px solid black", margin: "20px auto", overflow: "hidden" }}>

        <img src={formInfo.images} alt="" style={{ width: "100%", objectFit: "contain", objectPosition: "center center" }} />
      </div>

      <label htmlFor="image">Image</label>
      <input onChange={(e) => processImage(e)} name="images" type="file" accept="image/*"
        placeholder="Select image"
      />

      {/*NO LOGRO QUE SE REGISTRE EL CAMBIO DE TRUE A FALSE */}
      <label htmlFor="stock">Stock</label>
      <input type="checkbox" name="stock" id="" defaultChecked={formInfo.stock} onChange={handleCheckChange} />

      <label htmlFor="description">Description</label>
      <br />
      <textarea name="description" id="" cols="30" rows="5" onChange={handleChange}  ></textarea>
      <br />
      <Button primary>Submit</Button>
    </form>
  );
}

export default EditProduct;