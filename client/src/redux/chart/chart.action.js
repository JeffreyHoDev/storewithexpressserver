import CHART_CONSTANT from './chart.constant'

export const FETCH_FOR_PIE_START = () => ({
    type: CHART_CONSTANT.FETCH_FOR_PIE_START
})

export const FETCH_FOR_PIE_SUCCESS = (data) => ({
    type: CHART_CONSTANT.FETCH_FOR_PIE_SUCCESS,
    payload: data
})

export const FETCH_FOR_PIE_FAILED = (error) => ({
    type: CHART_CONSTANT.FETCH_FOR_PIE_FAILED,
    payload: error
})

export const FETCH_FOR_LINE_START = () => ({
    type: CHART_CONSTANT.FETCH_FOR_LINE_START
})

export const FETCH_FOR_LINE_SUCCESS = (data) => ({
    type: CHART_CONSTANT.FETCH_FOR_LINE_SUCCESS,
    payload: data
})

export const FETCH_FOR_LINE_FAILED = (error) => ({
    type: CHART_CONSTANT.FETCH_FOR_LINE_FAILED,
    payload: error
})

// START - ASYNC action handler
export const FETCH_FOR_PIE_ASYNC = (start_date, end_date) => {
    return dispatch => {
        dispatch(FETCH_FOR_PIE_START())
        fetch('/get_pie', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "start_date": start_date,
                "end_date": end_date
            })
        })
        .then(response => response.json())
        .then(data => dispatch(FETCH_FOR_PIE_SUCCESS(data)))
        .catch(err => dispatch(FETCH_FOR_PIE_FAILED(err)))
    }
}

export const FETCH_FOR_LINE_ASYNC = (start_date, end_date) => {
    return dispatch => {
        dispatch(FETCH_FOR_LINE_START())
        fetch('/get_line', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "start_date": start_date,
                "end_date": end_date
            })
        })
        .then(response => response.json())
        .then(data => dispatch(FETCH_FOR_LINE_SUCCESS(data)))
        .catch(err => dispatch(FETCH_FOR_LINE_FAILED(err)))
    }
}
// END - ASYNC action handler