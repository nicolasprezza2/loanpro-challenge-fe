import React from "react";
import Pagination from 'react-bootstrap/Pagination';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "./CustomPagination.css"

export default function CustomPagination(props) {

    if (!props.pagination.totalElements) {
        return <></>; 
    }
    const totalPages = Math.ceil(props.pagination.totalElements / props.pagination.pageSize);
    const pages = Array.from({length: totalPages},  (_, i) => i + 1);

    const renderPageNumbers = () => {
        return (            
            <Pagination> 
                {
                    pages.map((page) => {
                        return <Pagination.Item key={page} 
                                    className="pl-2" 
                                    onClick={() =>  props.onPageChanged(page)}
                                    active={page === props.pagination.pageNumber +1}>
                                    {page}
                                </Pagination.Item>
                    })
                }
            </Pagination>
        );
    }

    const renderPageSize = () => {
        return (
            <InputGroup size="sm" className="mb-3 pageSize">
                    <Form.Control
                        defaultValue={props.pagination.pageSize}
                        onChange={(e) => props.onPageSizeChange(e.target.value)}
                    />
            </InputGroup>
        );
    }

    return (
        <div className="pagination">
            {renderPageNumbers()}
            {renderPageSize()}
        </div>
    );
}