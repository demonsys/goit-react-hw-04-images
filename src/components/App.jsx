import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
// import Button from './Button/Button';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
  };
  handleSearchbarSubmit = searchQuery => {
    this.setState({
      searchQuery,
    });
  };
  // onLoadMore = () => {};
  async componentDidMount() {}
  render() {
    return (
      <>
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {this.state.loading && <Loader />}
          <ImageGallery searchQuery={this.state.searchQuery} />
          {/* <Button onClick={this.onLoadMore} /> */}
        </div>
      </>
    );
  }
}
