import React, {useState, useMemo} from "react";

const getAverage = numbers => {
    console.log("평균 구하는 중");
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
}

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState("");

    const onChange = e => {
        setNumber(e.target.value);
    };

    const onInsert = () => {
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber("");
    };

    const onRemoveAll = e => {
        setList(list.splice());
    };


    const avg = useMemo(() => getAverage(list), [list]);


    return (
        <div>
            <input value={number} onChange={onChange}/>
            <button onClick={onInsert}>등록</button>
            <button onClick={onRemoveAll}>전체삭제</button>
            <ul>
                {list.map((value, index) => (<li key={index}>{value}</li>))}
            </ul>
            <div>
                <b>평균: </b>{avg}
            </div>
        </div>
    );
};

export default Average;

