import Select from 'react-select'
import { Button } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//redux
import { getArtwork } from '../../redux/actions/adminProductsActions'
import { useDispatch, useSelector } from 'react-redux'


const EditProduct = () => {
  //gets action type from url to display in title - toma el tipo de accion de la url para mostrar en el titulo
  const params = useParams()
  //redux
  const dispatch = useDispatch()
  const fa = useSelector(state => state.adminProductsReducer.fetchedArtwork)

  const categoryOptions = [
    { value: "painting", label: "Painting" },
    { value: "sculpture", label: "Sculpture" },
    { value: "ceramic", label: "Ceramic" },
    { value: "textile", label: "Textile" }
  ]

  //form state - state del form
  const [formInfo, setFormInfo] = useState({
    title: "",
    creation_date: "",
    current_location: "",
    collection: "",
    price: "",
    categories: [],
    stock: null,
    image: null,
    description: ""
  })

  //
  const handleSubmit = e => {
    e.preventDefault()
    console.log("form submitted")
  }

  //handles every change but submit's - maneja todo change excepto el del select
  const handleChange = e => {
    let name = e.target.name
    console.log(e.target.name, e.target.value)
    setFormInfo({
      ...formInfo,
      [name]: e.target.value
    })
  }

  //handles changes on inputs, adds to state - maneja los cambios en el inputs, añade al state
  const handleSelectChange = e => {
    let valueArr = e.map(el => el.value)
    setFormInfo({
      ...formInfo,
      categories: valueArr
    })
  }

  //
  const handleImageChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setFormInfo({
        ...formInfo,
        image: e.target.files[0]
      })
    }

  }

  const handleCheckChange =e=>{
    setFormInfo({
      ...formInfo,
      [e.target.name] : e.target.checked
    })
  }

  useEffect(() => {
    dispatch(getArtwork(params.id))
    if(fa){
      setFormInfo({
    title: fa?.title,
    creation_date: fa?.creation_date,
    current_location: fa?.current_location,
    collection: fa?.collection,
    price: fa?.price,
    categories: [],
    stock: fa?.stock,
    description: fa?.description
  })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} style={{ margin: "50px auto" }}>
      <h2>Edit product</h2>

      <label htmlFor="title">Title</label>
      <input type="text" defaultValue={fa?.title} name='title' onChange={handleChange} />

      <label htmlFor="creation_date">Creation Date</label>
      <input type="text" defaultValue={fa?.creation_date} name='creation_date' onChange={handleChange} />

      <label htmlFor="current_location">Current Location</label>
      <input type="text" defaultValue={fa?.current_location} name='current_location' onChange={handleChange} />

      <label htmlFor="collection">Collection</label>
      <input type="text" defaultValue={fa?.collection} name='collection' onChange={handleChange} />

      <label htmlFor="price">Price</label>
      <input type="text" defaultValue={fa?.price} name='price' onChange={handleChange} />

      <label htmlFor="categories">Categories</label>
      <Select
        onChange={handleSelectChange}
        isMulti
        name="categories"
        options={categoryOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      {/*NO PUEDO HACER QUE MUESTRE LA IMAGEN ORIGINAL SIN QUE SE ROMPA PORQUE INTENTA CONVERTIRLA COMO CUANDO SUBES UN ARCHIVO*/}
      <div style={{ width: "150px", height: "200px", border: "1px solid black", margin: "20px auto", overflow: "hidden" }}>
        {/* {formInfo.image !== null ? (
          <img src={ URL.createObjectURL(formInfo.image)} alt="" style={{ width: "100%", objectFit: "contain", objectPosition: "center center" }} />
        ) : null} */}
      </div>

      <label htmlFor="image">Image</label>
      <input accept='image/*' type="file" name="image" onChange={handleImageChange} />

      {/*NO LOGRO QUE SE REGISTRE EL CAMBIO DE TRUE A FALSE */}
      <label htmlFor="stock">Stock</label>
      <input type="checkbox" name="stock" id="" defaultChecked={fa?.stock} onChange={handleCheckChange} />

      <label htmlFor="description">Description</label>
      <br />
      <textarea name="description" id="" cols="30" rows="5" onChange={handleChange}  ></textarea>
      <br />
      <Button primary>Submit</Button>
    </form>
  );
}

export default EditProduct;