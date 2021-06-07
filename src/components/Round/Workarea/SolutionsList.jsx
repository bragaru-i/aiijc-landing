import {h, Fragment} from 'preact';
import {useState, useEffect, useCallback} from 'preact/hooks';
import SolutionCard from '../SolutionCard';
import Paginator from '../../../common/Components/Paginator';
import cn from 'classnames';
import {useTranslation} from 'react-i18next';
import s from './style.module.scss';
import './SolutionsList.scss';


export const SolutionsList = ({solutions, isNotUserChoice}) => {
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterPerPage, setFilterPerPage] = useState(10);
    const [filteredSolutions, setFilteredSolutions] = useState(solutions);

    const filterSolutions = useCallback(
        () => {
            const start = (currentPage - 1) * filterPerPage;
            const end = start + filterPerPage;
            setFilteredSolutions(solutions.slice(start, end));
        },
        [solutions, currentPage, filterPerPage],
    );

    useEffect(() => {
        if (solutions && solutions.length) {
            filterSolutions();
        }
    }, [solutions, currentPage, filterPerPage]);


    return (
        <>
            {(!solutions || solutions.length === 0) && (<div className={s.solutionsEmpty}>{t("Workarea.emptyList.noLoaded")}</div>)}

            {filteredSolutions && solutions && solutions.length && (
                <>
                    <div>
                        {filteredSolutions.map((solution) => <SolutionCard key={solution.id} solution={solution} isNotUserChoice={isNotUserChoice} />)}
                    </div>
                    <div className="ratingFooter">
                        <Paginator numPages={Math.ceil(solutions.length / filterPerPage)} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        <div className="pageFilter">
                            <span className="pageFilterLabel">{t('Rating.filterPerPage')}</span>
                            <span className={cn({active: filterPerPage === 5})} onClick={() => {setCurrentPage(1); setFilterPerPage(5);}}>5</span>
                            <span className={cn({active: filterPerPage === 10})} onClick={() => {setCurrentPage(1); setFilterPerPage(10);}}>10</span>
                            <span className={cn({active: filterPerPage === 20})} onClick={() => {setCurrentPage(1); setFilterPerPage(20);}}>20</span>
                            <span className={cn({active: filterPerPage === 30})} onClick={() => {setCurrentPage(1); setFilterPerPage(30);}}>30</span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
