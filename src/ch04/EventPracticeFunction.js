import React, {useState} from "react";

const EventPracticeFunction = () => {
    const [form, setForm] = useState({
        username:"",
        message:"",
    })

    const {username, message} = form;

    const onChange = e => {
        const nextForm = {
            ...form,
            [e.target.name]:e.target.value
        };
        setForm(nextForm)
    };

    const onClick = () => {
        alert(username+" "+message);
        setForm({
            username:"",
            message:""
        });
    };
    
    const onKeyPress = e => {
        if(e.key === "Enter"){
            onClick();
        }
    };

    return (
        <>
            <h1>이벤트 연습2</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자 이름"
                value={username}
                onChange={onChange}
            />
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={message}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <button onClick={onClick}>확인</button>
        </>
    );
}

export default EventPracticeFunction;