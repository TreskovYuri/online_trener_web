import Image from 'next/image';
import css from './StarsRow.module.css';
import disable from './img/disable.svg';
import enable from './img/enable.svg';
import { useState } from 'react';

const StarsRow = ({ raiting = 0 }) => {
  const [localRaiting, setLocalRaiting] = useState(raiting);

  const handleMouseEnter = (index) => {
    setLocalRaiting(index);
  };

  const handleMouseLeave = () => {
    setLocalRaiting(raiting);
  };

  return (
    <div className={css.container} onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Image
        width={10}
        height={10}
        unoptimized
          key={star}
          src={localRaiting >= star ? enable : disable}
          alt={`Star ${star}`}
          className={css.star}
          onMouseEnter={() => handleMouseEnter(star)}
        />
      ))}
    </div>
  );
};

export default StarsRow;
