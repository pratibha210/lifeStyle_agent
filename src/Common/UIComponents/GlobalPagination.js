
import React from 'react';
import './uicomponent.css';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

const GlobalPagination = (props) => {

    const [pageNumber, setCurrentPage] = React.useState(1)
    
   const onChange = (e,page) => {
        console.log(page);
        props.pageChange(page)
        setCurrentPage(page)
      };

    return (
        <div className="paginationsectionstart">
            <Pagination 
            count={props.total} 
            variant="outlined" 
            shape="rounded" 
            current={pageNumber} 
            onChange={onChange} 
            />
        </div>
    );
}

GlobalPagination.prototype = {
    recieveSms: PropTypes.bool,
}

export default GlobalPagination;

