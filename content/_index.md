---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing

design:
  # 全局间距设置：保持适中
  spacing: '1rem'

sections:
  - block: resume-biography-3
    content:
      username: admin
      text: ''
      button:
        text: Download CV
        url: uploads/resume.pdf
      headings:
        about: ''
        education: ''
        interests: ''
    design:
      css_class: hbx-bg-gradient
      avatar:
        size: medium
        shape: circle
      # Bio板块保持紧凑
      spacing:
        padding: ['0', '0', '0', '0']

  # Featured Publications (精选论文)
  - block: collection
    id: papers
    content:
      title: Featured Publications
      # ★ 新增 count: 限制显示数量，超过会自动出现 See More
      count: 4 
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
      # ★ 统一间距：适中 (3rem)
      spacing:
        padding: ["3rem", "0", "3rem", "0"]

  # Recent Publications (最新论文)
  - block: collection
    content:
      title: Recent Publications
      text: ''
      # ★ 新增 count: 限制显示数量，避免列表过长
      count: 6
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation
      # ★ 统一间距
      spacing:
        padding: ["3rem", "0", "3rem", "0"]

  # Recent News (最新动态)
  - block: collection
    id: news
    content:
      title: Recent News
      subtitle: ''
      text: ''
      page_type: blog
      # 这里的 count: 1 是你之前的设置，很紧凑
      count: 2
      filters:
        author: ''
        category: ''
        tag: ''
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ''
      offset: 0
      order: desc
    design:
      view: card
      columns: '2'
      # 保持紧凑
      spacing:
        padding: ["3rem", "0", "3rem", "0"]

  # Projects (项目)
  - block: collection
    content:
      title: Projects
      subtitle: ''
      text: ''
      # ★ 新增 count
      count: 4
      filters:
        folders:
          - project
    design:
      view: article-grid
      columns: 2
      # ★ 统一间距
      spacing:
        padding: ["3rem", "0", "3rem", "0"]

  # Gallery (相册)
  - block: markdown
    content:
      title: Gallery
      subtitle: ''
      text: |-
        {{< gallery album="demo" >}}
    design:
      columns: '1'
      spacing:
        padding: ["3rem", "0", "3rem", "0"]

  # Contact (联系方式)
  - block: contact
    id: contact
    content:
      title: Contact
      subtitle: ''
      email: 'guolz@link.cuhk.edu.hk'
      directions: 'Room 345, Department of Psychology'
      address:
        street: 'Sino Building, The Chinese University of Hong Kong'
        city: 'Shatin'
        region: 'NT'
        country: 'Hong Kong'
        postcode: '' 
      coordinates:
        latitude: 22.41561573970213
        longitude: 114.20716648370569
      autolink: true
    design:
      columns: '2'
      spacing:
        padding: ["3rem", "0", "4rem", "0"]
---
