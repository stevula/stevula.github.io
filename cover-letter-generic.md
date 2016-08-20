---
title: "Cover Letter"
permalink: './cover-letter'
layout: cover-letter
---

<h1>Hello, my name is Steven.</h1>

I like building things in Ruby<span class="language">, Rails</span><span class="language">, JavaScript</span><span class="language">, AngularJS</span><span class="language">, jQuery</span><span class="language">, Python</span><span class="language">, and Django</span>.

<style>
  .language {
    display: none;
  }
</style>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>
  (function() {
    var numberOfLanguages = 7;
    var currentIndex = 0;

    var t = setInterval(function() {
        if (currentIndex <= numberOfLanguages) {
          $('.language:nth-of-type(' + currentIndex + ')').show();
          currentIndex++
        }
        else {
          return;
        }
    }, 1000);
  })();
</script>
