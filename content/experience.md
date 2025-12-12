---
title: 'Experience'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:
  # 1. 注入自定义样式，将时间轴强行改为紧凑列表
  - block: markdown
    content:
      text: |
        <style>
          /* 针对该页面的 Experience 板块进行样式重写 */
          .experience-compact .row.experience {
            margin-bottom: 1.5rem; /* 每段经历之间的间距 */
            border-bottom: 1px solid #f0f0f0; /* 可选：加个底部分割线 */
            padding-bottom: 1rem;
          }
          /* 隐藏时间轴原本的圆点和竖线列，或者将其调整为文字 */
          .experience-compact .col-auto {
            width: 100% !important; 
            text-align: left !important;
            padding-bottom: 0.2rem;
            color: #666;
            font-size: 0.9em;
            display: block !important;
          }
          /* 去掉原来的左边框线条 */
          .experience-compact .col.py-2 {
            border-left: none !important;
            padding-left: 0 !important;
            padding-top: 0 !important;
          }
          /* 调整卡片样式，去掉阴影，使其更像列表 */
          .experience-compact .card {
            box-shadow: none !important;
            border: none !important;
            background: none !important;
          }
          .experience-compact .card-body {
            padding: 0 !important;
          }
          .experience-compact h4.card-title {
            font-size: 1.1rem !important;
            margin-bottom: 0.2rem !important;
          }
        </style>

  # 2. Experience 板块 (添加了 css_class 以应用上面的样式)
  - block: resume-experience
    content:
      username: admin
    design:
      # Hugo date format
      date_format: 'January 2006'
      # Education or Experience section first?
      is_education_first: false
      # ★★★ 关键点：加上这个 class 来应用上面的 CSS ★★★
      css_class: experience-compact

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
