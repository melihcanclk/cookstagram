import '../styles/searchbar.css'
export const SearchBar = () => {
    return (
        <div>
            <input type="text" className="input-search" id="input-search" />
            <label className="search" htmlFor="input-search"></label>
        </div>
    )
}
