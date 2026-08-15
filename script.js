const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(el=>observer.observe(el));

let page=2; const total=23;
const img=document.getElementById('menuPage'); const label=document.getElementById('currentPage');
const pageTotal=document.getElementById('pageTotal');
const galleryHint=document.getElementById('galleryHint');
const galleryTitle=document.getElementById('galleryTitle');
const galleryDescription=document.getElementById('galleryDescription');
const galleryBadge=document.getElementById('galleryBadge');
const galleryControls=document.getElementById('galleryControls');
const menuViewer=document.querySelector('.menu-viewer');
const categoryPages=document.getElementById('categoryPages');
const categoryRanges=[
  {name:'Rice',start:3,end:6,description:'Fragrant nasi lemak, wok-fired rice and bold Malaysian flavours made for a satisfying meal.'},
  {name:'Noodles',start:7,end:10,description:'Comforting bowls, springy noodles and rich broths inspired by familiar kopitiam favourites.'},
  {name:'Western',start:11,end:12,description:'Crispy, hearty classics served with the generous character of 9 Kopitiam.'},
  {name:'Bread',start:13,end:17,description:'Buttery croissants, kaya toast and nostalgic bites—perfect with a freshly brewed cup.'},
  {name:'Drinks',start:18,end:22,description:'Kopitiam coffee, tea and refreshing signatures crafted to complete every meal.'}
];
let selectedCategory=null;
function activeCategory(){return categoryRanges.find(item=>page>=item.start&&page<=item.end)}
function renderPage(){
  const n=String(page).padStart(2,'0');
  const category=activeCategory();
  img.src=`assets/menu/page-${n}.jpg`;
  img.alt=`9 Kopitiam ${category?category.name.toLowerCase():'menu'} page ${page}`;
  label.textContent=page;
  galleryTitle.textContent='The complete taste of 9.';
  galleryDescription.textContent='Discover comforting local favourites, presented with the unmistakable character of 9 Kopitiam.';
  galleryBadge.textContent='9 Kopitiam Collection';
  pageTotal.textContent=total;
  galleryHint.textContent='Use the arrows to explore the complete menu.';
  galleryControls.hidden=false;
  menuViewer.hidden=false;
  categoryPages.hidden=true;
  document.querySelectorAll('.gallery-tabs button').forEach(button=>button.classList.toggle('active',category&&button.dataset.category===category.name));
}
function renderCategory(name){
  const category=categoryRanges.find(item=>item.name===name);
  if(!category)return;
  selectedCategory=category;
  page=category.start;
  renderCategoryPage();
}
function renderCategoryPage(){
  const category=selectedCategory;
  if(!category)return;
  const categoryTotal=category.end-category.start+1;
  const categoryPage=page-category.start+1;
  img.src=`assets/menu/page-${String(page).padStart(2,'0')}.jpg`;
  if(img.animate)img.animate([{opacity:.35,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:'ease-out'});
  img.alt=`9 Kopitiam ${category.name.toLowerCase()} menu ${categoryPage} of ${categoryTotal}`;
  galleryTitle.textContent=`${category.name} Menu`;
  galleryDescription.textContent=category.description;
  galleryBadge.textContent=`${category.name} Collection`;
  label.textContent=categoryPage;
  pageTotal.textContent=categoryTotal;
  galleryHint.textContent=`Use the arrows to explore more ${category.name} choices.`;
  galleryControls.hidden=false;
  menuViewer.hidden=false;
  categoryPages.hidden=true;
  document.querySelectorAll('.gallery-tabs button').forEach(button=>button.classList.toggle('active',button.dataset.category===category.name));
}
document.querySelectorAll('[data-category]').forEach(control=>control.addEventListener('click',()=>renderCategory(control.dataset.category)));
function movePage(direction){
  if(selectedCategory){
    page+=direction;
    if(page<selectedCategory.start)page=selectedCategory.end;
    if(page>selectedCategory.end)page=selectedCategory.start;
    renderCategoryPage();
    return;
  }
  page+=direction;
  if(page<1)page=total;
  if(page>total)page=1;
  renderPage();
}
document.getElementById('prevPage').addEventListener('click',()=>movePage(-1));
document.getElementById('nextPage').addEventListener('click',()=>movePage(1));
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')movePage(-1);if(e.key==='ArrowRight')movePage(1)});
renderPage();
