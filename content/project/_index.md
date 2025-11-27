---
title: 'Projects'
date: 2024-05-19
type: landing
cms_exclude: true

design:
  # Section spacing
  spacing: '5rem'

# Page sections
sections:
  - block: collection
    content:
      title: Projects
      # 修改建议：更学术、专业的表达
      text: "A selection of my ongoing and completed research projects focusing on cognitive aging, neuroimaging, and social determinants of health."
      filters:
        folders:
          # 关键修改：这里必须是单数 'project'，与您的 content/project 文件夹名一致
          - project
    design:
      view: article-grid
      fill_image: false
      columns: '2'
      show_date: true
      show_read_time: true
      show_read_more: true
---
