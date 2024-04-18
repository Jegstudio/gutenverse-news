import { useState, useEffect } from '@wordpress/element';
import { select } from '@wordpress/data';

const MyBlock = ( props ) => {
    const [ categories, setCategories ] = useState( [] );

    useEffect( () => {
        const selectedCategories = select( 'core/editor' ).getEditedPostAttribute( 'categories' );
        setCategories( selectedCategories );
    }, [] );

    return (
        <div>
            <p>Selected Categories:</p>
            <ul>
                { categories.map( ( category ) => (
                    <li key={ category }>{ category }</li>
                ) ) }
            </ul>
        </div>
    );
};

export default MyBlock;

///////////////////

import { useState, useEffect } from '@wordpress/element';
import { select, subscribe } from '@wordpress/data';

const MyBlock = ( props ) => {
    const [ categories, setCategories ] = useState( [] );

    useEffect( () => {
        const selectedCategories = select( 'core/editor' ).getEditedPostAttribute( 'categories' );
        setCategories( selectedCategories );

        const unsubscribe = subscribe( () => {
            const updatedCategories = select( 'core/editor' ).getEditedPostAttribute( 'categories' );
            setCategories( updatedCategories );
        } );

        return () => {
            unsubscribe();
        };
    }, [] );

    return (
        <div>
            <p>Selected Categories:</p>
            <ul>
                { categories.map( ( category ) => (
                    <li key={ category }>{ category }</li>
                ) ) }
            </ul>
        </div>
    );
};

export default MyBlock;

