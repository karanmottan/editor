import React from 'react';

const Output = () => {

    const handleClick = () => {
        console.log('handled click');
        const output_box = document.querySelector('.final_result');
        let data = output_box.innerText;
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

    return(
            <div className="output_container">
                <h1 className="label">Markdown</h1>
                <div className="final_result"></div>
                <button className="output_button" onClick={handleClick}>Save File</button>
            </div>
        
    )
}

export default Output;