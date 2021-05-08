import React from 'react'
import { useState } from 'react';

function AddTask({onAdd}) {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [remainder, setRemainder] = useState(false);

    const onSubmit =(e) =>
    {
            e.preventDefault();
            onAdd({text,day,remainder});
            setText('');
            setDay('');
            setRemainder(false);
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type="text" placeholder="Add Task" value= {text} onChange={(e)=>setText(e.target.value)}></input>
            </div>
            <div className='form-control'>
                <label>Date and Time</label>
                <input type="text" placeholder="Add Date & Time" value={day} onChange={(e)=>setDay(e.target.value)}></input>
            </div>
            <div className='form-control form-control-check' value={remainder}>
                <label>Set Remainder</label>
                <input type="checkbox" onChange={(e)=>setRemainder( e.currentTarget.checked)}/>
            </div>
            <input type='submit' value= 'Save Task' className=" btn btn-block"></input>
        </form>
    )
}

export default AddTask
