import React, { useState } from 'react';

import { GetStaticProps } from 'next';
import Description from '../components/description/Description';
import SearchBar from '../components/searchBar/SearchBar';
import Layout from '../components/layout/layout';
import { PersonCard } from '../components/personCard/personCard';
import { getPeople, IPerson } from '../services/people';
import styles from '../styles/Home.module.scss';
import { randomShuffle } from '../utils/randomShuffle';
interface IHomeProps {
  people: IPerson[];
}

export default function Home({ people }: IHomeProps) {
  const [peopleToDisplay, setPeopleToDisplay] = useState(people);

  const [searchPrams, setSearchPrams] = useState([]);
  const callbackFunc = (callbackResult) => {
    console.log(`callbackResult`, callbackResult);
    setSearchPrams(callbackResult);
    console.log(`searchPrams`, searchPrams);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <SearchBar callbackFunc={callbackFunc} />
        <div>{searchPrams[0]}</div>
        <div>{searchPrams[1] && searchPrams[1][0]}</div>

        <Description />
        <div className={styles.cards__wrapper}>
          {people.map((person, i) => (
            <PersonCard key={person.name + i} person={person} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      people: randomShuffle(getPeople()),
    },
  };
};
