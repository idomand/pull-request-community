import React, { ReactElement, useState, useRef } from 'react';
import styles from './SearchBar.module.scss';
import Icon from '@mdi/react';
import BasicButton from '../buttons/basicButton';
import {
  mdiFacebook,
  mdiGithub,
  mdiLinkedin,
  mdiTwitter,
  mdiWeb,
  mdiStackOverflow,
  mdiMastodon,
} from '@mdi/js';

const arrayOfSocialOptions = [{ name: 'linkdin' }];

const renderSocialOptions = () => {};

export default function SearchBar({}: Props): ReactElement {
  const [social, setSocial] = useState([]);
  const [peopleInputSearch, setPeopleInputSearch] = useState('');
  const searchFunction = (e) => {
    e.preventDefault();
    console.log('peopleInputSearch :>> ', peopleInputSearch);

    setPeopleInputSearch('');
  };

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

          <div className={styles.searchBox}>סושיאל</div>
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
