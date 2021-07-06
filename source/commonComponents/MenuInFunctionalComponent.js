import React, {useState} from 'react';

function MenuInFunctionalComponent(){

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const setMenuIsOpenToTrue = () => {
        setMenuIsOpen(true);
    }
    return(
        <>
            <button
            onClick={setMenuIsOpenToTrue}>Click to view my favourite animes</button>
        </>
    )
}

export default MenuInFunctionalComponent