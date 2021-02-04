import { combineReducers } from 'redux'
import RequestItemReducer from '../requestitem/requestitem.reducer'
import StoreItemReducer from '../storeitem/storeitem.reducer'
import { UserReducer } from '../user/user.reducer'
import verificationReducer from '../verification/verification.reducer'
import UrlReducer from '../url/url.reducer'
import FulfillRequestReducer from '../fulfillrequest/fulfillrequest.reducer'
import ChartReducer from '../chart/chart.reducer'
import ScalingReducer from '../scaling/scaling.reducer'

const rootReducer = combineReducers({
    RequestItemReducer: RequestItemReducer,
    StoreItemReducer: StoreItemReducer,
    verificationReducer: verificationReducer,
    UserReducer: UserReducer,
    UrlReducer: UrlReducer,
    FulfillRequestReducer: FulfillRequestReducer,
    ChartReducer: ChartReducer,
    ScalingReducer: ScalingReducer
})

export default rootReducer