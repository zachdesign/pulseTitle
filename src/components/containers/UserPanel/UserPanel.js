import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PTButton from '../../ui-elements/PTButton/PTButton';
import UserPanelItem from './UserPanelItem';
import NotificationContent from '../../presentational/temprorary/NotificationContent'
import UserAccountPanel from './UserAccountPanel'

const USER_ACCOUNT_PANEL = 'userAccountPanel';
const NOTIFICATION_CONTENT = 'notificationContent';

export default class UserPanel extends PureComponent {
  state = {
    openedPanel: '',
  };

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({ openedPanel: '' });
    }
  };

  handleMouseDown = (name) => {
    this.setState((prevState) => {
      if (prevState.openedPanel !== name) {
        return ({ openedPanel: name })
      }
      return ({ openedPanel: '' })
    })
  };

  render() {
    const { openedPanel } = this.state;
    return (
      <ul className="user-panel" role="tablist" ref={node => this.node = node}>
        <UserPanelItem className="user-panel-item visible-xs">
          <PTButton className="btn-header">
            <i className="fa fa-search" />
          </PTButton>
        </UserPanelItem>
        <UserPanelItem className={classNames('user-panel-item dropdown', { 'open': openedPanel === NOTIFICATION_CONTENT })}>
          <NotificationContent />
          <PTButton className="btn-header btn-notification" onClick={() => this.handleMouseDown(NOTIFICATION_CONTENT)}>
            <div>
              <i className="fa fa-bell-o" />
              <span className="count">2</span>
            </div>
          </PTButton>
        </UserPanelItem>
        <UserPanelItem className={classNames('user-panel-item dropdown', { 'open': openedPanel === USER_ACCOUNT_PANEL })}>
          <UserAccountPanel onClick={this.handleMouseDown} />
          <PTButton className="btn-header btn-user" onClick={() => this.handleMouseDown(USER_ACCOUNT_PANEL)}>
            <i className="fa fa-user" />
          </PTButton>
        </UserPanelItem>
      </ul>
    )
  }
}
