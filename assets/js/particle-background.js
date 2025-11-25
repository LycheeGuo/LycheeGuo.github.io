// Particle Background: Interactive Fireworks
// Click -> Explode -> Fall & Bounce -> Fade Out

let checkCount = 0;
const maxChecks = 50;

function initPhysicsBackground() {
    // 检查依赖是否加载 (Matter.js 和 pathSeg)
    // 如果你在国内，pathSeg 有时会加载失败，这里做了重试
    if (typeof Matter === 'undefined' || !window.pathSegList) {
        checkCount++;
        if (checkCount < maxChecks) {
            setTimeout(initPhysicsBackground, 100);
            return;
        } else {
            console.error('Dependencies failed to load. Check pathseg.js and matter.js');
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
          Events = Matter.Events,
          Body = Matter.Body;

    // 1. 创建引擎
    const engine = Engine.create();
    const world = engine.world;
    
    // 设置正常重力，让它们自然下落
    engine.gravity.y = 1; 

    // 2. 创建容器
    let container = document.querySelector('.morphing-shapes');
    if (!container) {
        container = document.createElement('div');
        container.className = 'morphing-shapes';
        document.body.insertBefore(container, document.body.firstChild);
    }
    container.innerHTML = '';

    // 3. 创建渲染器
    // 为了能控制“透明度渐变消失”，我们需要关闭 wireframes 模式，但手动设置 fillStyle 为透明
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframes: false, // 关闭线框模式，以便我们可以控制 opacity
            pixelRatio: window.devicePixelRatio || 1
        }
    });

    // 4. 创建地面 (让物体能落地 "啪")
    // 地面位置在屏幕下方一点点，稍微有点厚度
    const ground = Bodies.rectangle(
        window.innerWidth / 2, 
        window.innerHeight + 30, // 稍微在屏幕下方一点，让它看起来像落在底边
        window.innerWidth, 
        60, 
        { isStatic: true, render: { visible: false } }
    );
    Composite.add(world, ground);

    // 5. 定义 SVG 图标路径 (心形、星星、月亮、太阳、花朵)
    const svgPaths = {
        heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
        moon: "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
        sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 12h2m16 0h2M12 2v2m0 16v2m-7.07-2.93l1.41-1.41m10.32-10.32l1.41-1.41M4.93 4.93l1.41 1.41m10.32 10.32l1.41 1.41",
        flower: "M12,2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,2,12,2z M16.2,4.2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.3,4.2,16.2,4.2z M19.1,8.1c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S20.2,8.1,19.1,8.1z M19.1,12.9c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S20.2,12.9,19.1,12.9z M16.2,16.8c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S17.3,16.8,16.2,16.8z M12,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,18,12,18z M7.8,16.8c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.9,16.8,7.8,16.8z M4.9,12.9c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S6,12.9,4.9,12.9z M4.9,8.1c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S6,8.1,4.9,8.1z M7.8,4.2c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.9,4.2,7.8,4.2z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z"
    };
    const pathKeys = Object.keys(svgPaths);

    // 6. 点击触发烟花爆炸
    const createExplosion = (x, y) => {
        const particleCount = Common.random(8, 12); // 每次点击产生多少个
        const strokeColors = ['#6366f1', '#818cf8', '#a5b4fc', '#4338ca', '#ec4899']; // 颜色池

        for (let i = 0; i < particleCount; i++) {
            const pathKey = Common.choose(pathKeys);
            const pathData = svgPaths[pathKey];
            const vertexSets = Svg.pathToVertices(pathData);
            const color = Common.choose(strokeColors);
            
            // 创建物体
            const body = Bodies.fromVertices(x, y, vertexSets, {
                restitution: 0.6, // 弹性，落地会弹一下
                friction: 0.01,
                render: {
                    fillStyle: 'transparent', // 也是透明填充
                    strokeStyle: color,       // 只有轮廓颜色
                    lineWidth: 2,
                    opacity: 1
                }
            }, true);

            // 给它一个“爆炸”的力
            const forceMagnitude = 0.02 * body.mass;
            Body.applyForce(body, body.position, {
                x: (Math.random() - 0.5) * forceMagnitude * 2, // 向左右炸开
                y: (Math.random() - 1.0) * forceMagnitude * 2  // 向上炸开
            });

            // 随机旋转
            Body.setAngle(body, Math.random() * Math.PI * 2);
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3); // 自旋

            // 设置缩放 (稍微小一点更像粒子)
            const scale = Common.random(1.0, 1.8); 
            Body.scale(body, scale, scale);

            // 标记生命周期 (例如 180 帧，约 3 秒后消失)
            body.life = 180; 
            body.initialLife = 180;

            Composite.add(world, body);
        }
    };

    // 绑定点击事件 (PC 和 手机)
    document.addEventListener('mousedown', (e) => {
        createExplosion(e.clientX, e.clientY);
    });
    document.addEventListener('touchstart', (e) => {
        // 防止手机多点触控问题，只取第一个点
        const touch = e.touches[0];
        createExplosion(touch.clientX, touch.clientY);
    }, { passive: true });

    // 7. 循环更新：处理消失逻辑
    Events.on(engine, 'beforeUpdate', function(event) {
        const allBodies = Composite.allBodies(world);
        
        allBodies.forEach(body => {
            // 跳过地面，地面不能消失
            if (body.isStatic) return;

            // 减少生命值
            if (body.life > 0) {
                body.life -= 1;
                // 计算透明度：生命周期最后 60 帧开始渐变消失
                if (body.life < 60) {
                    body.render.opacity = body.life / 60;
                }
            } else {
                // 寿命耗尽，移除
                Composite.remove(world, body);
            }
            
            // 双重保险：如果掉出屏幕太远（没被地面接住），也移除
            if (body.position.y > window.innerHeight + 200) {
                Composite.remove(world, body);
            }
        });
    });

    // 8. 启动
    // 因为我们需要自己处理点击，所以把 render 的鼠标控制去掉
    render.mouse = null; 

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 窗口调整
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        // 重置地面位置
        Body.setPosition(ground, {
            x: window.innerWidth / 2,
            y: window.innerHeight + 30
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhysicsBackground);
} else {
    initPhysicsBackground();
}
