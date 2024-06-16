import { Search } from 'lucide-react';
import css from './HeaderSearchFilter.module.css'
import OpacityDiv from '../../MOTION/OpacityDiv/OpacityDiv';
import { useState } from 'react';

const HeaderSearchFilter = ({ value, setValue }) => {
    const [modal, setModal] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className={css.btn} onClick={() => setModal(!modal)}>
            <Search className={css.search} />
            {modal && (
                <OpacityDiv>
                    <div
                        className={css.inputBox}
                        onClick={e => e.stopPropagation()}
                    >
                        <input
                            className={css.input}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </OpacityDiv>
            )}
        </div>
    );
}

export default HeaderSearchFilter;
