import React from 'react'

const PersonForm = ({ onSubmit, newName, onChangeName, newNumber, onChangeNumber }) => 
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={newName} onChange={onChangeName}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={onChangeNumber}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

export default PersonForm