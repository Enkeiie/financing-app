function Display(props) {
    return (
        <div className="stats bg-neutral shadow-lg w-full md:w-1/3">
            <div className="stat">
                <div className="stat-title md:text-6xl">Total Page Views</div>
                <div className="stat-value md:text-8xl">89,400</div>
                <div className="stat-desc md:text-3xl">21% more than last month</div>
            </div>
        </div>);
}

export default Display;