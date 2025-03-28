import React, {Suspense} from "react";
import {myProjects} from "../constants/index.js";
import {Canvas} from "@react-three/fiber";
import {Center, OrbitControls} from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader.jsx";
import DemoComputer from "../components/DemoComputer.jsx";

const Projects = props => {
    const currentProject = myProjects[0];
    return (
        <section className="c-space my-20" id="work">
            <p className="head-text">My Work</p>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                <div className="flex flex-col gap-5 relative sm:p-10 px-5 shadow-2xl shadow-black-200">
                    <div className="absolute top-0 right-0">
                        <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />

                    </div>
                    <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle} >
                        <img src={currentProject.logo} alt="logo" className="w-10 h-10 shadow-sm" />
                    </div>
                    <div className="flex flex-col gap-5 text-white-600 my-5">
                        <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
                        <p className="animatedtext">{currentProject.desc}</p>
                        <p className="animatedtext">{currentProject.subdesc}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag,index) => (
                                <div key={index} className="tech-logo">
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
                    <Canvas>
                        <ambientLight intensity={1} />
                        <directionalLight position={[10,10,5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0,-3,0]} rotation={[0,-0.1,0]}>
                                    <DemoComputer texture={currentProject.texture}/>
                                </group>

                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} />
                    </Canvas>
                </div>
            </div>
        </section>
    )
}

export default Projects;