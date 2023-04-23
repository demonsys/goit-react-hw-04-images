import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ src, largeImageURL, tags }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={src} alt={tags} className={css.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;
