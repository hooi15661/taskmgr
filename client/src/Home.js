import React, { useState, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiEye, mdiPencil, mdiDelete, mdiRefresh, mdiFilePlus } from '@mdi/js'
import './Home.css'

import Add from './Add'
import Edit from './Edit'
import View from './View'

var taskList = []

function Home() {
    useEffect(() => {
        getTasks()
    }, [])

    const [data, changeData] = useState([])
    const [addTaskVisible, setAddTaskVisible] = useState(false)
    const [editTaskVisible, setEditTaskVisible] = useState(false)
    const [viewTaskVisible, setViewTaskVisible] = useState(false)
    const [selectedData, setSelectedData] = useState(null)

    const startEdit = (v) => {
        var temp = structuredClone(v)
        setSelectedData(temp)
        setEditTaskVisible(true)
    }
    const submitEdit = (v) => {
        setEditTaskVisible(false)
        editTask(v)
    }
    const cancelEdit = () => { setEditTaskVisible(false) }

    const startAdd = () => { setAddTaskVisible(true) }
    const submitAdd = (data) => {
        setAddTaskVisible(false)
        addTask(data)
    }
    const cancelAdd = () => { setAddTaskVisible(false) }

    const openView = (v) => {
        var temp = structuredClone(v)
        setSelectedData(temp)
        setViewTaskVisible(true)
    }
    const closeView = () => { setViewTaskVisible(false) }

    const getTasks = async() => {
        try {
            var r = await fetch('http://localhost:9990/getTasks', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({}),
            })
            var temp = await r.json()
            if (temp.error) {
                alert("Error: " + temp.error.code)
            } else {
                taskList = [...temp.row]
                changeData(data => [...taskList])
            }
        } catch(e) {
            console.log(e)
        }
    }

    const deleteTask = async(v) => {
        if (window.confirm("Are you sure to delete this task?") == false)
            return

        try {
            var r = await fetch('http://localhost:9990/deleteTask', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ args: { id: v } })
            })
            var temp = await r.json()
            if (temp.error)
                alert("Error: " + temp.error.code)
            else
                alert("Task deleted!")

            getTasks()
        } catch(e) {
            console.log(e)
        }
    }

    const addTask = async(v) => {
        try {
            var r = await fetch('http://localhost:9990/addTask', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ args: v })
            })
            var temp = await r.json()
            if (temp.error)
                alert("Error: " + temp.error.code)
            else
                alert("Task added!")

            getTasks()
        } catch(e) {
            console.log(e)
        }
    }

    const editTask = async(v) => {
        try {

            var r = await fetch('http://localhost:9990/editTask', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ args: v })
            })
            var temp = await r.json()
            if (temp.error)
                alert("Error: " + temp.error.code)
            else
                alert("Task edited!")

            getTasks()

        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className='App'>
            <Add
                show={addTaskVisible}
                onSubmit={submitAdd}
                onCancel={cancelAdd}
            />

            <Edit
                data={selectedData}
                show={editTaskVisible}
                onSubmit={submitEdit}
                onCancel={cancelEdit}
            />

            <View
                data={selectedData}
                show={viewTaskVisible}
                onClose={closeView}
            />

            <h1>Task Manager</h1>

            <div>
                <button onClick={() => startAdd()}>
                    <Icon path={mdiFilePlus} size={1}/>
                    <span>Add Task</span>
                </button>
                <button onClick={getTasks}>
                    <Icon path={mdiRefresh} size={1}/>
                    <span>Get Tasks</span>
                </button>
            </div>

            <hr/>

            <h2>Tasks</h2>
            <div>
            <table>
                <thead>
                    <tr>
                        <th style={{width: '10%'}}>ID</th>
                        <th style={{width: '40%'}}>Title</th>
                        <th style={{width: '20%'}}>Assignee</th>
                        <th style={{width: '15%'}}>Completed</th>
                        <th colSpan={3} style={{width: '15%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.assignee}</td>
                            <td>{item.completed ? 'Yes' : 'No'}</td>
                            <td><Icon path={mdiEye} size={1} onClick={() => openView(item)}/></td>
                            <td><Icon path={mdiPencil} size={1} onClick={() => startEdit(item)}/></td>
                            <td><Icon path={mdiDelete} size={1} onClick={() => deleteTask(item.id)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Home