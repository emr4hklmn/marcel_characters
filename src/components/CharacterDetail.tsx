import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { useParams } from 'react-router-dom';
import Comics from './Comics';

const CharacterDetail: React.FC = () => {
  const { characterId } = useParams<{ characterId: any }>();
  const [character, setCharacter] = useState<any | null>(null);
  const [loading, setLoding] = useState(true);
  const [comics, setComics] = useState<any[]>([]);
  const { REACT_APP_PUBLIC_KEY, REACT_APP_PRIVATE_KEY, REACT_APP_BASE_URL } =
    process.env;
  const publicKey = REACT_APP_PUBLIC_KEY;
  const privateKey = REACT_APP_PRIVATE_KEY;
  const baseURL = REACT_APP_BASE_URL;
  const ts: string = new Date().getTime().toString();

  const fetchCharacterDetail = async () => {
    try {
      setLoding(true);
      const response = await axios.get(`${baseURL}/characters`, {
        params: {
          id: characterId,
          ts,
          apikey: publicKey,
          hash: md5(ts + privateKey + publicKey),
        },
      });
      setCharacter(response?.data?.data?.results?.[0]);
      setComics(response?.data?.data?.results?.[0]?.comics);
      getComicDetails(characterId);
    } catch (error) {}
  };
  const getComicDetails = async (characterId: number): Promise<any> => {
    try {
      const responses = await axios.get(
        `${baseURL}/characters/${characterId}/comics`,
        {
          params: {
            ts,
            apikey: publicKey,
            hash: md5(ts + privateKey + publicKey),
            limit: 10,
          },
        }
      );
      let deger = responses.data.data.results.sort((a: any, b: any) =>
        b?.dates?.[0]?.date - a?.dates[0]?.date ? -1 : 1
      );

      setComics(deger);
      setLoding(false);
    } catch (error: any) {
      setLoding(false);
      throw new Error(error.message);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    if (characterId) {
      fetchCharacterDetail();
    }
  }, [characterId]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <div className='div-center'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexDirection: 'column',
          }}>
          {character && (
            <div>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                width='100%'
                height={600}
              />
              <h1>{character.name}</h1>
              <p>{character.description}</p>
            </div>
          )}

          {comics.length > 0 && (
            <div>
              <h2>Comics</h2>

              <Comics comics={comics} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CharacterDetail;
