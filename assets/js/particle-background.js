// Particle Background: Auto-Fire Debug Version
// Features: Auto-fireworks, Click interaction, Console Logging

(function() {
    console.log("🚀 [Physics] Script started...");

    let checkCount = 0;
    const maxChecks = 50;

    function initPhysicsBackground() {
        // 1. 检查依赖
        const isMatterLoaded = typeof Matter !== 'undefined';
        const isPathSegLoaded = !!window.pathSegList;

        if (!isMatterLoaded || !isPathSegLoaded) {
            checkCount++;
            console.log(`⏳ [Physics] Waiting for libs... Matter:${isMatterLoaded}, PathSeg:${isPathSegLoaded} (${checkCount}/${maxChecks})`);
            
            if (checkCount < maxChecks) {
                setTimeout(initPhysicsBackground, 200);
                return;
            } else {
                console.error("❌ [Physics] Timeout! Dependencies failed to load.");
                // 强制尝试运行（可能会报错，但至少能试一下）
                if (!isMatterLoaded) return;
            }
        }

        console.log("✅ [Physics] Dependencies ready. Initializing engine...");

        const Engine = Matter.Engine,
              Render = Matter.Render,
              Runner = Matter.Runner,
              Common = Matter.Common,
              Composite = Matter.Composite,
              Bodies = Matter.Bodies,
              Svg = Matter.Svg,
              Events = Matter.Events,
              Body = Matter.Body;

        // 2. 创建引擎
        const engine = Engine.create();
        const world = engine.world;
        engine.gravity.y = 1; // 正常重力

        // 3. 寻找容器
        let container = document.querySelector('.morphing-shapes');
        if (!container) {
            console.warn("⚠️ [Physics] Container .morphing-shapes not found, creating one.");
            container = document.createElement('div');
            container.className = 'morphing-shapes';
            container.style.cssText = "position:fixed; inset:0; z-index:0; pointer-events:none;";
            document.body.insertBefore(container, document.body.firstChild);
        } else {
            // 确保容器可见
            container.style.opacity = "1";
            container.style.display = "block";
        }
        container.innerHTML = '';

        // 4. 创建渲染器
        const render = Render.create({
            element: container,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: false, // 必须关闭 wireframes 才能控制 opacity
                pixelRatio: window.devicePixelRatio || 1
            }
        });

        // 5. 创建隐形地面 (防止穿模)
        const ground = Bodies.rectangle(
            window.innerWidth / 2, 
            window.innerHeight + 50, 
            window.innerWidth, 
            100, 
            { isStatic: true, render: { visible: false } }
        );
        Composite.add(world, ground);

        // 6. 定义形状
        const svgPaths = {
            heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
            star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
            moon: "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
            sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 12h2m16 0h2M12 2v2m0 16v2m-7.07-2.93l1.41-1.41m10.32-10.32l1.41-1.41M4.93 4.93l1.41 1.41m10.32 10.32l1.41 1.41"
        };
        const pathKeys = Object.keys(svgPaths);
        const strokeColors = ['#6366f1', '#818cf8', '#a5b4fc', '#4338ca', '#ec4899'];

        // 爆炸函数
        const createExplosion = (x, y) => {
            const particleCount = Common.random(6, 10);
            
            for (let i = 0; i < particleCount; i++) {
                let body;
                const color = Common.choose(strokeColors);
                
                // 尝试使用 SVG，如果失败则降级为圆形
                try {
                    const pathKey = Common.choose(pathKeys);
                    const vertexSets = Svg.pathToVertices(svgPaths[pathKey]);
                    body = Bodies.fromVertices(x, y, vertexSets, {
                        restitution: 0.6,
                        friction: 0.01,
                        render: {
                            fillStyle: 'transparent',
                            strokeStyle: color,
                            lineWidth: 2
                        }
                    }, true);
                } catch (e) {
                    console.error("⚠️ SVG Error, using circle instead", e);
                    body = Bodies.circle(x, y, 10, {
                        restitution: 0.6,
                        render: { fillStyle: 'transparent', strokeStyle: color, lineWidth: 2 }
                    });
                }

                if (!body) return;

                // 施加爆炸力
                const force = 0.02 * body.mass;
                Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * force * 2, 
                    y: (Math.random() - 1.0) * force * 2.5 
                });

                // 随机旋转和缩放
                Body.setAngle(body, Math.random() * Math.PI * 2);
                const scale = Common.random(1.0, 1.5); 
                Body.scale(body, scale, scale);

                body.life = 150; // 生命时长
                Composite.add(world, body);
            }
        };

        // 7. 绑定点击
        document.addEventListener('mousedown', (e) => {
            console.log("🖱️ Clicked at", e.clientX, e.clientY);
            createExplosion(e.clientX, e.clientY);
        });
        // 手机触摸
        document.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            createExplosion(t.clientX, t.clientY);
        }, { passive: true });

        // 8. 自动烟花循环 (每 800ms 放一个，帮助确认效果)
        setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.5); // 在上半部分炸
            createExplosion(x, y);
        }, 1200);

        // 9. 更新逻辑：消失处理
        Events.on(engine, 'beforeUpdate', function() {
            const allBodies = Composite.allBodies(world);
            allBodies.forEach(body => {
                if (body.isStatic) return;

                // 减少生命
                if (body.life > 0) {
                    body.life--;
                    if (body.life < 50) {
                        body.render.opacity = body.life / 50;
                    }
                } else {
                    Composite.remove(world, body);
                }
                
                // 掉出边界移除
                if (body.position.y > window.innerHeight + 100) {
                    Composite.remove(world, body);
                }
            });
        });

        // 10. 启动引擎
        console.log("🚀 [Physics] Engine running!");
        render.mouse = null;
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // 窗口适配
        window.addEventListener('resize', () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Body.setPosition(ground, { x: window.innerWidth/2, y: window.innerHeight + 50 });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPhysicsBackground);
    } else {
        initPhysicsBackground();
    }
})();
