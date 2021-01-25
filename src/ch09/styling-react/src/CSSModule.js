import React from "react";
import classNames from "classnames/bind";
import styles from "./CSSModule.module.scss";

const cx = classNames.bind(styles);

const CSSModule = () => {
	const name = "리액트";
	const message = `제 이름은 ${name} 입니다.`;
	return (
		<div className={cx("wrapper","inverted")}>
			<span>{message}</span><br />
			안녕하세요. 저는 <spam className="something">CSS Module!</spam>
		</div>
	)
};

export default CSSModule;