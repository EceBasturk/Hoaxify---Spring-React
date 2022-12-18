import React, { useState, useEffect } from 'react'
import { getObjes } from '../api/apiCalls'
import ObjeView from './ObjeView'
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const ObjeFeed = () => {
    const [objePage, setObjePage] = useState({ content: [], last: true, number: 0 });

    const pendingApiCall = useApiProgress('get', '/api/1.0/objes');

    useEffect(() => {
        loadObjes();
    }, []); // [] mount olduğu anda getiriyor sonra değiştirmiyor.

    const loadObjes = async page => {
        try {
            const response = await getObjes(page);
            setObjePage(previousObjePage => ({
                ...response.data,
                content: [...previousObjePage.content, ...response.data.content]
            }));
        } catch (error) { }
    };

    const { content, last, number } = objePage;

    if (content.length === 0) {
        return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : ('There are no content')}</div>;
    }


    return <div>
        {content.map(obje => {
            return <ObjeView key={obje.id} obje={obje} />
        })}
        {!last && (
            <div
                className="alert alert-secondary text-center"
                style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer' }}
                onClick={pendingApiCall ? () => { } : () => loadObjes(number + 1)}>
                {pendingApiCall ? <Spinner /> : ('Load old content')}
            </div>
        )}
    </div>;
}

export default ObjeFeed;