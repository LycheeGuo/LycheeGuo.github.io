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
      text: I enjoy making things. Here are a selection of projects that I have worked on over the years.
      filters:
        folders:
          - projects
    design:
      view: article-grid
      fill_image: true   # <--- 改为 true，让图片填满卡片头部
      columns: 1         # <--- 关键修改：改为 1，强制卡片占满全宽（最大化）
      show_date: false
      show_read_time: false
      show_read_more: false
---
