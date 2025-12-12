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
          /* 强制针对 #experience-list 下的内容修改 */
          
          /* 1. 隐藏左侧的时间轴（圆点和竖线） */
          #experience-list .row.experience .col-auto {
            display: none !important;
          }

          /* 2. 让右侧内容区占满 100% 宽度，并去掉原有的左边距/边框 */
          #experience-list .row.experience .col {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            border-left: none !important;
            padding-left: 0 !important;
            padding-top: 0 !important;
          }

          /* 3. 调整每个条目的间距和样式，使其像列表 */
          #experience-list .row.experience {
            display: block !important; /* 强制块级显示 */
            margin-bottom: 1.5rem !important;
            border-bottom: 1px solid #f0f0f0; /* 加一个浅色底部分割线 */
            padding-bottom: 1rem;
          }

          /* 4. 去掉卡片的阴影和背景，让它看起来纯净 */
          #experience-list .card {
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            margin-bottom: 0 !important;
          }
          #experience-list .card-body {
            padding: 0 !important;
          }

          /* 5. 调整标题大小，使其更紧凑 */
          #experience-list h4.card-title {
            font-size: 1.1rem !important;
            margin-top: 0 !important;
            margin-bottom: 0.3rem !important;
            font-weight: bold;
          }
          
          /* 6. 调整副标题（机构/职位）颜色 */
          #experience-list .card-subtitle {
            font-size: 0.95rem !important;
            color: #555 !important;
          }
          
          /* 7. 调整描述文字 */
          #experience-list .card-text {
            font-size: 0.9rem !important;
            margin-top: 0.5rem !important;
          }
        </style>

  # 2. Experience 板块 (注意这里加了 id: experience-list)
  - block: resume-experience
    id: experience-list  # <--- 关键：加上这个ID让上面的CSS生效
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
