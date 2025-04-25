const API = 'http://localhost:5000/api/posts';

async function fetchPosts() {
  const res = await fetch(API);
  const posts = await res.json();

  const container = document.getElementById('posts');
  container.innerHTML = posts.map(post => `
    <div>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <small>By ${post.author}</small>
      <hr/>
    </div>
  `).join('');
}

document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const author = document.getElementById('author').value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, author })
  });

  e.target.reset();
  fetchPosts();
});

fetchPosts();