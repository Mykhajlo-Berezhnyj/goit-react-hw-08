import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, changeFilterMode } from '../../redux/filtersSlice';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from 'react';

export default function SearchBox() {
  const dispatch = useDispatch();
  const { name, mode } = useSelector(state => state.filters);

  const debounceChangeFilter = useDebouncedCallback(value => {
    dispatch(changeFilter(value));
  }, 300);

  useEffect(() => {
    return () => {
      debounceChangeFilter.cancel();
    };
  }, [debounceChangeFilter]);

  return (
    <div className={css['search-box']}>
      <p className={css['search-p']}>
        Find contacts by {mode === 'all' ? 'name and number' : mode}
      </p>
      <div className={css['search-wrap']}>
        <input
          autoFocus
          className={css['search-input']}
          aria-label="field search contact"
          type="text"
          value={name}
          onChange={evt => debounceChangeFilter(evt.target.value)}
        />
        <select
          name="filter"
          id="filter-mode-select"
          value={mode}
          aria-label="switch search contact"
          className={css['search-select']}
          onChange={evt => dispatch(changeFilterMode(evt.target.value))}
        >
          <option value="all">all</option>
          <option value="name">by name</option>
          <option value="number">by number</option>
        </select>
      </div>
    </div>
  );
}
