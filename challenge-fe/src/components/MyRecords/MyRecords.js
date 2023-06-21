import React, {useEffect, useRef, useState} from "react";
import Table  from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getRecordsForCurrentUser, deleteRecord } from "./MyRecordsService";
import CustomPagination from "../CustomPagination/CustomPagination";
import { maskDate } from "../../utils/DateUtils";
import "./MyRecords.css"

import { OPERATORS_MAP } from "../../Constants";


export default function MyRecords() {

    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchInput, setSearchInput] = useState();
    const [shouldFetch, setShouldFetch] = useState(new Boolean(true));
    const [pagination, setPagination] = useState({});
    const [sortDirection, setSortDirection] = useState(null);
    const searchInputRef = useRef();
    
    useEffect(() => {   
        getRecordsForCurrentUser(pagination, getRecordsOnSuccess, getRecordsOnError);
    }, [shouldFetch]);

    const getRecordsOnSuccess = (result) => {
        setRecords(result.data.content);
        setFilteredRecords(result.data.content);
        setPagination({ ...result.data.pageable, totalElements: result.data.totalElements });
    };

    const getRecordsOnError = (error) => {
        console.log(error);
    };

    const refresh = () => {
        setShouldFetch(new Boolean(true));
        setSearchInput();
        searchInputRef.current.value = '';
    }

    const onDeleteSuccess = (response) => {
        refresh()
    }

    const handleRecordDelete = (id) => {
        deleteRecord(id, onDeleteSuccess);
    };

    const onPageChanged = (pageNumber) => { 
        setPagination({...pagination, pageNumber: pageNumber - 1});
        refresh();
    }

    const onPageSizeChange = (pageSize) => {
        if (pageSize <= 0) return;
        setPagination({...pagination, pageSize: pageSize, pageNumber: 0})
        refresh();
    };

    const sortRecords = (property) => { 
        let direction = 'ascending';
        if ( sortDirection === 'ascending') {
            direction = 'descending';
        }

        setSortDirection(direction);
        let sortedRecords = [...filteredRecords];
        sortedRecords.sort((a, b) => {
            if (a[property] < b[property]) {
                return sortDirection === 'ascending' ? -1 : 1;
            }
            if (a[property] > b[property]) {
                return sortDirection === 'ascending' ? 1 : -1;
              }
            return 0;
        });
        setRecords(sortedRecords);  
    }

    const handleSearchChange = (searchValue) => {
        const searchInput = searchValue.toLowerCase();
        const filteredData = records.filter(record => {
            return (
                record.operation.type.toLowerCase().includes(searchInput) ||
                record.amount.toString().includes(searchInput) ||
                record.userBalance.toString().includes(searchInput) ||
                record.response.toLowerCase().includes(searchInput) ||
                record.date.includes(searchInput)
            )
        });
        setFilteredRecords(filteredData);
    };

    const renderRows = () => {
        if (filteredRecords.length === 0) {
            return (
                <tr> 
                    <label>No records found</label>
                </tr>
            );
        }

        return filteredRecords.map((record) => {
            return (
                <tr key={record.id}>
                    <td>{OPERATORS_MAP.get(record.operation.type)}</td>
                    <td>$ {record.amount}</td>
                    <td>$ {record.userBalance}</td>
                    <td>{record.response}</td>
                    <td>{maskDate(record.date)}</td>
                    <td><Button onClick={() => handleRecordDelete(record.id)}>Delete</Button></td>
                </tr>
            )
        });
    }

    const renderHeaders = () => {
        return (
            <tr>
                <th><label onClick={() => sortRecords("operation")}>Operation</label></th>
                <th><label onClick={() => sortRecords("amount")}>Cost</label></th>
                <th><label onClick={() => sortRecords("userBalance")}>Balance</label></th>
                <th><label onClick={() => sortRecords("response")}>Result</label></th>
                <th><label onClick={() => sortRecords("date")}>Date</label></th>
                <th>Actions</th>
            </tr>
        );
    };

    const renderSearch = () => {
        return (
            <InputGroup className="mb-3 w-50 al-center">
                <InputGroup.Text>Search</InputGroup.Text>
                <Form.Control 
                    value={searchInput}
                    ref={searchInputRef }
                    onChange={(e) => handleSearchChange(e.target.value)} />
            </InputGroup> 
        )
    }

    
    return (
        <div className="myRecords">
            {renderSearch()}
            <Table>
                <thead>
                    {renderHeaders()}
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </Table>    
            <CustomPagination pagination={pagination} onPageChanged={onPageChanged} onPageSizeChange={onPageSizeChange}/>
        </div>
    );
}
