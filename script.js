const grid = document.getElementById('activity-grid');
const filtersEl = document.getElementById('filters');
const searchEl = document.getElementById('search');
const emptyEl = document.getElementById('empty-state');
const dialog = document.getElementById('activity-dialog');
const dialogContent = document.getElementById('dialog-content');
let activities = [];
let activeFilter = 'All';

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

async function loadActivities(){
  try {
    const response = await fetch('data/activities.json');
    if(!response.ok) throw new Error('Unable to load activity data');
    activities = await response.json();
    renderFilters(); renderStats(); renderActivities(); renderGallery();
  } catch(error) {
    grid.innerHTML = '<p class="muted">Activity data could not be loaded. Make sure this website is opened through a local web server or GitHub Pages.</p>';
    document.getElementById('result-count').textContent = 'Data unavailable';
    console.error(error);
  }
}
function renderFilters(){
  const categories = ['All', ...new Set(activities.map(a=>a.category).filter(Boolean))];
  filtersEl.innerHTML = categories.map(category=>`<button class="filter ${category===activeFilter?'active':''}" data-filter="${escapeHTML(category)}">${escapeHTML(category==='All'?'All activities':category)}</button>`).join('');
  filtersEl.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    activeFilter=button.dataset.filter; renderFilters(); renderActivities();
  }));
}
function renderStats(){
  document.getElementById('stat-total').textContent=activities.length;
  document.getElementById('stat-categories').textContent=new Set(activities.map(a=>a.category).filter(Boolean)).size;
  document.getElementById('stat-years').textContent=new Set(activities.map(a=>a.year).filter(Boolean)).size;
  document.getElementById('year').textContent=new Date().getFullYear();
}
function renderActivities(){
  const query=searchEl.value.trim().toLowerCase();
  const list=activities.map((a,index)=>({...a,index})).filter(a=>
    (activeFilter==='All'||a.category===activeFilter) &&
    [a.title,a.category,a.description,a.date,a.year].join(' ').toLowerCase().includes(query)
  );
  document.getElementById('result-count').textContent=`SHOWING ${list.length} OF ${activities.length} ACTIVITIES`;
  emptyEl.hidden=list.length!==0;
  grid.innerHTML=list.map(a=>`<article class="activity-card" tabindex="0" role="button" aria-label="View ${escapeHTML(a.title)} details" data-index="${a.index}">
    <div class="card-image"><img loading="lazy" src="${escapeHTML(a.image||'')}" alt="${escapeHTML(a.alt||a.title)}" onerror="this.style.display='none'"><span class="card-number">ACTIVITY / ${String(a.index+1).padStart(2,'0')}</span></div>
    <div class="card-body"><div class="card-meta"><span class="card-category">${escapeHTML(a.category)}</span><span>${escapeHTML(a.year||a.date||'')}</span></div><h3 class="card-title">${escapeHTML(a.title)}</h3><p class="card-desc">${escapeHTML(a.description)}</p><div class="card-foot"><span>${escapeHTML(a.date||'DATE TO BE ADDED')}</span><span class="card-arrow">↗</span></div></div>
  </article>`).join('');
  grid.querySelectorAll('.activity-card').forEach(card=>{
    const open=()=>showDetails(Number(card.dataset.index));
    card.addEventListener('click',open);
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
  });
}
function showDetails(index){
  const a=activities[index]; if(!a)return;
  dialogContent.innerHTML=`<img class="dialog-image" src="${escapeHTML(a.image||'')}" alt="${escapeHTML(a.alt||a.title)}"><div class="dialog-copy"><div class="dialog-meta">${escapeHTML(a.category)} · ${escapeHTML(a.date||a.year||'')}</div><h3>${escapeHTML(a.title)}</h3><p>${escapeHTML(a.description)}</p><div class="dialog-detail"><strong>OUTCOME / LEARNING</strong><p>${escapeHTML(a.outcome||'Add the verified outcome for this activity.')}</p></div></div>`;
  dialog.showModal();
}
function renderGallery(){
  const picks=activities.filter(a=>a.image).slice(0,5);
  document.getElementById('gallery-grid').innerHTML=picks.map(a=>`<div class="gallery-tile"><img loading="lazy" src="${escapeHTML(a.image)}" alt="${escapeHTML(a.alt||a.title)}"><span>${escapeHTML(a.title.toUpperCase())}</span></div>`).join('');
}
searchEl.addEventListener('input',renderActivities);
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
loadActivities();
