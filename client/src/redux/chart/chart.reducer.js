import CHART_CONSTANT from './chart.constant'

const INITIAL_STATE = {
    is_fetching_pie: false,
    pie_data: [],
    errorMessage_pie: "",
    errorMessage_line: "",
    is_fetching_line: false,
    line_data: [],
}

const ChartReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case CHART_CONSTANT.FETCH_FOR_PIE_START:
            return {
                ...state,
                is_fetching_pie: true
            }
        case CHART_CONSTANT.FETCH_FOR_PIE_SUCCESS:
            const newPayload = action.payload.map(item => {
                item["sum"] = parseInt(item["sum"])
                return item
            })
            return {
                ...state,
                is_fetching_pie: false,
                pie_data: [].concat(newPayload)
            }
        case CHART_CONSTANT.FETCH_FOR_PIE_FAILED:
            return {
                ...state,
                is_fetching_pie: false,
                errorMessage_pie: action.payload
            }
        case CHART_CONSTANT.FETCH_FOR_LINE_START:
            return {
                ...state,
                is_fetching_line: true
            }
        case CHART_CONSTANT.FETCH_FOR_LINE_SUCCESS:
            return {
                ...state,
                is_fetching_line: false,
                line_data: [].concat(action.payload)
            }
        case CHART_CONSTANT.FETCH_FOR_LINE_FAILED:
            return {
                ...state,
                is_fetching_line: false,
                errorMessage_line: action.payload
            }
        default:
            return state
    }
}

export default ChartReducer