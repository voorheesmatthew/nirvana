import { connect } from 'react-redux';
import React from 'react';
import Dash from './dash';
import { logout } from '../../actions/session_actions';
import { requestTeamMembers, requestUser } from '../../actions/user_actions';
import { requestProjectsByTeamId } from '../../actions/project_actions';
import { requestTeam, requestAllTeams} from '../../actions/team_actions';
import { requestTasksByUserId } from '../../actions/task_actions';
import { selectProjectMembers,
  selectAllTeams,
  selectTeamMembers,
  selectCurrentTeam,
  selectAllProjects,
  selectAllTasks
} from '../../reducers/selectors';

// TODO: remove unused imports

const mapStateToProps = (state) => {
  const teams = selectAllTeams(state);
  const projects = selectAllProjects(state);
  const tasks = selectAllTasks(state);
  const currentUser = state.entities.users.currentUser || state.session.loggedInUser;

  return {
    teams,
    projects,
    tasks,
    currentUser,
    currentTeam: selectCurrentTeam(state) || teams[0],
    loggedInUser: state.session.loggedInUser,
    projectMembers: selectProjectMembers(state),
    teamMembers: selectTeamMembers(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    requestTeamMembers: (teamId) => dispatch(requestTeamMembers(teamId)),
    requestTeam: (teamId) => dispatch(requestTeam(teamId)),
    requestUser: (userId) => dispatch(requestUser(userId)),
    requestTasksByUserId: (userId) => dispatch(requestTasksByUserId(userId)),
    requestAllTeams: () => dispatch(requestAllTeams()),
    requestProjectsByTeamId: (teamId) => dispatch(requestProjectsByTeamId(teamId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
