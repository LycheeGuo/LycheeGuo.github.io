---
title: 'Projects'
date: 2024-05-19
type: landing

design:
  # Section spacing
  spacing: '5rem'

# Page sections
sections:
  - block: collection
    content:
      title: Selected Projects
      filters:
        folders:
          - projects
    design:
      view: article-grid
      fill_image: false
      columns: 2  # <--- 关键修改：改为 2，让卡片变宽，视觉更自适应
      show_date: false
      show_read_time: false
      show_read_more: false
---
