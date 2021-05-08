import React from 'react'

function Button({ color, text, onClick }) {
    return (
        <div>
            <button
                className="btn"
                onClick={onClick}
                style={{ backgroundColor: color }}>

                {text}
            </button>
        </div>
    )
}

Button.defaultProps = {
    label: 'Add some label',
    color: 'steelBlue'
}
export default Button
