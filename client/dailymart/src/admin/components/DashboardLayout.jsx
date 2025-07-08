// src/admin/components/DashboardLayout.jsx
import React, { useState } from 'react';
import AdminNav from './AdminNav';

export default function DashboardLayout() {
  const tabs = [
    'Dashboard',
    'Orders',
    'Products',
    'Customers',
    'Messages',
    'Color Mode',
    'Components'
  ];
  const [active, setActive] = useState('Dashboard');
  const [dark, setDark]     = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // placeholder data
  const stores = [
    { id: 1, name: 'Mumbai Central',   skus: 120 },
    { id: 2, name: 'Delhi Bazaar',     skus:  85 },
    { id: 3, name: 'Chennai Plaza',    skus:  60 },
    { id: 4, name: 'Bangalore Square', skus:  45 },
  ];
  const products = [
    {
      id: 101,
      sku: 'MILK001',
      storeId: 1,
      name: 'Fresh Milk',
      image: 'https://via.placeholder.com/40',
      qty: 50,
      avgDailySales: 5,
      expiry: '2025-07-15'
    },
    {
      id: 102,
      sku: 'BREAD01',
      storeId: 2,
      name: 'Brown Bread',
      image: 'https://via.placeholder.com/40',
      qty: 30,
      avgDailySales: 3,
      expiry: '2025-07-12'
    },
    {
      id: 103,
      sku: 'EGGS001',
      storeId: 3,
      name: 'Egg Carton',
      image: 'https://via.placeholder.com/40',
      qty: 20,
      avgDailySales: 2,
      expiry: '2025-07-10'
    },
    {
      id: 104,
      sku: 'CURD001',
      storeId: 4,
      name: 'Curd Cup',
      image: 'https://via.placeholder.com/40',
      qty: 40,
      avgDailySales: 4,
      expiry: '2025-07-11'
    },
  ].map(p => {
    const today = new Date();
    const exp   = new Date(p.expiry);
    const daysRemaining = Math.max(0,
      Math.ceil((exp - today) / (1000*60*60*24))
    );
    let riskLevel = 'Low';
    if (daysRemaining < 3)       riskLevel = 'High';
    else if (daysRemaining < 7)  riskLevel = 'Medium';
    return { ...p, daysRemaining, riskLevel };
  });

  // shared table-cell styles
  const th = {
    textAlign: 'left',
    padding: '0.5rem',
    borderBottom: '2px solid #ddd'
  };
  const td = {
    padding: '0.5rem',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle'
  };

  const renderContent = () => {
    if (active === 'Dashboard') {
      // Stats
      const stats = [
        { label: 'Active Stores',  value: stores.length },
        { label: 'Total SKUs',     value: stores.reduce((sum, s) => sum + s.skus, 0) },
        { label: 'Pending Orders', value: 27 },
        { label: 'New Messages',   value: 4  },
      ];

      return (
        <>
          {/* --- Stat Cards --- */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            margin: '1rem 0'
          }}>
            {stats.map(s => (
              <div key={s.label} style={{
                background: '#fff',
                padding: '1rem',
                borderRadius: 4,
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.25rem'
                }}>{s.value}</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* --- Stores Table --- */}
          <div style={{
            background: '#fff',
            padding: '1rem',
            borderRadius: 4,
            overflowX: 'auto',
            marginBottom: '1rem'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Store ID</th>
                  <th style={th}>Store Name</th>
                  <th style={th}># of SKUs</th>
                </tr>
              </thead>
              <tbody>
                {stores.map(s => (
                  <tr key={s.id}>
                    <td style={td}>{s.id}</td>
                    <td style={td}>{s.name}</td>
                    <td style={td}>{s.skus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (active === 'Products') {
      return (
        <>
          {/* --- Products Table --- */}
          <div style={{
            background: '#fff',
            padding: '1rem',
            borderRadius: 4,
            overflowX: 'auto',
            marginBottom: '1rem'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>ID</th>
                  <th style={th}>SKU</th>
                  <th style={th}>Store ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Image</th>
                  <th style={th}>Qty</th>
                  <th style={th}>Avg Daily Sales</th>
                  <th style={th}>Days Remaining</th>
                  <th style={th}>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    style={{
                      cursor: 'pointer',
                      background: selectedProduct?.id === p.id
                        ? (dark ? '#333' : '#eef')
                        : 'transparent'
                    }}
                  >
                    <td style={td}>{p.id}</td>
                    <td style={td}>{p.sku}</td>
                    <td style={td}>{p.storeId}</td>
                    <td style={td}>{p.name}</td>
                    <td style={td}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'cover',
                          borderRadius: 4
                        }}
                      />
                    </td>
                    <td style={td}>{p.qty}</td>
                    <td style={td}>{p.avgDailySales}</td>
                    <td style={td}>{p.daysRemaining}</td>
                    <td style={{
                      ...td,
                      color: p.riskLevel==='High'
                        ? '#f44336'
                        : p.riskLevel==='Medium'
                        ? '#ff9800'
                        : '#4caf50',
                      fontWeight: 'bold'
                    }}>
                      {p.riskLevel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Product Detail --- */}
          {selectedProduct && (
            <div style={{
              background: '#fff',
              padding: '1rem',
              borderRadius: 4,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>Product Details</h3>
              <p><strong>ID:</strong> {selectedProduct.id}</p>
              <p><strong>SKU:</strong> {selectedProduct.sku}</p>
              <p><strong>Store ID:</strong> {selectedProduct.storeId}</p>
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Expiry Date:</strong> {selectedProduct.expiry}</p>
              <p><strong>Days Remaining:</strong> {selectedProduct.daysRemaining}</p>
              <p><strong>Risk Level:</strong> {selectedProduct.riskLevel}</p>
              <p><strong>Stock Qty:</strong> {selectedProduct.qty}</p>
              <p><strong>Avg Daily Sales:</strong> {selectedProduct.avgDailySales}</p>
            </div>
          )}
        </>
      );
    }

    if (active === 'Color Mode') {
      return (
        <button
          onClick={() => setDark(d => !d)}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
        >
          Switch to {dark ? 'Light' : 'Dark'} Mode
        </button>
      );
    }

    // other tabs stub
    return (
      <p style={{ padding: '1rem' }}>
        {active} content goes here.
      </p>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: dark ? '#1e1e1e' : '#f0f2f5',
      color: dark ? '#ddd' : '#333'
    }}>
      <AdminNav />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: 220,
          background: '#2f3e46',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '1rem'
        }}>
          {tabs.map(tab => (
            <div
              key={tab}
              onClick={() => {
                setActive(tab);
                setSelectedProduct(null);
              }}
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                background: active === tab ? '#52796f' : 'transparent'
              }}
            >
              {tab}
            </div>
          ))}

          <div
            onClick={() => setDark(d => !d)}
            style={{
              marginTop: 'auto',
              padding: '0.75rem 1rem',
              cursor: 'pointer'
            }}
          >
            {dark ? 'Light Mode' : 'Dark Mode'}
          </div>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          <h2>{active}</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
