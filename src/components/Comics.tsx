import React from 'react';

type Props = {
  comics: any[];
};

export default function Comics({ comics }: Props) {
  return (
    <div className='parent'>
      {comics?.map((comic: any, index: number) => {
        const {
          id,
          title,
          thumbnail: { path, extension },
        } = comic;
        let imageSrc = `${path}.${extension}`;
        return (
          <div key={id + index} className='card-body'>
            <img src={imageSrc} alt={title} width='100%' height={300} />
            <h4>{title}</h4>
            <p>{new Date(comic.dates[0].date).toLocaleDateString()}</p>
          </div>
        );
      })}
    </div>
  );
}
