import css from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return <div className={css.messageError}>{message}</div>;
}
