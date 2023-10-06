export function Filter({ setSearchTerm, serachTerm }) {

    function handleSearchTermChange(event) {
        return setSearchTerm(event.target.value);
    }

    return (
        <div>filter shown with:
            <input onChange={handleSearchTermChange} value={serachTerm}></input>
        </div>
    )
}
