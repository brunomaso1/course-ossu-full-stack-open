const errorMessageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

export function ErrorMessage({ message }) {
    if (message === null) {
        return null
    }

    return (
        <div style={errorMessageStyle}>
            {message}
        </div>
    )
}