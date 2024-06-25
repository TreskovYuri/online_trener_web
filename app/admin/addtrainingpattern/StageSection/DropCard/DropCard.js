import { useState } from 'react'
import css from './DropCard.module.css'

const DropCard = ({ dropCallback}) => {
    const [isDrop, setIsDrop] = useState(false)

    // Объект сброшен в элемент
    const handleDrop = (event) => {
        dropCallback()
        setIsDrop(false);
      };
    //  Объект перемещается над элементом.
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDrop(true);
    };
    // Объект наведен на элемент
    const handleDragEnter = (event) => {
    // setIsDrop(true);
    };
    // Объект покидает элемент
    const handleDragLeave = (event) => {
    setIsDrop(false);
    };

      


  return (
    <div className={`${css.card} ${isDrop?css.drop:''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      draggable
    ></div>
  )
}

export default DropCard