---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing

design:
  # 全局间距设置
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
      spacing:
        padding: ['0', '0', '0', '0']

  # Featured Publications (精选论文)
  - block: collection
    id: papers
    content:
      title: Featured Publications
      count: 4 
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
      spacing:
        padding: ["3rem", "0", "1rem", "0"]

  # Recent Publications (最新论文)
  - block: collection
    content:
      title: Recent Publications
      text: ''
      count: 5
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      view: citation
      spacing:
        padding: ["1rem", "0", "1rem", "0"]

  # Recent News (最新动态)
  - block: collection
    id: news
    content:
      title: Recent News
      subtitle: ''
      text: ''
      page_type: blog
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
      spacing:
        padding: ["2rem", "0", "1rem", "0"]

  # Projects (项目)
  - block: collection
    content:
      title: Projects
      subtitle: ''
      text: ''
      count: 2
      filters:
        folders:
          - project
    design:
      view: article-grid
      columns: 2
      spacing:
        padding: ["2rem", "0", "1rem", "0"]

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
        padding: ["2rem", "0", "1rem", "0"]

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
      # ★★★ 关键修改：底部 padding 改为 0 (原为 4rem) ★★★
      spacing:
        padding: ["2rem", "0", "0", "0"]
---
