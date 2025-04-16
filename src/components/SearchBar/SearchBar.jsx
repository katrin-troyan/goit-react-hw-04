import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value.trim();
    if (topic === '') {
      toast.error('Please fill in the search field!');
      return;
    }

    onSubmit(topic);
    form.reset();
  };

  return (
    <header>
      <form className={css.formSearchBar} onSubmit={handleSubmit}>
        <input
          className={css.inputSearchBar}
          type="text"
          name="topic"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.buttonSearchBar} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
