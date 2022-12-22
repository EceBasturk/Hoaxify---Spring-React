import React, { useState, useEffect } from 'react'
import { getObjes, getOldObjes, getNewObjeCount, getNewObjes } from '../api/apiCalls'
import ObjeView from './ObjeView'
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const ObjeFeed = () => {
    const [objePage, setObjePage] = useState({ content: [], last: true, number: 0 });
    const [newObjeCount, setNewObjeCount] = useState(0);
    const { username } = useParams();
    const path = username ? `/api/1.0/users/${username}/objes?page=` : '/api/1.0/objes?page=';
    const initialObjeLoadProgress = useApiProgress('get', path);

    let lastObjeId = 0;
    let firstObjeId = 0;
    if (objePage.content.length > 0) {
        firstObjeId = objePage.content[0].id;
        const lastObjeIndex = objePage.content.length - 1;
        lastObjeId = objePage.content[lastObjeIndex].id;
    }

    const oldObjePath = username ? `/api/1.0/users/${username}/objes/${lastObjeId}` : `/api/1.0/objes/${lastObjeId}`;
    const loadOldObjesProgress = useApiProgress('get', oldObjePath, true);

    const NewObjePath = username ? `/api/1.0/users/${username}/objes/${firstObjeId}?direction=after` : `/api/1.0/objes/${firstObjeId}?direction=after`
    const loadNewObjesProgress = useApiProgress('get', NewObjePath, true);

    useEffect(() => {
        const getCount = async () => {
            const response = await getNewObjeCount(firstObjeId, username);
            setNewObjeCount(response.data.count);
        };
        let looper = setInterval(getCount, 5000);
        return function cleanup() {
            clearInterval(looper);
        };
    }, [firstObjeId, username]);


    useEffect(() => {
        const loadObjes = async page => {
            try {
                const response = await getObjes(username, page);
                setObjePage(previousObjePage => ({
                    ...response.data,
                    content: [...previousObjePage.content, ...response.data.content]
                }));
            } catch (error) { }
        };
        loadObjes();
    }, [username]);

    const loadOldObjes = async () => {
        const response = await getOldObjes(lastObjeId, username);
        setObjePage(previousObjePage => ({
            ...response.data,
            content: [...previousObjePage.content, ...response.data.content]
        }));
    };

    const loadNewObjes = async () => {
        const response = await getNewObjes(firstObjeId, username);
        setObjePage(previousObjePage => ({
            ...previousObjePage,
            content: [...response.data, ...previousObjePage.content]
        }));
        setNewObjeCount(0);
    };

    const { content, last } = objePage;

    if (content.length === 0) {
        return <div className="alert alert-secondary text-center">{initialObjeLoadProgress ? <Spinner /> : ('There are no content')}</div>;
    }


    return <div>
        {newObjeCount > 0 && (
            <div
                className="alert alert-secondary text-center"
                style={{ cursor: loadNewObjesProgress ? 'not-allowed' : 'pointer' }}
                onClick={loadNewObjesProgress ? () => { } : () => loadNewObjes()}>
                {loadNewObjesProgress ? <Spinner /> : ('There are new content')}
            </div>)}
        {content.map(obje => {
            return <ObjeView key={obje.id} obje={obje} />
        })}
        {!last && (
            <div
                className="alert alert-secondary text-center"
                style={{ cursor: loadOldObjesProgress ? 'not-allowed' : 'pointer' }}
                onClick={loadOldObjesProgress ? () => { } : () => loadOldObjes()}>
                {loadOldObjesProgress ? <Spinner /> : ('Load old content')}
            </div>
        )}
    </div>;
}

export default ObjeFeed;