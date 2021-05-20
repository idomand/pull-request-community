import React, { useState, useEffect } from 'react';

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
  /**
 //* searchPrams ==>  searchPrams[0] = people search('string'). searchPrams[1] = social search(string[]). 
 */
  const [searchPrams, setSearchPrams] = useState([]);
  const callbackFunc = (callbackResult) => {
    console.log(`searchPrams`, callbackResult);
    setSearchPrams(callbackResult);
  };

  //!========
  useEffect(() => {
    let newPeopleArray = [];
    let count = 0;
    if (searchPrams[1]) {
      console.log(`searchPrams[1]`, searchPrams[1]);
      if (searchPrams[1].length > 0) {
        for (let i = 0; i < people.length; i++) {
          for (let h = 0; h < searchPrams[1].length; h++) {
            if (people[i][searchPrams[1]]) {
              console.log(`people[i][searchPrams[1]]`, people[i][searchPrams[1]]);
              newPeopleArray.push(people[i]);
              count++;
            }
          }
        }
        console.log(`newPeopleArray`, newPeopleArray);
        console.log(`count`, count);
        setPeopleToDisplay(newPeopleArray);
      }
    }
  }, [searchPrams]);

  return (
    <Layout>
      <div className={styles.container}>
        <div>{searchPrams[0]}</div>
        <div>
          {searchPrams[1] &&
            searchPrams[1].map((element) => {
              return <div>{element}</div>;
            })[0]}
        </div>

        <SearchBar callbackFunc={callbackFunc} />

        <Description />
        <div className={styles.cards__wrapper}>
          {peopleToDisplay.map((person, i) => (
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
