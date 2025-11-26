---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing

design:
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


  # Featured Publications
  - block: collection
    id: papers
    content:
      title: Featured Publications
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
     

  # Recent Publications
  - block: collection
    content:
      title: Recent Publications
      text: ''
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation


  # Recent News
  - block: collection
    id: news
    content:
      title: Recent News
      subtitle: ''
      text: ''
      page_type: blog
      count: 1
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

  # Projects
  - block: collection
    content:
      title: Projects
      subtitle: ''
      text: ''
      filters:
        folders:
          - project
    design:
      view: article-grid
      columns: 2


  # Gallery
  - block: markdown
    content:
      title: Gallery
      subtitle: ''
      text: |-
        {{< gallery album="demo" >}}
    design:
      columns: '1'


  # Contact
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
      # ★ 新增：强制缩小间距
      spacing:
        padding: ["1rem", "0", "1rem", "0"] # 底部稍微多留一点给页脚动画
---
