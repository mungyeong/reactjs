import React from "react";
import {withRouter} from "react-router-dom";
import WithRouterSample from "./WithRouterSample"


const data = {
	developer: {
		name       : "정문경",
		description: "개발자"
	},
	tester   : {
		name       : "TESTER",
		description: "TESTER 계정"
	}
};

const Profile = ({match}) => {
	const {username} = match.params;
	const profile = data[username];
	if (!profile) {
		return <div>존재하지 않는 사용자입니다.</div>;
	}
	return (
		<div>
			<h3>
				{username} ({profile.name})
			</h3>
			<p>{profile.description}</p>
			<WithRouterSample/>
		</div>
	);
};

export default withRouter(Profile);