import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AudioOutlined, AudioTwoTone,EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import useSpeechRecognition from './UseSpeechRecognition';


const InputField = ({ changeHandler, labelName }) => {

    const [lang, setLang] = useState('en-US');
    const [value, setValue] = useState('');
    const [blocked, setBlocked] = useState(false);

    const onEnd = () => {
        // You could do something here after listening has finished
        changeHandler(value);
    };

    const onResult = (result) => {
        setValue(result);
    };

    const changeLang = (event) => {
        setLang(event.target.value);
    };

    const onError = (event) => {
        if (event.error === 'not-allowed') {
            setBlocked(true);
        }
    };

    const { listen, listening, stop, supported } = useSpeechRecognition({
        onResult,
        onEnd,
        onError,
    });

    const toggle = listening
        ? stop
        : () => {
            console.log("Pressed!")
            setBlocked(false);
            listen({ lang });
        };

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleTextChange = (event) =>{
        changeHandler(event.target.value);
        setValue(event.target.value);
    }

    return (
        <>
            <Input
                type="text"
                id="transcript"
                value = {value}
                placeholder={labelName}
                onChange={handleTextChange}
                suffix= {listening? <AudioTwoTone
                            style={{
                            fontSize: 16,
                            color: '#1890ff',
                            }}
                            onClick = {toggle}
                        />:<AudioOutlined 
                        style={{
                            fontSize: 16,
                            color: 'black',
                            }}
                            onClick = {toggle}
                        />
                        }
                
            />
        </>
    );
}

export default InputField;