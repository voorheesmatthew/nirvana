import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIconContainer from '../user/profile_icon_container';
import TaskIndexContainer from '../task/task_index_container';
import SettingsModal from './settings_container';
import ProjectListContainer from './../project/project_list_container.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.requestAllTeams().then(() => {
      const curTeamId = this.props.currentTeam.id;
      this.props.requestTeam(curTeamId);
      this.props.requestProjectsByTeamId(curTeamId);
    });
    this.props.requestTeamMembers(this.props.currentUser.teamIds[0]);
    this.props.requestUser(this.props.currentUser.id);
  }

  logout() {
    this.props.logout();
  }

  render() {
    // TODO: refactor this into SettingsContainer
    const {
      currentUser,
      currentTeam,
      teams,
      teamMembers,
      requestUser,
      loggedInUser,
      requestTeam,
      requestTeamMembers,
      requestTasksByUserId,
      projects,
      requestAllTeams,
      requestProjectsByTeamId
    } = this.props;

    const avatarUrl = currentUser.avatarUrl;

    const profiles = teamMembers.map((user) => {
      return (
        <li className="profile" key={user.id} >
          <ProfileIconContainer user={user} />
        </li>
      );
    });
    
    const ownProfile = <ProfileIconContainer user={ currentUser } />;

    return (
      <div className="dash">
        <div className="dash-sidebar">
          <li className="logo_dark"></li>
          <ul className="dash-sidebar__member-avatars">
            {profiles}
          </ul>

          <ProjectListContainer projects={projects} />
        </div>

        <div className="dash-tasks">

          <ul className="dash-nav">
            <div className="dash-nav--left">
              <li className="dash-nav__item dash-nav__item--selected">My Tasks</li>
              <li className="dash-nav__item">Inbox</li>
            </div>

            <div className="dash-nav--center">
              <li className="dash-nav__item">
                <input className="dash-search" type="text" placeholder="Search"/>
              </li>
            </div>

            <SettingsModal
              teamName={ currentTeam ? currentTeam.name : 'Loading...' }
              avatarUrl={ loggedInUser.avatarUrl }
              logout={ this.logout }
              teams={ teams }
              currentUserId={ currentUser.id }
              currentTeam={ currentTeam }
              requestTeam={ requestTeam }
              requestTeamMembers={ requestTeamMembers }
              requestAllTeams={ requestAllTeams }
              requestUser={ requestUser }
              requestTasksByUserId={ requestTasksByUserId }
              requestProjectsByTeamId={ requestProjectsByTeamId }
            />
          </ul>

          <div className="dash-sub-nav">
            <div className="dash-sub-nav__header">
              <img className="dash-sub-nav__header-avatar" src={ currentUser.avatarUrl } />
              <h1 className="dash-sub-nav__header-team">
                {currentUser.id === loggedInUser.id ? 'My' : `${currentUser.name}'s`} Tasks in { currentTeam ? currentTeam.name : 'Loading...' }
              </h1>
            </div>

            <ul className="dash-sub-nav__navbar">
              <li className="dash-sub-nav__navbar-item dash-sub-nav__navbar-item--selected">List</li>
              <li className="dash-sub-nav__navbar-item">Calendar</li>
              <li className="dash-sub-nav__navbar-item">Files</li>
            </ul>
          </div>

          <TaskIndexContainer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
