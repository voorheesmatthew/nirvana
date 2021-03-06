import * as UsersApiUtil from '../util/users_api_util';

import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import teamsReducer from './teams_reducer';
import tasksReducer from './tasks_reducer';
import projectsReducer from './projects_reducer';

export default combineReducers({
  users: usersReducer,
  teams: teamsReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
});
