import Header from "./Header";
import Subcaption from "./Subcaption";
import Switch from "./Switch";
import Avatar from "./Avatar";
import StarsBar from "./StarsBar";
import { Header_withOnClick } from "../hoc/Header_withOnClick";

const Ad = ({img,title,description,checked,user,price,onTitleClick,onAvatarClick}) => {
    return ( 
        <div className="ad">
            <div className="ad__img-presenter">
                                    <img src={img}/>
                                </div>
                                <div className="ad__text-info">
                                    <Header_withOnClick level={1} onClick={onTitleClick}>{title}</Header_withOnClick>
                                    <Subcaption level={2}>{user.location}</Subcaption>
                                    <Subcaption level={1} color={'text'}>{description}</Subcaption>
                                    <Header level={3} color={'text'}>{price} руб.</Header>
                                </div>
                                <Switch checked={checked}/>
                                <div className="ad__user-info">
                                    <Avatar src={user.avatar} onClick={onAvatarClick}/>
                                    <Header level={5}>{user.firstname} {user.lastname}</Header>
                                    <StarsBar input_mode={false} value={user.rating}/>
                                    <Subcaption level={2} color={'secondary'}>Отзывы</Subcaption>
                                    </div>
                                </div>
    );
}
 
export default Ad;