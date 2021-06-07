import {h, Fragment} from 'preact';
import {useEffect} from 'preact/hooks';
import './Paginator.scss';
import cn from 'classnames';


const Paginator = ({numPages, currentPage, setCurrentPage, changePage, isLoading, className}) => {
    const paginator_addition = '';
    const handlePaginateTo = (event) => {
        event.preventDefault();
        setCurrentPage(Number(event.target.dataset.page));
    };
    
    // const page = currentPage || 1;
    const pageRange = [], pageDelta = 2;

    for (let i = currentPage - pageDelta; i <= currentPage + pageDelta; i++) {
        if ((i >= 1) && (i <= numPages)) {
            pageRange.push(i);
        }
    }

    return (
        <nav className={cn("pagination", className)}>
            {currentPage !== 1 ? (
                <a className={cn("pagination__previous", {disabled: isLoading})}
                   href={`?page=${currentPage - 1}${paginator_addition}`} data-page={currentPage - 1}
                   key="pagination__previous"
                   onClick={handlePaginateTo}> </a>
            ) : (
                <span className="pagination__previous"> </span>
            )}

            <span className="pagination__pages">
                {currentPage > 1 + pageDelta && (
                    <Fragment>
                        <a className={cn("pagination__page", {
                            active: currentPage === 1,
                            disabled: isLoading || currentPage === 1
                        })}
                           href={`?page=1${paginator_addition}`} data-page={1} onClick={handlePaginateTo}>
                            1
                        </a>
                        {currentPage > 1 + pageDelta + 1 && (<span className="pagination__spacer">...</span>)}
                    </Fragment>
                )}

                {pageRange.map(pageNum => (
                    <a className={cn("pagination__page", {
                        active: currentPage === pageNum,
                        disabled: isLoading || currentPage === pageNum
                    })}
                       href={`?page=${pageNum}${paginator_addition}`} data-page={pageNum} key={pageNum}
                       onClick={handlePaginateTo}>
                        {pageNum}
                    </a>
                ))}

                {currentPage < numPages - pageDelta && (
                    <Fragment>
                        {currentPage < numPages - pageDelta - 1 && (<span className="pagination__spacer">...</span>)}
                        <a className={cn("pagination__page", {
                            active: currentPage === numPages,
                            disabled: isLoading || currentPage === numPages
                        })}
                           href={`?page=${numPages}${paginator_addition}`} data-page={numPages}
                           onClick={handlePaginateTo}>
                            {numPages}
                        </a>
                    </Fragment>
                )}
            </span>

            {currentPage !== numPages ? (
                <a className={cn("pagination__next", {disabled: isLoading})}
                   href={`?page=${currentPage + 1}${paginator_addition}`} data-page={currentPage + 1}
                   key="pagination__next"
                   onClick={handlePaginateTo}> </a>
            ) : (
                <span className="pagination__next"> </span>
            )}
        </nav>
    )
};


export default Paginator;
