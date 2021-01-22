import React, {useState, useEffect} from "react";

const Info = () => {
    const [name, setName] = useState("");
    const [nickname, setNickName] = useState("");

    useEffect(() => {
        console.log("마운트됨");
    }, []);

    useEffect(() => {
        console.log("nickname:",nickname);
    }, [nickname]);

    useEffect(() => {
        console.log("name:",name);
    }, [name]);

    useEffect(() => {
        console.log("effect");
        console.log("name:",name);
        return () => {
            console.log("cleanup");
            console.log("name:",name);
        };
    },[]);

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeNickName = e => {
        setNickName(e.target.value);
    }

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName}/>
                <input value={nickname} onChange={onChangeNickName}/>
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;
