export const Checkbox=({checked, onChange, children,id})=>{
return (
    <>
    
        <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        id={id}
        />
        <label htmlFor={id}>
        {children}
        </label>
    </>
)
}