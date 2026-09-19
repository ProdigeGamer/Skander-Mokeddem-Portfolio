/* =========================================================
   SKANDER MOKEDDEM — PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const topicImages = {
        hero: "url('assets/images/IMG_3203.JPEG')",
        about: "url('assets/images/IMG_3223.JPEG')",
        projects: "url('assets/images/IMG_3184.JPEG')",
        skills: "url('assets/images/IMG_3200_Nero_AI_Image_Upscaler_Photo_Face.jpeg')",
        path: "url('assets/images/IMG_3195_Nero_AI_Image_Upscaler_Photo_Face.jpeg')",
        experience: "url('assets/images/IMG_3203.JPEG')",
        looking: "url('assets/images/IMG_3223.JPEG')",
        personal: "url('assets/images/IMG_3184.JPEG')",
        contact: "url('assets/images/IMG_3209_Nero_AI_Image_Upscaler_Photo_Face.jpeg')"
    };

    const sections = document.querySelectorAll("main section");
    const topicByIndex = ["hero", "about", "projects", "skills", "path", "experience", "looking", "personal", "contact"];

    const backdropLayers = [0, 1].map(() => {
        const layer = document.createElement("div");
        layer.className = "topic-backdrop";
        layer.setAttribute("aria-hidden", "true");
        document.body.prepend(layer);
        return layer;
    });

    let activeBackdrop = 0;
    let activeTopic = "";

    const updateBackdrop = (topic) => {
        if (!topic || topic === activeTopic || !topicImages[topic]) {
            return;
        }

        const nextBackdrop = activeBackdrop === 0 ? 1 : 0;
        const nextLayer = backdropLayers[nextBackdrop];
        const currentLayer = backdropLayers[activeBackdrop];

        nextLayer.style.setProperty("--backdrop-image", topicImages[topic]);
        nextLayer.classList.add("is-visible");
        currentLayer.classList.remove("is-visible");
        activeBackdrop = nextBackdrop;
        activeTopic = topic;
    };

    sections.forEach((section, index) => {
        section.dataset.topic = section.id || topicByIndex[index];
    });

    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.prepend(progress);

    const updateScrollEffects = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressValue = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        document.documentElement.style.setProperty("--scroll-progress", `${progressValue}%`);
        document.documentElement.style.setProperty("--scroll-shift", `${Math.round(window.scrollY * -0.08)}px`);
    };

    updateScrollEffects();
    window.addEventListener("scroll", updateScrollEffects, { passive: true });

    const topicObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const topic = entry.target.dataset.topic;
            document.body.dataset.topic = topic;
            updateBackdrop(topic);
        });
    }, {
        threshold: 0.18,
        rootMargin: "-18% 0px -55%"
    });

    sections.forEach((section) => topicObserver.observe(section));

    /* =====================================================
       SYSTEM DIAGRAM
    ===================================================== */

    const systemDetail =
        document.getElementById("system-detail");

    const systemCells =
        document.querySelectorAll(".sys__cell");

    const messages = [

        "PC → Wi-Fi → Pico → motors: the project is treated as one complete system.",

        "The wireless link allows the operator to send movement commands to the rover.",

        "The Raspberry Pi Pico handles embedded logic, timing and motor commands.",

        "The final test is physical: the code must produce the expected movement on the rover."

    ];


    systemCells.forEach((cell, index) => {

        const showMessage = () => {

            if (!systemDetail) {
                return;
            }

            systemDetail.textContent =
                messages[index];

        };


        cell.addEventListener(
            "mouseenter",
            showMessage
        );


        cell.addEventListener(
            "focus",
            showMessage
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".feature, .bom__row, .skills__group, .path__item, .entry, .want__block, .personal__grid article"
        );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(18px)";

        element.style.transition =
            "opacity 0.55s ease, transform 0.55s ease";

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            }, {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navigableSections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".header__link"
        );


    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.id;


                    navLinks.forEach((link) => {

                        const href =
                            link.getAttribute("href");

                        link.style.opacity =
                            href === `#${currentId}` ?
                            "1" :
                            "0.65";

                    });

                });

            }, {
                threshold: 0.25
            }
        );


    navigableSections.forEach((section) => {

        navObserver.observe(section);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        new Date().getFullYear();

    const footer =
        document.querySelector(".footer");

    if (footer) {

        const yearElement =
            footer.querySelector("span");

        if (yearElement) {

            yearElement.textContent =
                `© ${year} Skander Mokeddem`;

        }

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       ROVER ODOMETRY SIMULATOR
    ===================================================== */

    const roverCanvas = document.getElementById("rover-canvas");
    const roverSim = document.getElementById("rover-sim-container");

    if (roverCanvas && roverSim) {
        const canvasContext = roverCanvas.getContext("2d");
        const xyMetric = document.getElementById("telemetry-xy");
        const headingMetric = document.getElementById("telemetry-heading");
        const pwmMetric = document.getElementById("telemetry-pwm");
        const routeSquareButton = document.getElementById("sim-btn-square");
        const routeSlalomButton = document.getElementById("sim-btn-circle");
        const resetButton = document.getElementById("sim-btn-reset");
        let route = "square";
        let progress = 0;
        let animationFrame;

        const resizeCanvas = () => {
            const pixelRatio = window.devicePixelRatio || 1;
            const bounds = roverCanvas.getBoundingClientRect();
            roverCanvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
            roverCanvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
            canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            drawSimulation();
        };

        const getRoverState = (routeProgress = progress) => {
            if (route === "slalom") {
                const angle = routeProgress * Math.PI * 4;
                return {
                    x: Math.sin(angle) * 0.75,
                    y: routeProgress * 1.9 - 0.95,
                    heading: (Math.atan2(Math.cos(angle) * 0.75, 1.9 / (Math.PI * 4)) * 180) / Math.PI
                };
            }

            const side = routeProgress * 4;
            if (side < 1) return { x: side - 0.5, y: -0.5, heading: 0 };
            if (side < 2) return { x: 0.5, y: side - 1.5, heading: 90 };
            if (side < 3) return { x: 1.5 - side, y: 0.5, heading: 180 };
            return { x: -0.5, y: 3.5 - side, heading: 270 };
        };

        const updateTelemetry = (state) => {
            xyMetric.textContent = `X: ${state.x >= 0 ? "+" : ""}${state.x.toFixed(2)}m | Y: ${state.y >= 0 ? "+" : ""}${state.y.toFixed(2)}m`;
            headingMetric.textContent = `${((state.heading + 360) % 360).toFixed(1)}°`;
            pwmMetric.textContent = progress === 0 ? "M1..M4: 0" : "M1..M4: 52";
        };

        function drawSimulation() {
            const width = roverCanvas.clientWidth;
            const height = roverCanvas.clientHeight;
            const scale = Math.min(width, height) / 3.2;
            const centerX = width / 2;
            const centerY = height / 2;
            const toCanvas = (x, y) => ({ x: centerX + x * scale, y: centerY - y * scale });

            canvasContext.clearRect(0, 0, width, height);
            canvasContext.strokeStyle = "rgba(148, 163, 184, 0.12)";
            canvasContext.lineWidth = 1;
            for (let x = -1.5; x <= 1.5; x += 0.5) {
                const point = toCanvas(x, 0);
                canvasContext.beginPath();
                canvasContext.moveTo(point.x, 0);
                canvasContext.lineTo(point.x, height);
                canvasContext.stroke();
            }
            for (let y = -1.5; y <= 1.5; y += 0.5) {
                const point = toCanvas(0, y);
                canvasContext.beginPath();
                canvasContext.moveTo(0, point.y);
                canvasContext.lineTo(width, point.y);
                canvasContext.stroke();
            }

            canvasContext.strokeStyle = "#00f0ff";
            canvasContext.lineWidth = 2;
            canvasContext.beginPath();
            for (let index = 0; index <= 80; index += 1) {
                const routeProgress = index / 80;
                const routeState = getRoverState(routeProgress);
                const point = toCanvas(routeState.x, routeState.y);
                if (index === 0) canvasContext.moveTo(point.x, point.y);
                else canvasContext.lineTo(point.x, point.y);
            }
            canvasContext.stroke();

            const state = getRoverState();
            const roverPoint = toCanvas(state.x, state.y);
            canvasContext.save();
            canvasContext.translate(roverPoint.x, roverPoint.y);
            canvasContext.rotate((state.heading * Math.PI) / 180);
            canvasContext.fillStyle = "#ffb703";
            canvasContext.fillRect(-8, -6, 16, 12);
            canvasContext.fillStyle = "#080c14";
            canvasContext.beginPath();
            canvasContext.moveTo(11, 0);
            canvasContext.lineTo(4, -4);
            canvasContext.lineTo(4, 4);
            canvasContext.closePath();
            canvasContext.fill();
            canvasContext.restore();
            updateTelemetry(state);
        }

        const animateRoute = (selectedRoute) => {
            route = selectedRoute;
            progress = 0;
            cancelAnimationFrame(animationFrame);
            const startedAt = performance.now();
            const animate = (now) => {
                progress = Math.min((now - startedAt) / 6000, 1);
                drawSimulation();
                if (progress < 1) animationFrame = requestAnimationFrame(animate);
            };
            animationFrame = requestAnimationFrame(animate);
        };

        routeSquareButton.addEventListener("click", () => animateRoute("square"));
        routeSlalomButton.addEventListener("click", () => animateRoute("slalom"));
        resetButton.addEventListener("click", () => {
            cancelAnimationFrame(animationFrame);
            route = "square";
            progress = 0;
            drawSimulation();
        });
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
    }


    /* =========================================================
   SIMULATEUR DE TRAJECTOIRE ET ODOMÉTRIE DU ROVER
   ========================================================= */

    document.addEventListener("DOMContentLoaded", () => {
        const canvas = document.getElementById("rover-canvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        // Éléments de télémétrie UI
        const txtXY = document.getElementById("telemetry-xy");
        const txtHeading = document.getElementById("telemetry-heading");
        const txtPWM = document.getElementById("telemetry-pwm");

        // Boutons
        const btnSquare = document.getElementById("sim-btn-square");
        const btnCircle = document.getElementById("sim-btn-circle");
        const btnReset = document.getElementById("sim-btn-reset");

        let scale = 80; // pixels par mètre
        let originX = 0;
        let originY = 0;

        // État du Rover
        let rover = {
            x: 0, // Mètres
            y: 0, // Mètres
            theta: 0, // Radians
            v: 0, // Vitesse m/s (référence ~0.3 m/s)
            w: 0, // Vitesse angulaire rad/s
            path: [{ x: 0, y: 0 }],
            pwm: 0
        };

        let sequence = [];
        let sequenceIndex = 0;
        let stepTimer = 0;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            originX = canvas.width / 2;
            originY = canvas.height / 2;
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Séquence : Parcours en Carré (4 segments d'environ 1m)
        function startSquareSequence() {
            resetSimulation();
            sequence = [
                { v: 0.3, w: 0, duration: 110, cmd: 'Z (Avancer)', pwm: 300 },
                { v: 0, w: Math.PI / 2, duration: 20, cmd: 'D (Pivot 90°)', pwm: 300 },
                { v: 0.3, w: 0, duration: 110, cmd: 'Z (Avancer)', pwm: 300 },
                { v: 0, w: Math.PI / 2, duration: 20, cmd: 'D (Pivot 90°)', pwm: 300 },
                { v: 0.3, w: 0, duration: 110, cmd: 'Z (Avancer)', pwm: 300 },
                { v: 0, w: Math.PI / 2, duration: 20, cmd: 'D (Pivot 90°)', pwm: 300 },
                { v: 0.3, w: 0, duration: 110, cmd: 'Z (Avancer)', pwm: 300 },
                { v: 0, w: 0, duration: 0, cmd: 'N (Stop)', pwm: 0 }
            ];
            sequenceIndex = 0;
            stepTimer = 0;
        }

        // Séquence : Cercle / Virage continu
        function startCircleSequence() {
            resetSimulation();
            sequence = [
                { v: 0.25, w: 0.4, duration: 320, cmd: 'Z + D (Virage)', pwm: 250 },
                { v: 0, w: 0, duration: 0, cmd: 'N (Stop)', pwm: 0 }
            ];
            sequenceIndex = 0;
            stepTimer = 0;
        }

        function resetSimulation() {
            rover = {
                x: 0,
                y: 0,
                theta: 0,
                v: 0,
                w: 0,
                path: [{ x: 0, y: 0 }],
                pwm: 0
            };
            sequence = [];
            sequenceIndex = 0;
            stepTimer = 0;
            updateUI("STOP", 0);
        }

        if (btnSquare) btnSquare.addEventListener("click", startSquareSequence);
        if (btnCircle) btnCircle.addEventListener("click", startCircleSequence);
        if (btnReset) btnReset.addEventListener("click", resetSimulation);

        function updatePhysics() {
            if (sequence.length > 0 && sequenceIndex < sequence.length) {
                const currentStep = sequence[sequenceIndex];
                rover.v = currentStep.v;
                rover.w = currentStep.w;
                rover.pwm = currentStep.pwm;

                // Ajout d'un bruit léger pour simuler l'erreur de glissement/dérive odométrique (~8%)
                const driftNoise = (Math.random() - 0.5) * 0.015;

                rover.theta += (rover.w + driftNoise * 0.2) * 0.03;
                rover.x += (rover.v + driftNoise) * Math.cos(rover.theta) * 0.03;
                rover.y += (rover.v + driftNoise) * Math.sin(rover.theta) * 0.03;

                rover.path.push({ x: rover.x, y: rover.y });

                updateUI(currentStep.cmd, currentStep.pwm);

                stepTimer++;
                if (stepTimer >= currentStep.duration) {
                    sequenceIndex++;
                    stepTimer = 0;
                }
            }
        }

        function updateUI(cmd, pwm) {
            if (txtXY) txtXY.textContent = `X: ${rover.x >= 0 ? '+' : ''}${rover.x.toFixed(2)}m | Y: ${rover.y >= 0 ? '+' : ''}${rover.y.toFixed(2)}m`;
            if (txtHeading) {
                const deg = ((rover.theta * 180 / Math.PI) % 360);
                txtHeading.textContent = `${deg.toFixed(1)}°`;
            }
            if (txtPWM) txtPWM.textContent = `${cmd} | PWM: ${pwm}`;
        }

        function render() {
            updatePhysics();

            // Fond sombre
            ctx.fillStyle = "#05080f";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Grille odométrique (0.5m)
            ctx.strokeStyle = "rgba(0, 240, 255, 0.07)";
            ctx.lineWidth = 1;
            const gridStep = scale * 0.5;

            for (let x = originX % gridStep; x < canvas.width; x += gridStep) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = originY % gridStep; y < canvas.height; y += gridStep) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.width);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Repère d'origine (0,0)
            ctx.strokeStyle = "rgba(255, 183, 3, 0.3)";
            ctx.beginPath();
            ctx.arc(originX, originY, 4, 0, Math.PI * 2);
            ctx.stroke();

            // Tracé de la trajectoire
            if (rover.path.length > 1) {
                ctx.strokeStyle = "#00f0ff";
                ctx.lineWidth = 2;
                ctx.shadowBlur = 6;
                ctx.shadowColor = "#00f0ff";
                ctx.beginPath();

                rover.path.forEach((pt, index) => {
                    const px = originX + pt.x * scale;
                    const py = originY - pt.y * scale; // Inversion axe Y Canvas
                    if (index === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                });

                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Représentation du Rover
            const rx = originX + rover.x * scale;
            const ry = originY - rover.y * scale;

            ctx.save();
            ctx.translate(rx, ry);
            ctx.rotate(-rover.theta); // Sens trigonométrique

            // Châssis Rover
            ctx.fillStyle = "#0e1726";
            ctx.strokeStyle = "#ffb703";
            ctx.lineWidth = 2;
            ctx.fillRect(-12, -10, 24, 20);
            ctx.strokeRect(-12, -10, 24, 20);

            // Indicateur de direction
            ctx.fillStyle = "#00e676";
            ctx.beginPath();
            ctx.moveTo(12, 0);
            ctx.lineTo(4, -5);
            ctx.lineTo(4, 5);
            ctx.closePath();
            ctx.fill();

            ctx.restore();

            requestAnimationFrame(render);
        }

        render();
    });


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "Skander Mokeddem — Engineering Portfolio loaded."
    );

});