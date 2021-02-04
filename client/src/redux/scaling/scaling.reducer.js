const INITIAL_STATE = {
    display_sidebar: false
}

const ScalingReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case "TOOGLE_SIDEBAR_IN_SMALL_SCREEN":
            return {
                ...state,
                display_sidebar: !state.display_sidebar
            }
        default:
            return state
    }
}

export default ScalingReducer