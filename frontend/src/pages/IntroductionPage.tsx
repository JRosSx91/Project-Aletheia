// src/pages/IntroductionPage.tsx (Corregido)

import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react"; // Importamos useRef
import * as THREE from "three";
import { SceneController } from "../components/introduction/SceneController";
import { Field } from "../components/introduction/Field"; // Importamos el nuevo componente
import styles from "./IntroductionPage.module.css";

export const IntroductionPage: React.FC = () => {
  // Creamos la referencia que conectará al SceneController con el Field.
  // Usamos 'null!' como aserción para indicar a TS que será asignada.
  const fieldRef = useRef<THREE.Mesh>(null!);

  return (
    <div className={styles.container}>
      <Canvas className={styles.canvas}>
        <ScrollControls pages={5} damping={0.3}>
          {/* Le pasamos la ref al SceneController para que sepa a quién animar. */}
          <SceneController fieldRef={fieldRef} />

          <Scroll>
            {/* Renderizamos el Field y le asignamos la ref. */}
            <Field ref={fieldRef} />
            {/* Aquí irán los futuros componentes 3D */}
          </Scroll>

          {/* CORRECCIÓN: El className ahora va en un div DENTRO del <Scroll html> */}
          <Scroll html>
            <div className={styles.textOverlay}>
              <div className={styles.textSection} style={{ top: "30vh" }}>
                <h1>Capítulo 1: Empiezas Aquí. ¿Pero qué es "Aquí"?</h1>
                <p>Mira a tu alrededor.</p>
                <p>
                  La silla en la que te sientas. La pantalla que tienes delante.
                </p>
                <p>Parece real, ¿verdad? Sólido. Evidente.</p>
              </div>

              <div className={styles.textSection} style={{ top: "120vh" }}>
                <p>
                  Pero, ¿y si te dijera que la "realidad" que percibes es solo
                  un canal sintonizado en un televisor cósmico con infinitos
                  canales?
                </p>
              </div>

              <div className={styles.textSection} style={{ top: "220vh" }}>
                <p>Vamos a cambiar de canal.</p>
                <p>Lo invisible se hace visible.</p>
              </div>

              <div className={styles.textSection} style={{ top: "320vh" }}>
                <p>¿Cuál de las dos imágenes es la "real"?</p>
                <p>
                  La respuesta es inquietante y maravillosa: ambas y ninguna.
                </p>
              </div>

              <div className={styles.textSection} style={{ top: "420vh" }}>
                <h2>Este es nuestro punto de partida.</h2>
                <p>Bienvenido a Aletheia.</p>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};
