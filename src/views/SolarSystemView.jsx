import './SolarSystemView.css'

function SolarSystem({ onBack }) {
    return (
        <section className="Planets">
            <br />
            <br />
            <button type="button" className="back-button" onClick={onBack}>
               &larr; Back to Hub
            </button>

            <div className="Heading">
                <h1>Our Planets</h1>
            </div>

            <section className="Earth">
                 {/* <div className="earth-image">
                     <img
                         className="earth-img"
                         src={meHeadShot} 
                         alt="Relebohile Mochesane"
                     />
                 </div> */}

                 <div className="project-1-text">
                     <h2>This very website</h2>
                     <br />
                     <p>A fully functional website built using HTML,
                         React and CSS. It stands as the first project and it is through it that I put 
                         into practice some fundamentals of react. It was built from scratch using React as the primary tool,
                         showcasing my approach to web development.</p>
                 </div>
            </section>
        </section>
    );
}

export default SolarSystem;