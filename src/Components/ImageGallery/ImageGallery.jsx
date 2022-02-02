import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import {ImageGalleryStyle} from "./ImageGalleryStyle";
import PropTypes from "prop-types";
const ImageGallery = ({showQuery,onClick}) => {
    return (
        <ImageGalleryStyle>
            {showQuery.map(({webformatURL, id, tags,largeImageURL}) => (
                <ImageGalleryItem
                    key={id}
                    tags={tags}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    onClick={onClick}
                />
            ))}
        </ImageGalleryStyle>
    )
}


ImageGallery.propTypes={
    showQuery:PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ImageGallery;