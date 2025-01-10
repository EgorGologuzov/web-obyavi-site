import Header from '../components/Header'

export function withOnClick(Component) {
    return function ({ onClick, ...otherProps }) {
        return (
            <div onClick={onClick}>
                <Component {...otherProps} />
            </div>
        )
    }
}

export const Header_withOnClick = withOnClick(Header);