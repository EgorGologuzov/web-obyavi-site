const Logo = ({sizeFull=false,onClick}) => {
    let className=sizeFull?'logo-full':'logo';
    return (
        <div className={className}>
            <button className={className+'_button'} onClick={onClick}/>
        </div>
    );
}
 
export default Logo;