"use client";

import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

export default function ScrollAlertsHorizontal() {
    const items = [
        { title: "Accede", text: "A todos los beneficios que tenemos para ti." },
        { title: "Ahorra Más", text: "Dollariza te ayuda a obtener siempre el mejor precio para tus operaciones." },
        { title: "Automatiza tu Cambio", text: "Configura metas y deja que Dollariza trabaje por ti." },
    ];

    return (
        <div style={container}>
            <div style={horizontalScroll}>
                {items.map((item, i) => (
                    <Card key={i} i={i} title={item.title} text={item.text} />
                ))}
            </div>
        </div>
    );
}

interface CardProps {
    title: string;
    text: string;
    i: number;
}

function Card({ title, text, i }: CardProps) {
    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
        >
            <div style={{ ...splash, background: "linear-gradient(306deg, #3A475F, #B63A42)" }} />

            <motion.div style={card} variants={cardVariants} className="card">
                <h3 style={titleStyle}>{title}</h3>
                <p style={textStyle}>{text}</p>
            </motion.div>
        </motion.div>
    );
}

const cardVariants: Variants = {
    offscreen: { y: 200, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        rotate: -6,
        transition: { type: "spring", bounce: 0.4, duration: 0.9 },
    },
};

const container: React.CSSProperties = {
    margin: "80px auto",
    maxWidth: "1100px",
    paddingBottom: "40px",
    overflow: "hidden",
};

const horizontalScroll: React.CSSProperties = {
    display: "flex",
    gap: "60px",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
};

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: "-40px",
    paddingTop: 20,
};

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card: React.CSSProperties = {
    width: 380,
    height: 380,
    borderRadius: 25,
    background: "#ffffff",
    boxShadow:
        "0 0 4px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.08)",
    transformOrigin: "10% 60%",
    padding: "20px 15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 10,
    textAlign: "center",
};

const titleStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: 800,
    color: "#02254A",
    marginBottom: "15px",
};

const textStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "#4A5568",
    lineHeight: "1.5",
};
