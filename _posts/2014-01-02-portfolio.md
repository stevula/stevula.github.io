---
title: "Portfolio"
bg: green
color: white
fa-icon: code
---

<div class="row">

{% for project in site.projects %}
    <section class="portfolio portfolio-item col-sm-6">
      <img class="img-fluid" src="{{ project.img_url }}">
      <h2 class="title project-title">
      <a href="{{ project.external_url }}">{{ project.title }}</a>
      </h2>
      <div class="portfolio-item-links">
          <a href="{{ project.external_url }}">live</a>
          <a href="{{ project.github_url }}">code</a>
      </div>
      <p>
        {{project.description}}
      </p>
      <section>
        <h3>
          Technologies used:
        </h3>
        <p>
          {{project.technologies}}
        </p>
      </section>
    </section>
{% endfor %}

</div>
