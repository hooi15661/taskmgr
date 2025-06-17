import React, { useState } from 'react'
import './Popup.css'

var data = {
    title: '',
    description: '',
    assignee: '',
    remarks: ''
}

const Add = ({ show, onCancel, onSubmit }) => {
    const [inputValue, setInputValue] = useState(null)

    if (!show) {
        return null
    }

    const handleInput = (param1, param2) => {
        data[param1] = param2
        setInputValue(data[param1])
    }

    const handleSubmit = () => {
        if (data.title == '') {
            alert("Title required!")
            return
        }
        if (data.description == '') {
            alert("Description required!")
            return
        }
        if (data.assignee == '') {
            alert("Assignee required!")
            return
        }

        onSubmit(data)
        setInputValue('')
    }

    return (
        <div className='Overlay'>
            <div className='PopUp'>
                <h2>Add Task</h2>

                <form>
                    <label className='required'><b>Title</b></label><br/>
                    <input type='text' value={data.title} onChange={(e) => handleInput('title', e.target.value)}/>

                    <br/><br/>

                    <label className='required'><b>Description</b></label><br/>
                    <textarea value={data.description} onChange={(e) => handleInput('description', e.target.value)}/>

                    <br/><br/>

                    <label className='required'><b>Assignee</b></label><br/>
                    <input type='text' value={data.assignee} onChange={(e) => handleInput('assignee', e.target.value)}/>

                    <br/><br/>

                    <label><b>Remarks</b></label><br/>
                    <textarea value={data.remarks} onChange={(e) => handleInput('remarks', e.target.value)}/>
                </form>

                <br/><br/>

                <div>
                    <button onClick={handleSubmit}>Submit</button>
                    <span style={{marginLeft: '10px'}}></span>
                    <button onClick={onCancel}>Cancel</button>
                </div>
                <br/>
            </div>
        </div>
    )
}

export default Add