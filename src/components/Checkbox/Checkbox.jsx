import './Checkbox.css';

export const Checkbox=({checked, onChange, children,id})=>{

return (
    <div className="checkbox-container">
    
        <input
        className='checkbox-input'
        type='checkbox'
        checked={checked}
        onChange={onChange}
        id={id}
        />
        <label htmlFor={id} className={checked ? 'checkbox-label completed' : 'checkbox-label'}>
        {children}
        </label>
    </div>
)
}