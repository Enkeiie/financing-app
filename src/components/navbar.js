function Navbar(){
    return (
        <div className="navbar bg-neutral text-base shadow-md">
            <div className="navbar=start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-sm dropdown-content shadow-md bg-base-100 border border-neutral rounded-box w-48 flex flex-col gap-2">
                        <li><button className="btn-success text-base">Add income</button></li>
                        <li><button className="btn-error text-base">Add expense</button></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-lg">myfinance</a>
            </div>
            <div className="navbar-center hidden lg:flex gap-2">
                <ul className="menu menu-horizontal lg:flex gap-2">
                    <li><button className="btn-success text-base">Add income</button></li>
                    <li><button className="btn-error text-base">Add expense</button></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar