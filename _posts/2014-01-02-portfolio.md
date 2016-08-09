---
title: "Portfolio"
bg: green
color: white
fa-icon: code
---

<div class="row">

{% for project in site.projects %}
    <div class="portfolio-item col-sm-6">
      <img class="img-fluid" src="{{ project.img_url }}">
      <section class="portfolio-item-details">
          <h2>
              <a href="{{ project.external_url }}">{{ project.title }}</a>
          </h2>
          <div class="portfolio-item-links">
              <a href="{{ project.external_url }}">live</a>
              <a href="{{ project.github_url }}">code</a>
          </div>
          <p>
            {{project.description}}
          </p>
          <p>
            {{project.technologies}}
          </p>
      </section>
    </div>
{% endfor %}

</div>
