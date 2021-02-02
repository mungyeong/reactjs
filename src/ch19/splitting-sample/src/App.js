import React, {useState, Suspense} from "react";
import loadable from "@loadable/component";

const SplitMe = loadable(() => import("./SplitMe"));

function App() {
	const [visible, setVisible] = useState(false);
	const onClick = () => {
		setVisible(!visible);
	};
	const onMouseOver = () => {
		SplitMe.preload();
	};

	return (
		<div className="App">
			<header className="App-header">
				<p onClick={onClick} onMouseOver={onMouseOver}>Hello React!</p>
				<Suspense fallback={<div>LOADING</div>}>
					{visible && <SplitMe/>}
				</Suspense>
			</header>
		</div>
	);
}

export default App;
