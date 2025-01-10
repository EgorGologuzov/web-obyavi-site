import Paragraf from './Paragraf';

export default function ErrorMessage({ children }) {
    return (
    <Paragraf color="warning">Error: {children}</Paragraf>
    );
}