import Modal from "./modal";
import ThemeSwitcher from "./theme-switcher";
const Navbar = () => {
    return (
        <div className="navbar bg-base-100 text-base shadow-md">
            <Modal type="modal-expense"/>
            <Modal type="modal-income"/>
            <div className="navbar=start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-sm dropdown-content shadow-md bg-base-100 border border-neutral rounded-box w-48 flex flex-col gap-2">
                        <li><button className="btn-success text-base" onClick={()=>document.getElementById('modal-income').showModal()}>Add income</button></li>
                        <li><button className="btn-error text-base" onClick={()=>document.getElementById('modal-expense').showModal()}>Add expense</button></li>
                        <li><ThemeSwitcher/></li>
                    </ul>
                </div>
                <button className="btn xl:btn-lg btn-sm btn-ghost xl:text-lg">myfinance</button>
            </div>
            <div className="navbar-center hidden md:flex gap-2">
                <div className="menu menu-horizontal md:flex gap-2">
                    <button className="btn xl:btn-lg btn-sm btn-success xl:text-lg" onClick={()=>document.getElementById('modal-income').showModal()}>Add income</button>
                    <button className="btn xl:btn-lg btn-sm btn-error xl:text-lg" onClick={()=>document.getElementById('modal-expense').showModal()}>Add expense</button>
                </div>
            </div>
            <div className="fixed right-2 hidden md:block">
                <ThemeSwitcher/>
            </div>
        </div>
    );
}

export default Navbar