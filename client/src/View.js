import React, { useState } from 'react'
import './Popup.css'

const Edit = ({ data, show, onClose }) => {
    if (!show) {
        return null
    }

    return (
        <div className='Overlay'>
            <div className='PopUp'>
                <h2>View Task</h2>

                <form>
                    <label><b>ID</b></label><br/>
                    <span>{data.id}</span>

                    <br/><br/>

                    <label><b>Title</b></label><br/>
                    <span>{data.title}</span>

                    <br/><br/>

                    <label><b>Completed?</b></label><br/>
                    <span>{data.completed ? 'Yes' : 'No'}</span>

                    <br/><br/>

                    <label><b>Description</b></label><br/>
                    <span>{data.description}</span>

                    <br/><br/>

                    <label><b>Assignee</b></label><br/>
                    <span>{data.assignee}</span>

                    <br/><br/>

                    <label><b>Remarks</b></label><br/>
                    <span>{data.remarks}</span>
                </form>

                <br/><br/>

                <div>
                    <button onClick={onClose}>Close</button>
                </div>

                <br/>
            </div>
        </div>
    )
}

export default Edit