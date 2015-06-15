/*
 * peoplestats.js
 * Copyright (C) 2015 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var ncols = 8,
  nrows=5
  p_female = 0.55,
  p_statusA_female = 0.9,
  p_statusA_male = 0.3
  n_menA=0, n_menB=0,
  n_womenA=0, n_womenB=0;


function generate() {
  // generate the population of men and women
  var svg = document.getElementById("vizdiv"),
    useEl,
    n, m;

  for (n=0; n < ncols; n++) {
    for (m=0; m < nrows; m++) {
      useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      if (Math.random() < p_female ) {
        // female
        useEl.setAttributeNS('http://www.w3.org/1999/xlink',
                             'href',
                             '#female-worker');
        useEl.setAttributeNS(null,
                             'transform',
                             'translate(' + n*50 + ' ' + m*50 + ')' + ' scale(0.105 0.105)' );
        if (Math.random() < p_statusA_female) {
          n_womenA += 1;
          useEl.setAttributeNS(null,
                               'class',
                               'statusA'); 
        } else{
          n_womenB += 1;
          useEl.setAttributeNS(null,
                               'class',
                               'statusB'); 
        }

      } else {
        // male
        useEl.setAttributeNS('http://www.w3.org/1999/xlink',
                             'href',
                             '#male-worker');
        useEl.setAttributeNS(null,
                             'transform',
                             'translate(' + n*50 + ' ' + m*50 + ')');
        if (Math.random() < p_statusA_male) {
          n_menA += 1;
          useEl.setAttributeNS(null,
                               'class',
                               'statusA'); 
        } else{
          n_menB += 1;
          useEl.setAttributeNS(null,
                               'class',
                               'statusB'); 
        }
      }
      svg.appendChild(useEl);
    }
  }

  // update vizinfo
  var info = document.getElementById("vizinfo"),
    list = document.createElement('ul'),
    n_women = n_womenA + n_womenB,
    n_men = n_menA + n_menB;

  var item1 = document.createElement('li');
  item1.appendChild(document.createTextNode(n_women + " women, " + n_men + " men"));
  var item2 = document.createElement('li');
  item2.appendChild(document.createTextNode("Women-- " + n_womenA + " status A [black], " + n_womenB + " status B [blue]."));
  var item3 = document.createElement('li');
  item3.appendChild(document.createTextNode("Men-- " + n_menA + " status A [black], " + n_menB + " status B [blue]."));

  list.appendChild(item1);
  list.appendChild(item2);
  list.appendChild(item3);

  info.appendChild(list);
}

window.onload = function () {
  generate();
}

//    <use xlink:href="#male-worker"
//           transform="translate(0 0)"
//           class="statusA"/>
//    <use xlink:href="#male-worker"
//           transform="translate(50 0)"
//           class="statusB"/>
//    <use xlink:href="#female-worker"
//           transform="translate(100 0) scale(0.105, 0.105)"
//           class="statusA"/>

