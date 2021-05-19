import React, { ReactElement, useState } from 'react';
import styles from './SearchBar.module.scss';
import Icon from '@mdi/react';
import BasicButton from '../buttons/basicButton';
import Select from 'react-select';

export default function SearchBar({ callbackFunc }): ReactElement {
  const [searchParams, setSearchParams] = useState(null);
  const [social, setSocial] = useState([]);
  const [peopleInputSearch, setPeopleInputSearch] = useState('');

  const searchFunction = (e) => {
    e.preventDefault();
    // console.log(`social`, social);
    // console.log('peopleInputSearch :>> ', peopleInputSearch);
    setPeopleInputSearch('');
    callbackFunc([peopleInputSearch, social]);
  };
  /**
   * ?==========================================================================
   * ! OPTIONS AND STYLE FOR THE SOCIAL-SELECT COMPONENT ----START-----------------
   * ?==========================================================================
   */
  const socialOptions = [
    { value: 'github', label: `גיטהאב` },
    { value: 'linkedin', label: 'לינקאדין' },
    { value: 'twitter', label: 'טוויטר' },
    { value: 'facebook', label: 'פייסבוק' },
    { value: 'website', label: 'אתר אישי' },
  ];
  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '5px dotted black',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    control: () => ({
      backgroundColor: 'transparent',
      fontSize: '24px',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      display: 'flex',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    },
  };
  /**
   * ?==========================================================================
   * ! OPTIONS AND STYLE FOR THE SOCIAL-SELECT COMPONENT -----END-----------------
   * ?==========================================================================
   */

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={searchFunction}>
        <div className={styles.searchBar}>
          <input
            value={peopleInputSearch}
            onChange={(e) => {
              setPeopleInputSearch(e.target.value);
            }}
            className={styles.searchBox}
            type="text"
            placeholder="חיפוש אנשים ..."
          />
          <div className={styles.searchBox}>שפות</div>
          <Select
            placeholder={'סושיאל'}
            className={styles.searchBox}
            isMulti
            defaultValue={social}
            onChange={(e) => {
              setSocial([]);
              e.forEach((element) => {
                setSocial((social) => [...social, element.value]);
              });
            }}
            options={socialOptions}
            styles={customSelectStyles}
          />
          <input
            value="חיפוש"
            type="submit"
            className={styles.searchButton}
            onClick={searchFunction}
          />
        </div>
      </form>
    </div>
  );
}
