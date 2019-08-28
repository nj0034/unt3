import React, {useState, useEffect, useRef} from 'react';
import './App.css';

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        setValue(event.target.value)
    };

    return {value, onChange}
};
const instructions = [
    {
        title: '예제1',
        content: '<div>예제 1이다!</div>',
        state: 'ready'
    },
    {
        title: '예제2',
        content: '<div>예제 2이다!</div>',
        state: 'ready'
    },
    {
        title: '예제3',
        content: '<div>예제 3이다!</div>',
        state: 'ready'
    },
    {
        title: '예제4',
        content: '<div>예제 4이다!</div>',
        state: 'ready'
    },
    {
        title: '예제5',
        content: '<div>예제 5이다!</div>',
        state: 'ready'
    },
    {
        title: '예제6',
        content: '<div>예제 6이다!</div>',
        state: 'ready'
    },

];

const useTabs = (initialTabIndex, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTabIndex);
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex
    };
};

// const instState = () => {
//     const [state, setState] = useState('ready');
//
//     const changeState = () => {
//         d
//     }
//
//
// }

const useConfirm = (message = '', onConfirm, onCancel) => {
    if (typeof onConfirm !== 'function' || typeof onCancel !== 'function') {
        return;
    }

    const confirmAction = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    };

    return confirmAction;
};

const useFadeIn = (duration = 3) => {
    const element = useRef();

    useEffect(() => {
        if (element.current) {
            const {current} = element;

            current.style.transition = `opacity ${duration}s`;
            current.style.opacity = 1;
        }
    }, []);

    return {ref: element, style: {opacity: 0}};
};


const App = () => {
    const [number, setNumber] = useState(0);

    const name = useInput("Mr.");

    const {currentItem, changeItem} = useTabs(0, instructions);
    const instState = instState();

    const deleteConfirm = useConfirm('Are you sure on delete??', () => console.log('delete!'), () => console.log('cancel'));

    const fadeInH1 = useFadeIn();


    return (
        <div className="App">
            <div>Hi {number}</div>
            <button onClick={() => setNumber(number + 1)}>+</button>
            <button onClick={() => setNumber(number - 1)}>-</button>

            <div>
                <input placeholder="name" {...name}/>
            </div>

            <button onClick={deleteConfirm}>delete</button>

            <h1 {...fadeInH1}>Hello</h1>

            <div className="parent">
                <div className="inst_list">
                    {instructions.map(((instruction, idx) => (
                        <div>
                            <span>{instruction.state === 'ready' ? '미수행' : '수'}</span>
                            <button onClick={() => changeItem(idx)}>{instruction.title}</button>
                        </div>
                    )))}
                </div>
                <div className="page_source">
                    {currentItem.content}
                </div>

            </div>


        </div>
    );
}

export default App;
