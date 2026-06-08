'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/leads');
      } else {
        const d = await res.json();
        setError(d.error ?? 'Invalid password.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 16, padding: '48px 40px', width: 360 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', marginBottom: 8 }}>
          MU<span style={{ color: '#F72585' }}>X</span>
        </div>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 32 }}>Admin access</div>

        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            required
            style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#F87171', fontSize: 13, marginTop: 10 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 16, width: '100%', background: '#F72585', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 0', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
