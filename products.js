let products = [];
const list = document.getElementById('list');
const modal = document.getElementById('modal');
const detail = document.getElementById('detail');
const search = document.getElementById('search');
function renderList(query = '') {
  list.innerHTML = '';
  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  if (!filtered.length) { list.textContent = 'Товары не найдены'; return; }
  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `<img src="${p.image}" alt=""><div class="body"><small>${p.category}</small><h2>${p.name}</h2><p>${p.description}</p><div class="price">${p.price} сом</div><button type="button">Подробнее</button></div>`;
    card.querySelector('button').addEventListener('click', () => showDetail(p.id));
    list.appendChild(card);
  });
}
function showDetail(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  detail.innerHTML = `<img src="${p.image}" alt=""><h2 id="detailName">${p.name}</h2><p><b>Категория:</b> ${p.category}</p><p>${p.description}</p><div class="price">${p.price} сом</div>`;
  modal.classList.add('open');
}
function closeDetail() { modal.classList.remove('open'); }
document.getElementById('close').addEventListener('click', closeDetail);
modal.addEventListener('click', e => { if (e.target === modal) closeDetail(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetail(); });
search.addEventListener('input', e => renderList(e.target.value));
fetch('products.json')
  .then(response => { if (!response.ok) throw new Error('JSON не найден'); return response.json(); })
  .then(data => { products = data; renderList(); })
  .catch(() => { list.textContent = 'Не удалось загрузить товары. Откройте сайт через Live Server.'; });
