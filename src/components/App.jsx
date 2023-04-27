import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ErrorBlock from './ErrorBlock/ErrorBlock';
import api from '.././services/pixabay-api';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const notFound = totalHits === 0 && status === 'resolved';
  useEffect(() => {
    async function fetchData() {
      setStatus('pending');
      try {
        const response = await api.fetchImages(searchQuery, page);
        setHits(state => [...state, ...response.hits]);
        setTotalHits(response.totalHits);
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }
    if (searchQuery === '') {
      return;
    }
    fetchData();
  }, [searchQuery, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollBy({
        top: 552,
        behavior: 'smooth',
      });
    }
  }, [hits, page]);

  const handleSearchbarSubmit = newSearchQuery => {
    if (newSearchQuery === '') {
      toast.warn('Search query is empty');
      return setStatus('idle');
    }
    if (newSearchQuery === searchQuery) {
      return toast.warn(
        `Search results for the query '${newSearchQuery}' are already on the screen`
      );
    }
    setSearchQuery(newSearchQuery);
    setHits([]);
    setPage(1);
  };

  const onLoadMore = () => setPage(state => state + 1);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {status === 'idle' && <div>Enter a search query</div>}
      {notFound && (
        <div>Ups, nothing is found by request. Try another search query.</div>
      )}
      {status === 'rejected' && <ErrorBlock message={error.message} />}
      {(status === 'resolved' || status === 'pending') && (
        <ImageGallery imageCollection={hits} />
      )}
      {status === 'pending' && <Loader />}
      {totalHits / 12 > page && status === 'resolved' && (
        <Button onClick={onLoadMore} />
      )}
      <ToastContainer />
    </div>
  );
}
