import { useState } from 'react'
import css from './DropCard.module.css'
import { observer } from 'mobx-react-lite';
import { CirclePlus } from 'lucide-react';

const DropCard = observer(({ dropCallback,type='1'}) => {
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

      

  if(type==='1'){
    return (
      <div className={`${css.card} ${isDrop?css.drop:''}`}
  
      ><span className={``}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      ></span></div>
    )
  }else{
    return (
      <div className={`${css.card1} ${isDrop?css.drop1:''}`}
  
      ><span className={``}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      ><CirclePlus  className={css.plus}/></span></div>
    )
  }

})

export default DropCard