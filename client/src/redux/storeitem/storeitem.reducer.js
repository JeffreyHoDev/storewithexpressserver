const INITIAL_STATE = {
    displayAddItem: false,
    is_adding: false,
    errorMessage: "",
    storeItem: [],
    is_fetching: false,
    singleItem: [],
    singleItem_is_fetching: false,
    singleItem_is_updating: false
}

const StoreItemReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case "DISPLAY_ADDITEM_COMPONENT":
            return {
                ...state,
                displayAddItem: !state.displayAddItem
            }
        case "ADD_NEW_ITEM_START":
            return {
                ...state,
                is_adding: true
            }
        case "ADD_NEW_ITEM_SUCCESS":
            return {
                ...state,
                is_adding: false,
                errorMessage: ""
            }
        case "ADD_NEW_ITEM_FAILED":
            return {
                ...state,
                is_adding: false,
                errorMessage: action.payload
            }
        case "FETCH_ITEM_START":
            return {
                ...state,
                is_fetching: true
            }
        case "FETCH_ITEM_SUCCESS":
            return {
                ...state,
                is_fetching: false,
                storeItem: Array.from(action.payload)
            }
        case "FETCH_ITEM_FAILED":
            return {
                ...state,
                is_adding: false,
                errorMessage: action.payload
            }
        case "FETCH_SINGLEITEM_START":
            return {
                ...state,
                singleItem_is_fetching: true
            }
        case "FETCH_SINGLEITEM_SUCCESS":
            return {
                ...state,
                singleItem_is_fetching: false,
                singleItem: Array.from(action.payload)
            }
        case "FETCH_SINGLEITEM_FAILED":
            return {
                ...state,
                singleItem_is_fetching: false,
                errorMessage: action.payload
            }
        case "UPDATE_SINGLEITEM_START":
            return {
                ...state,
                singleItem_is_updating: true
            }
        case "UPDATE_SINGLEITEM_SUCCESS":
            return {
                ...state,
                singleItem_is_updating: false
            }
        case "UPDATE_SINGLEITEM_FAILED":
            return {
                ...state,
                singleItem_is_updating: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default StoreItemReducer