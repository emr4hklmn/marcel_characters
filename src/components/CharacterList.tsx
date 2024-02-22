import React, { useState, useEffect, lazy } from 'react';
import axios from 'axios';
import md5 from 'md5';
import marvelHeader from '../assets/marvel-header.jpg';
const CharacterCard = lazy(() => import('./CharacterCard'));
interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharacterList: React.FC = () => {
  const { REACT_APP_PUBLIC_KEY, REACT_APP_PRIVATE_KEY, REACT_APP_BASE_URL } =
    process.env;
  const publicKey = REACT_APP_PUBLIC_KEY;
  const privateKey = REACT_APP_PRIVATE_KEY;
  const baseURL = REACT_APP_BASE_URL;

  const ts: string = new Date().getTime().toString();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/characters`, {
        params: {
          ts,
          apikey: publicKey,
          hash: md5(ts + privateKey + publicKey),
          offset,
          limit: 30,
        },
      });
      const newCharacters = await response?.data?.data?.results?.filter(
        (value: any) => !value.thumbnail.path.includes('image_not_available')
      );
      console.log('mew', newCharacters);
      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleScroll = () => {
    const { innerHeight, scrollY } = window;
    const isBottom = innerHeight + scrollY >= document.body.offsetHeight;
    if (isBottom && !loading) {
      fetchCharacters();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <section className='landing'>
      <img
        src={marvelHeader}
        className='marvel-header'
        style={{ display: characters?.length > 0 ? 'block' : 'none' }}
      />
      <div className='parent'>
        {characters &&
          characters.map((character: any) => {
            return <CharacterCard key={character.id} character={character} />;
          })}
        {loading && (
          <div
            className={
              characters.length > 0 ? 'loading-panel' : 'loading-panel-center'
            }>
            <h1>Loading....</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default CharacterList;
