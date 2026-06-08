'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Lead = {
  id: string; name: string; email: string; company: string | null;
  topic: string | null; budget: string | null; message: string;
  status: 'new' | 'replied' | 'closed'; notes: string | null;
  created_at: string;
};

const STATUS_COLORS = {
  new:     { bg: '#1a3a1a', text: '#4ade80', border: '#166534' },
  replied: { bg: '#1a2a3a', text: '#60a5fa', border: '#1e40af' },
  closed:  { bg: '#2a2a2a', text: '#9ca3af', border: '#374151' },
};

export default function AdminLeads() {
  const router = useRouter();
  const [leads, setLeads]           = useState<Lead[]>([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('');
  const [page, setPage]             = useState(1);
  const [selected, setSelected]     = useState<Lead | null>(null);
  const [notes, setNotes]           = useState('');
  const [saving, setSaving]         = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search)       params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);

    const res = await fetch(`/api/admin/leads?${params}`);
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setLeads(data.leads ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [page, search, statusFilter, router]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateLead = async (id: string, updates: Partial<Pick<Lead, 'status' | 'notes'>>) => {
    setSaving(true);
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
    setSaving(false);
    fetchLeads();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, ...updates } : null);
  };

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  const S = { fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#0F0F0F', color: '#E5E7EB' };

  return (
    <div style={S}>
      {/* Header */}
      <div style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.04em' }}>MU<span style={{ color: '#F72585' }}>X</span> <span style={{ fontSize: 13, fontWeight: 400, color: '#666', marginLeft: 8 }}>Lead Dashboard</span></div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#666' }}>{total} total leads</span>
          <button onClick={logout} style={{ background: 'none', border: '1px solid #333', borderRadius: 8, padding: '6px 14px', color: '#999', fontSize: 13, cursor: 'pointer' }}>Sign out</button>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 57px)' }}>

        {/* Sidebar */}
        <div style={{ width: 360, borderRight: '1px solid #1F1F1F', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          {/* Filters */}
          <div style={{ padding: '16px', borderBottom: '1px solid #1F1F1F', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              placeholder="Search name, email, company…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ background: '#111', border: '1px solid #2A2A2A', borderRadius: 8, padding: '9px 12px', color: '#E5E7EB', fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: 6 }}>
              {['', 'new', 'replied', 'closed'].map(s => (
                <button
                  key={s}
                  onClick={() => { setStatus(s); setPage(1); }}
                  style={{
                    flex: 1, padding: '7px 4px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: statusFilter === s ? '#F72585' : '#1A1A1A',
                    color:      statusFilter === s ? '#fff'    : '#999',
                    border: `1px solid ${statusFilter === s ? '#F72585' : '#2A2A2A'}`,
                  }}
                >
                  {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Lead list */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {loading && <div style={{ padding: 24, color: '#666', fontSize: 13 }}>Loading…</div>}
            {!loading && leads.length === 0 && <div style={{ padding: 24, color: '#666', fontSize: 13 }}>No leads found.</div>}
            {leads.map(lead => {
              const sc = STATUS_COLORS[lead.status];
              const isSelected = selected?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => { setSelected(lead); setNotes(lead.notes ?? ''); }}
                  style={{
                    padding: '16px', borderBottom: '1px solid #1F1F1F', cursor: 'pointer',
                    background: isSelected ? '#1A1A1A' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{lead.name}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, fontWeight: 600 }}>{lead.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>{lead.email}</div>
                  {lead.company && <div style={{ fontSize: 12, color: '#555' }}>{lead.company}</div>}
                  <div style={{ fontSize: 11, color: '#444', marginTop: 6 }}>
                    {new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {total > 20 && (
            <div style={{ padding: '12px 16px', borderTop: '1px solid #1F1F1F', display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 8, padding: '6px 14px', color: page === 1 ? '#444' : '#E5E7EB', cursor: page === 1 ? 'default' : 'pointer', fontSize: 13 }}>
                ← Prev
              </button>
              <span style={{ fontSize: 13, color: '#666', padding: '6px 0' }}>Page {page} of {Math.ceil(total / 20)}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page * 20 >= total}
                style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 8, padding: '6px 14px', color: page * 20 >= total ? '#444' : '#E5E7EB', cursor: page * 20 >= total ? 'default' : 'pointer', fontSize: 13 }}>
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          {!selected && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#444', fontSize: 14 }}>
              Select a lead to view details
            </div>
          )}
          {selected && (() => {
            const sc = STATUS_COLORS[selected.status];
            return (
              <div style={{ maxWidth: 640 }}>
                {/* Top */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>{selected.name}</h1>
                    <a href={`mailto:${selected.email}`} style={{ color: '#F72585', fontSize: 14, textDecoration: 'none' }}>{selected.email}</a>
                  </div>
                  <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 999, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, fontWeight: 700 }}>{selected.status}</span>
                </div>

                {/* Meta */}
                <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
                  {([
                    ['Submitted', new Date(selected.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })],
                    selected.company ? ['Company', selected.company] : null,
                    selected.topic   ? ['Topic',   selected.topic]   : null,
                    selected.budget  ? ['Budget',  selected.budget]  : null,
                  ].filter((r): r is string[] => r !== null)).map(([label, value], i, arr) => (
                    <div key={label as string} style={{ display: 'flex', gap: 16, padding: '12px 20px', borderBottom: i < arr.length - 1 ? '1px solid #2A2A2A' : 'none' }}>
                      <span style={{ fontSize: 12, color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: 80 }}>{label}</span>
                      <span style={{ fontSize: 14, color: '#E5E7EB' }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Message</div>
                  <div style={{ fontSize: 15, color: '#E5E7EB', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.message}</div>
                </div>

                {/* Status */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Update Status</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(['new','replied','closed'] as const).map(s => (
                      <button key={s} onClick={() => updateLead(selected.id, { status: s })}
                        style={{
                          padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          background: selected.status === s ? STATUS_COLORS[s].bg : '#1A1A1A',
                          color:      selected.status === s ? STATUS_COLORS[s].text : '#666',
                          border: `1px solid ${selected.status === s ? STATUS_COLORS[s].border : '#2A2A2A'}`,
                        }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <div style={{ fontSize: 11, color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Notes</div>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Add private notes…"
                    rows={4}
                    style={{ width: '100%', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 10, padding: '12px 16px', color: '#E5E7EB', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
                  />
                  <button onClick={() => updateLead(selected.id, { notes })} disabled={saving}
                    style={{ marginTop: 10, background: '#F72585', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontSize: 13, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                    {saving ? 'Saving…' : 'Save notes'}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
