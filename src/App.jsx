import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

Modal.setAppElement('#root');

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    return () => {
      setIsModalOpen(false);
      setSelectedImage(null);
    };
  }, []);

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    requestAnimationFrame(() => {
      setIsModalOpen(true);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  const perPage = 12;

  const handleSearch = async (topic) => {
    try {
      setLoading(true);
      setArticles([]);
      setError(false);
      setPage(1);
      setQuery(topic);
      setTotalPages(0);

      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: topic,
            page: 1,
            per_page: perPage,
          },
          headers: {
            Authorization: `Client-ID 6Tx1LnkZl5LrhBKo-YGd9FAV8brZ5EdHKnb3Yn6bDS4`,
          },
        },
      );
      setArticles(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!query || page >= totalPages) return;

    try {
      setLoading(true);
      const nextPage = page + 1;

      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            page: nextPage,
            per_page: perPage,
          },
          headers: {
            Authorization: `Client-ID 6Tx1LnkZl5LrhBKo-YGd9FAV8brZ5EdHKnb3Yn6bDS4`,
          },
        },
      );

      setArticles((prevArticles) => [
        ...prevArticles,
        ...response.data.results,
      ]);
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {error ? (
        <ErrorMessage message="Something went wrong. Please try again." />
      ) : (
        <>
          <ImageGallery images={articles} onImageClick={openModal} />
          {loading && <Loader />}
          {articles.length > 0 && page < totalPages && !loading && (
            <LoadMoreBtn onClick={loadMore} />
          )}
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageData={selectedImage}
          />
        </>
      )}
    </>
  );
}
