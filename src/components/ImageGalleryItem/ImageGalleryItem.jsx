import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ src, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(state => !state);

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          src={src}
          alt={tags}
          className={css.ImageGalleryItemImage}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal url={largeImageURL} tag={tags} onClose={toggleModal} />
      )}
    </>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
