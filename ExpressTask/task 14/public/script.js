document.getElementById('productForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const productName = document.getElementById('product').value;
  
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName })
      });
  
      const data = await res.text();
      alert(data);
    } catch (error) {
      console.error('Error:', error);
    }
  });
  