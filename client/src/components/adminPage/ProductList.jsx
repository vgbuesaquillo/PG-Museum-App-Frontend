import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Store from "../../pages/Store";
import { getAllGallery } from "../../redux/actions/galleryActions";

const ProductList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllGallery())
  }, [])

  return (
    <section style={{margin:"50px auto"}}>
      <Store
        reducer={"galleryReducer"}
        property={"allGallery"}
        title={"Admin Product List"}
        editOptions={true}
      />
    </section>
  );
}

export default ProductList;