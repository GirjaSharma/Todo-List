import './StatusChip.css'

export const StatusChip =({label, status='default'})=>{
    return(
        <span className={`status-chip status-chip-${status}`}>
            {label}
        </span>
    )
};
