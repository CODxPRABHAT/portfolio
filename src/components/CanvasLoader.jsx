import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
    const { progress } = useProgress();
    console.log("Loading Progress:", progress); // Debugging step

    return (
        <Html
            as="div"
            center
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <span className="canvas-loader" />
            <p style={{ fontSize: 14, color: "#F1F1F1", fontWeight: 800, marginTop: 40 }}>
                {typeof progress === "number" && progress > 0 ? `${progress.toFixed(2)}%` : "Loading..."}
            </p>
        </Html>
    );
};

export default CanvasLoader;
