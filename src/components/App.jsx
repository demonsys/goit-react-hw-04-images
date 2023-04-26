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
      if (page > 1) {
        window.scrollBy({
          top: 552,
          behavior: 'smooth',
        });
      }
    }
    if (searchQuery === '') {
      return;
    }
    fetchData();
  }, [searchQuery, page]);

  // useEffect(() => {
  //   if (page > 1) {
  //     window.scrollBy({
  //       top: 552,
  //       behavior: 'smooth',
  //     });
  //   }
  // }, [hits, page]);

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

// Old code
// export default class oldApp extends Component {
//   state = {
//     searchQuery: '',
//     hits: [],
//     totalHits: 0,
//     page: 1,
//     error: null,
//     status: 'idle',
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ status: 'pending' });
//       try {
//         const response = await api.fetchImages(
//           this.state.searchQuery,
//           this.state.page
//         );
//         this.setState(state => ({
//           hits: [...state.hits, ...response.hits],
//           totalHits: response.totalHits,
//           status: 'resolved',
//         }));
//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//     }
//     // Если была нажата кнопка "Загрузить еще" то пролистываем вниз
//     if (this.state.page > 1) {
//       window.scrollBy({
//         top: 552,
//         behavior: 'smooth',
//       });
//     }
//   }
//   handleSearchbarSubmit = searchQuery => {
//     if (searchQuery.trim() === '') {
//       toast.warn('Search query is empty');
//       return this.setState({
//         status: 'idle',
//       });
//     }
//     if (searchQuery === this.state.searchQuery) {
//       return toast.warn(
//         `Search results for the query '${searchQuery}' are already on the screen`
//       );
//     }
//     this.setState({
//       searchQuery,
//       hits: [],
//       page: 1,
//     });
//   };
//   onLoadMore = () => {
//     this.setState(state => ({
//       page: state.page + 1,
//     }));
//   };
//   render() {
//     const { status, hits, error, totalHits, page } = this.state;
//     const notFound = totalHits === 0 && status === 'resolved';

//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.handleSearchbarSubmit} />
//         {status === 'idle' && <div>Enter a search query</div>}
//         {notFound && (
//           <div>Ups, nothing is found by request. Try another search query.</div>
//         )}
//         {status === 'rejected' && <ErrorBlock message={error.message} />}
//         {(status === 'resolved' || status === 'pending') && (
//           <ImageGallery imageCollection={hits} />
//         )}
//         {status === 'pending' && <Loader />}
//         {totalHits / 12 > page && status === 'resolved' && (
//           <Button onClick={this.onLoadMore} />
//         )}
//         <ToastContainer />
//       </div>
//     );
//   }
// }
