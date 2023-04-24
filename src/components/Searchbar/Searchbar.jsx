import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  handlesearchQueryChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase(),
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      alert('Enter search query');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    return this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handlesearchQueryChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
