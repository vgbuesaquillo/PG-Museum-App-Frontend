

const InputComponent = ({handleFunc, propVal, name, labelTxt}) => {
  return ( 
    <div style={{marginBottom:"10px"}}>
      <label htmlFor={name}>{labelTxt}</label>
      <input type="text" defaultValue={propVal} name={name} onChange={handleFunc} />
    </div>
   );
}
 
export default InputComponent;