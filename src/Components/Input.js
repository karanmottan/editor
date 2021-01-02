import React from 'react';
import io from 'socket.io-client';
import { useEffect } from 'react';
import marked from 'marked';

// https://collab-editor-server.herokuapp.com/

const ENDPOINT = 'https://collab-editor-server.herokuapp.com/';
let socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});;

const Input = () => {

    const handleChange = (e) => {
        socket.emit('usertyping' , e.target.value);
        const input_box = document.querySelector('.input_box');
        const result = document.querySelector('.final_result');
        socket.on('server sending', (value) => {
        console.log('here in server sending');    
        result.innerHTML = marked(value);
        input_box.value = value;
        });
        result.innerHTML = marked(e.target.value);
        input_box.value = e.target.value;

    }
    
    const handleClick = (e) =>{
        console.log('bruh');
        const input_box = document.querySelector('.input_box');
        let data = input_box.value;
        const textToBLOB = new Blob([data], { type: 'text/plain' });
        const sFileName = 'formData.txt';	   // The file to save the data.

        let newLink = document.createElement("a");
        newLink.download = sFileName;

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        }
        else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }

        newLink.click(); 
    }

    useEffect(() => {
        console.log(socket);
    }); 

    return(
        <div className="input_container">
            <h1 className="label">Input</h1>
                <textarea className="input_box" onChange={handleChange}></textarea>
                <button className="input_button" onClick={handleClick}>Save File</button>        
        </div>
    )
}

export default Input;