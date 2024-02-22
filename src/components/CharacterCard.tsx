import React from 'react';
import { useNavigate } from 'react-router-dom';
interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: string;
  };
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    thumbnail: { path, extension },
    comics: { available },
  } = character;
  return (
    <div className='card-body'>
      <div className='character-image-container'>
        <img
          className='character-image'
          src={`${path}/portrait_incredible.${extension}`}
          alt={name}
          width='100%'
          height={300}
        />
        <div className='available'>{available ? available : 'Not Acted'}</div>
      </div>
      <h2>{name.slice(0, 20)}</h2>
      <button onClick={() => navigate(`/detail/${id}`)} className='detail-btn'>
        Detail
      </button>
    </div>
  );
};

export default CharacterCard;
