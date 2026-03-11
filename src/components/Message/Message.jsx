import './Message.css';

export const Message=({text, type})=>{
const className=`message message-${type}`
return(
    <div className={className} role="alert">
        {text}
    </div>
)
}