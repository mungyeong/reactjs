import React, {createContext, useState} from "react";

const ColorContext = createContext({
	state: {color:"block", subcolor:"red"},
	actions: {
		setColor: () => {},
		setSubcolor: () => {},
	}
});

const ColorProvider = ({children}) => {
	const [color, setColor] = useState("black");
	const [subcolor, setSubcolor] = useState("red");

	const value = {
		state: {color,subcolor},
		actions: {setColor, setSubcolor}
	};
	return (
		<ColorContext.Provider value={value}>{children}</ColorContext.Provider>
	);
};

const ColorConsumer = ColorContext.Consumer;

export {ColorProvider, ColorConsumer};

export default ColorContext;