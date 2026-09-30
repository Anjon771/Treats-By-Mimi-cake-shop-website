const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store for orders and inquiries
const orders = [];
const inquiries = [];

app.post('/api/orders', (req, res) => {
  const { customerName, phone, email, deliveryMethod, address, deliveryDate, notes, items, subtotal, deliveryFee, total } = req.body;
  const orderId = `MIMI-${Math.floor(1000 + Math.random() * 9000)}`;
  const order = {
    orderId,
    customerName: customerName || 'Valued Guest',
    phone: phone || '+234',
    email: email || '',
    deliveryMethod: deliveryMethod || 'pickup',
    address: address || '28 Usuma Street, Maitama, Abuja',
    deliveryDate: deliveryDate || 'Next Available Slot',
    notes: notes || '',
    items: Array.isArray(items) ? items : [],
    subtotal: Number(subtotal) || 0,
    deliveryFee: Number(deliveryFee) || 0,
    total: Number(total) || 0,
    status: 'Confirmed — Preparing in Maitama Kitchen',
    createdAt: new Date().toISOString()
  };
  orders.unshift(order);
  res.status(201).json({ ok: true, order });
});

app.get('/api/orders', (req, res) => {
  res.json({ orders });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const inquiry = {
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name || 'Guest',
    email: email || '',
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message: message || '',
    createdAt: new Date().toISOString()
  };
  inquiries.unshift(inquiry);
  res.status(201).json({ ok: true, inquiry });
});

// Alias cakes.html to cake.html to prevent broken breadcrumb links
app.get('/cakes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'cake.html'));
});

app.use(express.static(path.join(__dirname)));

// Prevent missing .js or .css assets from returning HTML (which causes SyntaxError: Unexpected token '<')
app.get('*', (req, res) => {
  const ext = path.extname(req.path).toLowerCase();
  if (ext === '.js' || ext === '.mjs') {
    return res.status(200).type('application/javascript').send('// Asset not found');
  }
  if (ext === '.css') {
    return res.status(200).type('text/css').send('/* Asset not found */');
  }
  if (ext && ext !== '.html' && ext !== '.htm') {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
