export const Checkbox=({isChecked, checkHandler, children})=>{
return (
    <div>
    <label>
        <input
        type='checkbox'
        checked={isChecked}
        onChange={checkHandler}
       
        />
        {children}
        </label>
    </div>
)
}