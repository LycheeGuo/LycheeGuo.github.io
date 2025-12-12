---
title: 'Experience'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Page sections
sections:
  # 1. 注入强制 CSS (直接写在 markdown block 里)
  - block: markdown
    content:
      text: |
        <style>
          /* --- 核心布局重构 --- */
          /* 1. 将原本的左右分栏强制改为上下堆叠的 Flex 布局 */
          #experience-list .row.experience {
            display: flex !important;
            flex-direction: column !important; 
            margin-bottom: 2rem !important; /* 条目间距 */
            border-bottom: 1px solid #e5e7eb; /* 底部加一条淡灰色的分割线，模仿 Compact 视图 */
            padding-bottom: 2rem;
          }

          /* 2. 内容区域 (职位/公司/描述) - 利用 order 属性强行提到最前面 */
          #experience-list .row.experience .col.py-2 {
            order: 1 !important;
            width: 100% !important;
            flex: 0 0 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            border: none !important; /* 去掉原本左侧的竖线 */
            margin-bottom: 0.5rem !important;
          }

          /* 3. 时间区域 (原左侧时间轴) - 利用 order 属性按到下面，变成元数据行 */
          #experience-list .row.experience .col-auto {
            order: 2 !important;
            width: 100% !important;
            flex: 0 0 100% !important;
            max-width: 100% !important;
            text-align: left !important; /* 左对齐 */
            padding: 0 !important;
            margin-top: 0 !important;
            
            /* 样式调整：灰色小字 */
            color: #6b7280 !important; 
            font-size: 0.875rem !important;
            font-family: ui-sans-serif, system-ui, sans-serif;
          }

          /* --- 细节清理 --- */
          
          /* 4. 暴力隐藏时间轴的圆点和装饰线条 */
          /* 隐藏 col-auto 里面所有的边框和背景装饰 */
          #experience-list .row.experience .col-auto div {
            background: none !important;
            border: none !important;
            display: inline-block !important; /* 防止 div 换行 */
            width: auto !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* 隐藏可能存在的特定装饰元素 (视具体主题版本而定) */
          #experience-list .col-auto .border-left,
          #experience-list .col-auto .badge,
          #experience-list .col-auto .rounded-circle {
             display: none !important;
          }

          /* 5. 卡片样式“去卡片化”，使其看起来像纯文本列表 */
          #experience-list .card {
            box-shadow: none !important;
            background: transparent !important;
            border: none !important;
            margin-bottom: 0 !important;
          }
          #experience-list .card-body {
            padding: 0 !important;
          }

          /* 6. 字体样式微调，模仿 Recent Publications */
          #experience-list h4.card-title {
            font-size: 1.15rem !important;
            font-weight: 700 !important;
            margin-bottom: 0.25rem !important;
            color: #111827; /* 深黑色 */
          }
          #experience-list h4.card-title a {
             text-decoration: none !important;
          }
          
          #experience-list .card-subtitle {
            font-size: 1rem !important;
            color: #4b5563 !important; /* 灰色 */
            margin-bottom: 0.5rem !important;
          }
          
          #experience-list .card-text {
             color: #374151;
             font-size: 0.95rem;
             margin-top: 0.5rem;
          }
        </style>

  # 2. Experience 板块 (务必加上 id: experience-list)
  - block: resume-experience
    id: experience-list
    content:
      username: admin
    design:
      date_format: 'January 2006'
      is_education_first: false

  - block: resume-awards
    content:
      title: Awards
      username: admin
  
  - block: resume-skills
    content:
      title: Skills & Hobbies
      username: admin
    design:
      show_skill_percentage: false

  - block: resume-languages
    content:
      title: Languages
      username: admin
---
