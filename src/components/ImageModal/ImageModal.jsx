import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ isOpen, onClose, imageData }) {
  if (!imageData) return null;

  const { urls, alt_description, description, likes, created_at, user } =
    imageData;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={css.overlay}
      className={css.modal}
    >
      <img src={urls.regular} alt={alt_description} className={css.image} />

      <div className={css.info}>
        <p>
          <strong>Photo:</strong> "
          {alt_description || description || 'No description'}"
        </p>
        <p>
          <strong>Likes:</strong> {likes}
        </p>
        <p>
          <strong>Published:</strong> {formatDate(created_at)}
        </p>

        <p>
          <strong>Author:</strong> {user.name}
          {user.instagram_username && (
            <> (Instagram: @{user.instagram_username})</>
          )}
        </p>
      </div>
    </Modal>
  );
}
