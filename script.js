/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const nav = document.getElementById("navMenu");

    nav.classList.toggle("active");

}


/* ================= THREE.JS GLOBE ================= */

const container =
    document.getElementById("globe-container");

if (container) {

    const scene =
        new THREE.Scene();

    const camera =
        new THREE.PerspectiveCamera(
            45,
            container.clientWidth /
            container.clientHeight,
            0.1,
            1000
        );

    camera.position.z = 3;

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(renderer.domElement);


    /* ================= EARTH ================= */

    const geometry =
        new THREE.SphereGeometry(
            1,
            64,
            64
        );


    const material =
        new THREE.MeshPhongMaterial({

            color: 0x168fd0,

            transparent: true,

            opacity: 0.9,

            shininess: 80

        });


    const earth =
        new THREE.Mesh(
            geometry,
            material
        );

    scene.add(earth);


    /* ================= GLOW ================= */

    const glowGeometry =
        new THREE.SphereGeometry(
            1.08,
            64,
            64
        );


    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x32bfff,

            transparent: true,

            opacity: 0.08,

            side: THREE.BackSide

        });


    const glow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );

    scene.add(glow);


    /* ================= LIGHTS ================= */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.2
        );

    scene.add(ambientLight);


    const directionalLight =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    directionalLight.position.set(
        5,
        3,
        5
    );

    scene.add(directionalLight);


    /* ================= STARS ================= */

    const starGeometry =
        new THREE.BufferGeometry();

    const starCount = 1200;

    const starPositions =
        new Float32Array(
            starCount * 3
        );


    for (
        let i = 0;
        i < starCount * 3;
        i++
    ) {

        starPositions[i] =
            (Math.random() - 0.5) * 8;

    }


    starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            starPositions,
            3
        )
    );


    const starMaterial =
        new THREE.PointsMaterial({

            color: 0xffffff,

            size: 0.012,

            transparent: true,

            opacity: 0.8

        });


    const stars =
        new THREE.Points(
            starGeometry,
            starMaterial
        );

    scene.add(stars);


    /* ================= ANIMATION ================= */

    function animate() {

        requestAnimationFrame(
            animate
        );

        earth.rotation.y += 0.002;

        glow.rotation.y -= 0.0005;

        stars.rotation.y += 0.00015;

        renderer.render(
            scene,
            camera
        );

    }

    animate();


    /* ================= RESIZE ================= */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                container.clientWidth /
                container.clientHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                container.clientWidth,
                container.clientHeight
            );

        }
    );

}


/* ================= VISA FORM ================= */

const visaForm =
    document.getElementById(
        "visaForm"
    );


if (visaForm) {

    visaForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value;

            const phone =
                document.getElementById(
                    "phone"
                ).value;

            const visaType =
                document.getElementById(
                    "visaType"
                ).value;

            const country =
                document.getElementById(
                    "country"
                ).value;


            if (
                !name ||
                !phone ||
                !visaType ||
                !country
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            alert(
                "Thank you " +
                name +
                "! Your visa inquiry has been submitted."
            );


            visaForm.reset();

        }
    );

}
