const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(el=>observer.observe(el));

let page=1; const total=23;
const img=document.getElementById('menuPage'); const label=document.getElementById('currentPage');
const galleryTitle=document.getElementById('galleryTitle');
const galleryControls=document.getElementById('galleryControls');
const menuViewer=document.querySelector('.menu-viewer');
const categoryPages=document.getElementById('categoryPages');
const categoryRanges=[
  {name:'Rice',start:3,end:6},
  {name:'Noodles',start:7,end:10},
  {name:'Western',start:11,end:12},
  {name:'Bread',start:13,end:17},
  {name:'Drinks',start:18,end:22}
];
function activeCategory(){return categoryRanges.find(item=>page>=item.start&&page<=item.end)}
function renderPage(){
  const n=String(page).padStart(2,'0');
  const category=activeCategory();
  img.src=`assets/menu/page-${n}.jpg`;
  img.alt=`9 Kopitiam ${category?category.name.toLowerCase():'menu'} page ${page}`;
  label.textContent=page;
  galleryTitle.textContent=category?`${category.name} menu.`:'Browse every page.';
  galleryControls.hidden=false;
  menuViewer.hidden=false;
  categoryPages.hidden=true;
  document.querySelectorAll('.gallery-tabs button').forEach(button=>button.classList.toggle('active',category&&button.dataset.category===category.name));
}
function renderCategory(name){
  const category=categoryRanges.find(item=>item.name===name);
  if(!category)return;
  page=category.start;
  galleryTitle.textContent=`Full ${category.name} menu.`;
  galleryControls.hidden=true;
  menuViewer.hidden=true;
  categoryPages.hidden=false;
  categoryPages.innerHTML='';
  for(let current=category.start;current<=category.end;current++){
    const picture=document.createElement('img');
    picture.src=`assets/menu/page-${String(current).padStart(2,'0')}.jpg`;
    picture.alt=`9 Kopitiam ${category.name.toLowerCase()} menu page ${current}`;
    picture.loading=current===category.start?'eager':'lazy';
    categoryPages.appendChild(picture);
  }
  document.querySelectorAll('.gallery-tabs button').forEach(button=>button.classList.toggle('active',button.dataset.category===category.name));
}
document.querySelectorAll('[data-category]').forEach(control=>control.addEventListener('click',()=>renderCategory(control.dataset.category)));
document.getElementById('prevPage').addEventListener('click',()=>{page=page===1?total:page-1;renderPage()});
document.getElementById('nextPage').addEventListener('click',()=>{page=page===total?1:page+1;renderPage()});
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){page=page===1?total:page-1;renderPage()}if(e.key==='ArrowRight'){page=page===total?1:page+1;renderPage()}});
renderPage();
