import { combineReducers } from 'redux'

import player from './player'
import logged from './logged'
import keySearch from './keySearch'

const allReducers = combineReducers({
    player,
    logged,
    keySearch
})

export default allReducers