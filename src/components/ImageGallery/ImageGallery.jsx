import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imageCollection }) => {
  return (
    <ul className={css.ImageGallery}>
      {imageCollection.map(imageItem => (
        <ImageGalleryItem
          key={imageItem.id}
          src={imageItem.webformatURL}
          largeImageURL={imageItem.largeImageURL}
          tags={imageItem.tags}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  imageCollection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGallery;
