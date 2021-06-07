import {h} from 'preact'
import {useState, useEffect, useMemo} from 'preact/hooks'
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router';

import {api, apiEducationSrc} from '../../../../common';
import * as dumbData from '../dumbData';
import {showError} from '../../../../common/utils'

const useLearnCardList = (user) => {
    const {t} = useTranslation();
    const [data, setData] = useState({
        isLoading: true,
        data: [],
        err: null,
    });

    const [page, setPage] = useState(1);

    const [postsPerPage, setPostsPerPage] = useState(6);

    const [lang, setLang] = useState({
        isLoading: true,
        data: [{id: 0, name: t('Learning.types.all')}],
        err: null
    });
    const {langId} = useParams();
    const history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const courseId = params.get('content_format');

    const [activeLang, setActiveLang] = useState(langId || 0)
    const [courseType, setCourseType] = useState(courseId || "all")



    const translatedTypes = useMemo(() => {
        let newObj = [];
        dumbData.courseType.forEach(({value}) => {
            newObj = [...newObj, {value, label: t(`Learning.types.${value}`)}];
        });
        return newObj;
    }, [dumbData.courseType]);

    // on first load we serve data from URL

    useEffect(() => {
        if (!user) return history.push('/')
        if (courseId) setCourseType(courseId);
        setActiveLang(langId)
        setPage(1);
        api.get(`${apiEducationSrc}/material/language`).then(res => {
            setLang((prevState) => ({isLoading: false, data: [...prevState.data, ...res], err: null}));
        }).catch((err) => {
            setActiveLang(0)
        }).finally((res) => {
            setLang(prevState => ({...prevState, isLoading: false}))
        })
    }
        , [])

    useEffect(() => {
        if (!user) return history.push('/')
        history.push(`/learning/language/${activeLang}?content_format=${courseType}`);

        setPage(1);
    }, [courseType, activeLang, history]);

    useEffect(() => {
        setData(() => ({res: {}, err: null, isLoading: true}))

        const filterOpts = !courseType || courseType === "all" ? "" : `&content_format=${courseType}`
        const languageOpts = !activeLang || activeLang === "0" ? '?' : `?language=${activeLang}&`;

        api.get(`${apiEducationSrc}/material${languageOpts}page=${page}&page_size=${postsPerPage}${filterOpts}`)
            .then((res) => {
                setData(() => ({res}));
            })
            .catch((err) => {
                if (!navigator.onLine) {
                    showError(t('errors.offline'));
                    setData(() => ({res: null, err: t('errors.offline')}))
                } else if (err.status >= 500 && err.status < 600) {

                }  else {
                    showError(t('errors.unknown'));
                }
            }).finally(() => {
                setData((prevState) => ({...prevState, isLoading: false}))

            });
    }, [activeLang, courseType, page, postsPerPage]);


    const selectLang = (lang) => {
        localStorage.setItem('langId', lang);
        setCourseType('all');
        setPage(1)
        return setActiveLang(lang);
    };

    const selectType = data => {
        setPage(1)
        setCourseType(data)
    }
    const onPagesPerPost = nr => {
        setPage(1);
        setPostsPerPage(nr)
    }

    const mappedLang = Array.isArray(lang.data) && lang.data.map(({id, name}) => ({label: name, value: id.toLocaleString()}))

    return (
        {
            translatedTypes,
            page, setPage,
            postsPerPage, onPagesPerPost,
            selectLang,
            courseType,
            selectType,
            data,
            mappedLang,
            activeLang
        }
    )
}

export default useLearnCardList
