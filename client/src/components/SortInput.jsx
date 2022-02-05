import Select from 'react-select'
//redux related
import { useDispatch, useSelector } from 'react-redux'
import { sortGallery } from '../redux/actions/galleryActions'
import { getAllGallery } from '../redux/actions/galleryActions'

const SortInput = () => {

  const dispatch = useDispatch()
  const { allGallery } = useSelector(state => state.galleryReducer)

  //react-select options
  const options = [
    { value: "default", label: "Default" },
    { value: "atoz", label: "A to Z" },
    { value: "ztoa", label: "Z to A" }
  ]

  //toma allGallery y lo ordena, después lo manda al store
  const handleChange = e => {
    if (e.value == "atoz") {
      dispatch(sortGallery(allGallery.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        return 0
      })))
    }
    if (e.value === "ztoa") {
      dispatch(sortGallery(allGallery.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
        return 0
      })))
    }
    if (e.value === "default") return dispatch(getAllGallery())
  }

  return (
    <div style={{ width: "180px" }}>
      <Select
        options={options}
        name="Sort"
        placeholder="Sort By"
        defaultValue={options[0]}
        onChange={handleChange}
      />
    </div>
  );
}

export default SortInput;