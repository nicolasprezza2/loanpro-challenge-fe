import axios from "axios";
import { BACKEND_URL } from "../../Constants";

export const getRecordsForCurrentUser = (pagination, onSuccess, onError) => {

    const url = BACKEND_URL +
         '/record' + 
         '?page=' + pagination.pageNumber +
         '&size=' + pagination.pageSize

    axios.get(url)
        .then((response) => onSuccess(response))
        .catch((e) => onError(e));
}

export const deleteRecord = (id, onSuccess) => {
    axios.delete(BACKEND_URL + '/record/' + id )
        .then((response) => onSuccess(response))
        .catch();
}