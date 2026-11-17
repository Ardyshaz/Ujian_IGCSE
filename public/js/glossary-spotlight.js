import {glossary} from './guides.js';
import {escapeHtml as h,icon} from './ui.js';
import {localDay} from './quiz-engine.js';

export function dailyTermIndex(day=localDay()) {
  return [...day].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,0)%glossary.length;
}
function termMarkup(index) {
  const [en,ms,meaning,category]=glossary[index];
  const label=category==='Command word'?'Kata tugas (Command word)':category==='Exam wording'?'Frasa soalan':category;
  return `<span class="spotlight-category">${h(label)}</span><h3 lang="en">${h(en)}</h3><p class="spotlight-translation" lang="ms">${h(ms)}</p><p class="spotlight-meaning" lang="en">${h(meaning)}</p>`;
}
export function glossarySpotlight() {
  const index=dailyTermIndex();
  return `<section class="glossary-spotlight" data-glossary-spotlight data-term-index="${index}" aria-label="Istilah Hari Ini"><div class="spotlight-heading"><span>${icon('book-open')} GLOSARI ENGLISH-BM</span><span>${glossary.length} istilah</span></div><h2>Istilah Hari Ini</h2><p class="spotlight-intro">Kenali maksudnya. Cuba guna dalam satu ayat.</p><div class="spotlight-term" data-term-content aria-live="polite" aria-atomic="true">${termMarkup(index)}</div><div class="spotlight-actions"><button class="button" data-action="glossary-next">Istilah lain ${icon('arrow-right')}</button><a href="#student/glossary">Cari semua istilah ${icon('search')}</a></div></section>`;
}
export function nextGlossaryTerm(button) {
  const section=button.closest('[data-glossary-spotlight]');
  if(!section)return;
  const index=(Number(section.dataset.termIndex)+1)%glossary.length;
  section.dataset.termIndex=String(index);section.querySelector('[data-term-content]').innerHTML=termMarkup(index);
}
export function glossaryCallout() {
  return `<a class="glossary-callout" href="#student/glossary"><span class="glossary-callout-icon">${icon('languages')}</span><span><strong>Faham istilah, lebih yakin menjawab.</strong><small>${glossary.length} istilah English-BM: command words, Mathematics, Science dan English.</small></span><span class="glossary-callout-cta">Buka glosari ${icon('arrow-right')}</span></a>`;
}
