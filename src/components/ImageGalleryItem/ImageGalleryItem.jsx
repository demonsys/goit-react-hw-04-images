import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { src, largeImageURL, tags } = this.props;

    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            src={src}
            alt={tags}
            className={css.ImageGalleryItemImage}
            onClick={this.toggleModal}
          />
        </li>
        {this.state.showModal && (
          <Modal url={largeImageURL} tag={tags} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
