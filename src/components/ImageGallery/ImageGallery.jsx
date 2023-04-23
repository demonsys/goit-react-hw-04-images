import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { Component } from 'react';
import api from '../../services/pixabay-api';

class ImageGallery extends Component {
  state = {
    hits: null,
    totalHits: 0,
    error: null,
    status: 'idle',
    page: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      try {
        const response = await api.fetchImages(this.props.searchQuery, 1);
        this.setState({
          totalHits: response.totalHits,
          hits: response.hits,
          status: 'resolved',
          //!!!! переделать!!!!!!!
          page: 1,
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }
  onLoadMore = async () => {
    const response = await api.fetchImages(
      this.props.searchQuery,
      this.state.page + 1
    );
    this.setState(state => ({
      hits: [...state.hits, ...response.hits],
      status: 'resolved',
      page: state.page + 1,
    }));
  };
  componentDidMount() {}
  render() {
    const { status, hits, error } = this.state;

    if (status === 'idle') {
      return <div>Enter a search query</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <ErrorBlock message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {hits.map(imageItem => (
              <ImageGalleryItem
                key={imageItem.id}
                src={imageItem.webformatURL}
                largeImageURL={imageItem.largeImageURL}
                tags={imageItem.tags}
              />
            ))}
          </ul>
          {this.state.totalHits / 12 > this.state.page && (
            <Button onClick={this.onLoadMore} />
          )}
        </>
      );
    }
  }
}
export default ImageGallery;
