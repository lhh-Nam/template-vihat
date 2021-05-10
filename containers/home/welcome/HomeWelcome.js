import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// hocs
import withAuth from '../../../hocs/AuthHocs';

// actions
import SessionActions from '../../../reduxs/SessionRedux';
import UserActions from '../../../reduxs/UserRedux';
import RoleActions from '../../../reduxs/RoleRedux';
import GitActions from '../../../reduxs/GitRedux';

// utils
import { getTokenContent } from '../../../utils/WebUtils';

// styles
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

class HomeWelcome extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			classify: {
				user: 'userInfo',
				role: 'roles',
			},
		};
	}


	componentDidMount() {
		const { classify } = this.state;
		this.props.getUserInfo(classify.user, { id: getTokenContent('contact_id') });
		this.props.getRoles(classify.role, { page: 1, size: 15 });
		this.props.getGitRepo();
	}

	_renderUserInfo = () => {
		const { classify } = this.state;
		const { classes, userFetching, userContent } = this.props;
		return (
			<div className={classes.dataField}>
				{userFetching[classify.user] ? 'Loading...' : JSON.stringify(userContent[classify.user])}
			</div>
		)
	}

	_renderListRole = () => {
		const { classify } = this.state;
		const { classes, roleFetching, roleContent } = this.props;
		return (
			<div className={classes.dataField}>
				{roleFetching[classify.role] ? 'Loading...' : JSON.stringify(roleContent[classify.role])}
			</div>
		)
	}

	_renderGitRepo = () => {
		const { gitRepo } = this.props;
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.wrapper}>
				<div className={classes.container}>
					<p>Welcome to this testing page!</p>
					<span>Đây là màn hình demo sau khi đăng nhập thành công, bấm đăng xuất để quay lại màn hình đăng nhập.</span>
					<button onClick={() => this.props.onLogout(true)}>Đăng xuất</button>
					{this._renderUserInfo()}
					{this._renderListRole()}
					{this._renderGitRepo()}
				</div>
			</div>
		);
	}

}

const mapStateToProps = state => {
	const { accessToken } = state.session;
	return {
		// session
		accessToken,
		// user
		userFetching: state.user.fetching,
		userContent: state.user.content,
		// role
		roleFetching: state.role.fetching,
		roleContent: state.role.content,
		gitRepo: state.git,
	};
}

const mapDispatchToProps = dispatch => ({
	// session
	onLogout: (isRedirect) => dispatch(SessionActions.sessionLogout(isRedirect)),
	// user
	getUserInfo: (classify, params) => dispatch(UserActions.getUserInfoRequest(classify, params)),
	// role
	getRoles: (classify, params) => dispatch(RoleActions.getRolesRequest(classify, params)),
	//git 
	getGitRepo: () => dispatch(GitActions.getGitRepo()),
});

export default compose(withAuth(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(HomeWelcome);
