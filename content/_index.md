---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing

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

  # Featured Publications 
  - block: collection
    id: papers
    content:
      title: Featured Publications
      count: 2 
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
      spacing:
        padding: ["3rem", "0", "3rem", "0"]

  # Recent Publications 
  - block: collection
    id: recent-pubs  
    content:
      title: Recent Publications
      text: ''
      count: 6
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      view: citation
      spacing:
        padding: ["0.5rem", "0", "1rem", "0"] 

  # Recent News 
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
      view: compact
      columns: '1'
      spacing:
        padding: ["2rem", "0", "2rem", "0"]

  # Projects 
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
        padding: ["2rem", "0", "2rem", "0"]

  # Awards 
  - block: resume-awards
    content:
      title: Awards
      username: admin
    design:
      columns: '1'
      spacing:
        padding: ["2rem", "0", "2rem", "0"]

  # Gallery 
  - block: markdown
    content:
      title: Gallery
      subtitle: ''
      text: |-
        {{< gallery album="demo" >}}
    design:
      columns: '1'
      spacing:
        padding: ["2rem", "0", "2rem", "0"]

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
        latitude: 22.4120
        longitude: 114.2124
      autolink: true
    design:
      columns: '2'
      spacing:
        padding: ["2rem", "0", "1rem", "0"]
---
