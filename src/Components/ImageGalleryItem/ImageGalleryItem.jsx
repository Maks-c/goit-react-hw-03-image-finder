import {ImageGalleryItemStyle,ImageGalleryItemImage} from "./ImageGalleryItemStyle";
import PropTypes from "prop-types";
const ImageGalleryItem = ({webformatURL,tags,largeImageURL,onClick,id}) => (
    <ImageGalleryItemStyle key={id}>
       <ImageGalleryItemImage
       src={webformatURL}
       alt={tags}
       onClick={()=>onClick({largeImageURL,tags})}
       />
    </ImageGalleryItemStyle>
)

ImageGalleryItem.propTypes={
    webformatURL:PropTypes.string.isRequired,
    tags:PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired,
    id:PropTypes.number

}


export default ImageGalleryItem;