import { useState } from 'react'
import Select from 'react-select'
//redux related
import { useDispatch } from 'react-redux'
import { sortGallery } from '../redux/actions/sortActions'

const SortInput = () => {

  const dispatch = useDispatch()
  const [option, setOption] = useState("")

  //react-select options
  const options = [
    { value: "", label: "Default" },
    { value: "atoz", label: "A to Z" },
    { value: "ztoa", label: "Z to A" }
  ]

  const handleChange = e => {
    setOption(e.value)
    dispatch(sortGallery(option))
  }

  return (
    <div style={{ width: "120px" }}>
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