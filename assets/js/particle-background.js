// Particle Background: Falling Outline Icons
// Version: SVG Outlines & Continuous Falling

let checkCount = 0;
const maxChecks = 50;

function initPhysicsBackground() {
    // 确保 Matter.js 和 PathSVG 都加载完成
    if (typeof Matter === 'undefined' || !window.pathSegList) {
        checkCount++;
        if (checkCount < maxChecks) {
            setTimeout(initPhysicsBackground, 100);
            return;
        } else {
            console.error('Matter.js or PathSeg failed to load.');
            return;
        }
    }

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Common = Matter.Common,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies,
          Svg = Matter.Svg,
          Vertices = Matter.Vertices,
          Events = Matter.Events;

    // 1. 创建引擎
    const engine = Engine.create();
    const world = engine.world;
    
    // 设置重力，稍微慢一点，营造飘落感
    engine.gravity.y = 0.25; 

    // 2. 获取容器
    let container = document.querySelector('.morphing-shapes');
    if (!container) {
        container = document.createElement('div');
        container.className = 'morphing-shapes';
        document.body.insertBefore(container, document.body.firstChild);
    }
    container.innerHTML = '';

    // 3. 创建渲染器 (关键修改：开启 wireframes)
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframes: true, // 【关键】开启线框模式，不要填充
            pixelRatio: window.devicePixelRatio || 1
        }
    });

    // We don't need walls or floor anymore! Let them fall endlessly.

    // 4. 定义 SVG 路径数据
    // 这些数据来自简单的 SVG 图标
    const svgPaths = {
        heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
        moon: "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
        sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 12h2m16 0h2M12 2v2m0 16v2m-7.07-2.93l1.41-1.41m10.32-10.32l1.41-1.41M4.93 4.93l1.41 1.41m10.32 10.32l1.41 1.41",
        flower: "M12,2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,2,12,2z M16.2,4.2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.3,4.2,16.2,4.2z M19.1,8.1c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S20.2,8.1,19.1,8.1z M19.1,12.9c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S20.2,12.9,19.1,12.9z M16.2,16.8c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.3,16.8,16.2,16.8z M12,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,18,12,18z M7.8,16.8c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.9,16.8,7.8,16.8z M4.9,12.9c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S6,12.9,4.9,12.9z M4.9,8.1c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S6,8.1,4.9,8.1z M7.8,4.2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.9,4.2,7.8,4.2z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z"
    };
    const pathKeys = Object.keys(svgPaths);

    // 轮廓颜色配置 (使用你主题的 indigo 色系)
    // 在 wireframe 模式下，fillStyle 无效，要设置 strokeStyle
    const strokeColors = ['#a5b4fc', '#c7d2fe', '#818cf8'];

    // 辅助函数：创建 SVG 物体
    function createSvgBody(x, y) {
        const pathKey = Common.choose(pathKeys);
        const pathData = svgPaths[pathKey];
        // 解析 SVG 路径
        const vertexSets = Svg.pathToVertices(pathData);
        
        const color = Common.choose(strokeColors);
        const scale = Common.random(1.5, 3); // 调整大小缩放

        const body = Bodies.fromVertices(x, y, vertexSets, {
            friction: 0.001,
            frictionAir: 0.02, // 增加空气阻力，让它们飘得慢一点
            restitution: 0.5,
            render: {
                fillStyle: 'transparent', // 确保无填充
                strokeStyle: color,       // 【关键】设置轮廓颜色
                lineWidth: 1              // 线条宽度
            }
        }, true);

        // 随机旋转初始角度
        Matter.Body.setAngle(body, Common.random(0, Math.PI * 2));
        // 应用缩放
        Matter.Body.scale(body, scale, scale);
        
        return body;
    }

    // 5. 初始化生成一批物体
    const initialAmount = 30; 
    for (let i = 0; i < initialAmount; i++) {
        const x = Common.random(0, window.innerWidth);
        // 初始分布在屏幕各个高度
        const y = Common.random(-window.innerHeight, window.innerHeight / 2);
        Composite.add(world, createSvgBody(x, y));
    }

    // 6. 【核心逻辑】循环监测：掉出屏幕的移除，并在顶部生成新的
    Events.on(engine, 'beforeUpdate', function(event) {
        const allBodies = Composite.allBodies(world);
        const bottomLimit = window.innerHeight + 200; // 屏幕下方 200px 的位置

        allBodies.forEach(body => {
            // 如果物体掉到了屏幕下方很远的地方
            if (body.position.y > bottomLimit) {
                // 1. 从世界中移除旧物体
                Composite.remove(world, body);
                
                // 2. 在顶部随机位置生成一个新物体
                const newX = Common.random(0, window.innerWidth);
                const newY = Common.random(-200, -50); // 屏幕上方
                Composite.add(world, createSvgBody(newX, newY));
            }
        });
    });

    // 7. 启动
    // 关闭鼠标交互，因为现在是纯背景下落
    render.mouse = null; 

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhysicsBackground);
} else {
    initPhysicsBackground();
}
