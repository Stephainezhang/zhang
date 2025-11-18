// 轮播图
const pic = document.querySelector('.pic');
const dots = document.querySelectorAll('.dot');
let idx = 0, timer = setInterval(next, 4000);

function next() {
  idx = (idx + 1) % 3;
  sync();
}
function sync() {
  pic.style.transform = `translateX(${-idx * 990}px)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}
dots.forEach((d, i) => d.onclick = () => {
  clearInterval(timer);
  idx = i;
  sync();
  timer = setInterval(next, 4000);
});

// 加载
const io = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      const img = e.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      io.unobserve(img);
    }
  });
});
document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));

// 购物车
const cartNum = document.querySelector('.cart i');
let count = Number(localStorage.getItem('cart') || '22');
cartNum.textContent = count;
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-cart')) {
    count++;
    cartNum.textContent = count;
    localStorage.setItem('cart', count);
    e.target.textContent = '已加入';
    e.target.disabled = true;
  }
});

// 搜索回车
document.querySelector('.search input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const kw = e.target.value.trim();
    if (kw) location.href = `search.html?keyword=${encodeURIComponent(kw)}`;
  }
});