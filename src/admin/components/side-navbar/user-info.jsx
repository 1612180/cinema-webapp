import React from 'react'
import { connect } from 'react-redux'
import { Link } from '../common/link'
import { NigamonIcon } from '../common/nigamon-icon'
import { userInfo, logOut } from '../../stores/app-state/app-state.action'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { email } = this.props.userInfo
        return (
            <div className="row justify-content-between align-items-center mx-2 border-bottom border-secondary">
                <p className="text-secondary h6" onClick={this.props.onClick}>{email}</p>
                <p className="h2">
                    <Link href="/admin/logout">
                        <NigamonIcon name="sign-out-alt" />
                    </Link>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.appState.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeUserInfo: (info) => dispatch(userInfo(info)),
        logOut: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)