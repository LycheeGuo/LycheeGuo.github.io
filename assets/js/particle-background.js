// Physics Background using Matter.js
// Simulating the "Your Plan Your Planet" feel with 2D physics

function initPhysicsBackground() {
    // 检查 Matter.js 是否加载
    if (typeof Matter === 'undefined') {
        console.error('Matter.js not loaded');
        return;
    }

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Composites = Matter.Composites,
          Common = Matter.Common,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies,
          Events = Matter.Events;

    // 创建引擎
    const engine = Engine.create();
    const world = engine.world;

    // 设置重力 (可以设为 0 让物体漂浮，或者设为 1 让物体下落)
    // Google 那个效果其实是低重力 + 漂浮
    engine.gravity.y = 0.5; 
    engine.gravity.x = 0;

    // 获取容器
    // 注意：我们需要创建一个 canvas 放入之前的容器中
    let container = document.querySelector('.morphing-shapes');
    if (!container) {
        container = document.createElement('div');
        container.className = 'morphing-shapes';
        document.body.insertBefore(container, document.body.firstChild);
    }
    // 清空容器防止重复
    container.innerHTML = '';

    // 创建渲染器
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent', // 透明背景
            wireframes: false, // 展示实心颜色
            pixelRatio: window.devicePixelRatio // 清晰度优化
        }
    });

    // 定义墙壁，防止物体跑出屏幕
    const wallOptions = { 
        isStatic: true, 
        render: { visible: false } // 墙壁不可见
    };
    
    let walls = [];
    const updateWalls = () => {
        Composite.remove(world, walls);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const thickness = 100;
        
        walls = [
            Bodies.rectangle(width/2, -thickness/2, width, thickness, wallOptions), // 上
            Bodies.rectangle(width/2, height + thickness/2, width, thickness, wallOptions), // 下
            Bodies.rectangle(width + thickness/2, height/2, thickness, height, wallOptions), // 右
            Bodies.rectangle(-thickness/2, height/2, thickness, height, wallOptions) // 左
        ];
        Composite.add(world, walls);
    };
    updateWalls();

    // 创建随机形状 (模拟你的 research interests)
    // 颜色取自你的 params.yaml 配置 (indigo 色系)
    const colors = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];
    const shapes = [];

    for (let i = 0; i < 20; i++) {
        const x = Common.random(0, window.innerWidth);
        const y = Common.random(-500, 0); // 从屏幕上方生成
        const size = Common.random(20, 50);
        const color = Common.choose(colors);
        
        let body;
        const shapeType = Common.random();

        const bodyOptions = {
            restitution: 0.9, // 弹性 (0-1)，越大约弹
            friction: 0.001,  // 摩擦力
            frictionAir: 0.01, // 空气阻力，制造漂浮感
            render: {
                fillStyle: color,
                opacity: 0.8
            }
        };

        if (shapeType < 0.33) {
            body = Bodies.circle(x, y, size, bodyOptions);
        } else if (shapeType < 0.66) {
            body = Bodies.polygon(x, y, 3, size + 10, bodyOptions); // 三角形
        } else {
            body = Bodies.polygon(x, y, 5, size, bodyOptions); // 五边形
        }

        shapes.push(body);
    }

    Composite.add(world, shapes);

    // 添加鼠标交互
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    // 重要：确保鼠标交互不被 HTML 元素遮挡，或者反过来
    // 如果想要背景纯装饰，可以注释掉下面这行
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // 运行引擎
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 窗口大小改变时重置墙壁
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        updateWalls();
    });
}

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhysicsBackground);
} else {
    initPhysicsBackground();
}
