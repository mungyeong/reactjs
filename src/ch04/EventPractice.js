import React, {Component} from "react";

class EventPractice extends Component {
    state = {
        username:"",
        message: ""
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = () => {
        alert(this.state.username + " " +this.state.message);
        this.setState({ username:"",message:""});
    }

    handlekeyPress = (e) => {
        if(e.key === "Enter"){
            this.handleClick();
        }
    }


    render() {
        return (
            <>
                <h1>이벤트 연습</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="사용자 이름"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해보세요."
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={this.handlekeyPress}
                />
                <button onClick={this.handleClick}>확인</button>
            </>
        );
    }
}

export default EventPractice;