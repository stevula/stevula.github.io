<nav><ul>
  {% for node in site.posts reversed %}
    {% capture id %}{{ node.id | remove:'/' | downcase }}{% endcapture %}
    <li class="p-{{id}}"><a href="#{{id}}">{{node.title}}</a></li>
  {% endfor %}
</ul></nav>