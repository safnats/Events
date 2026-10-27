import React, { useState } from 'react';
import { FiSettings, FiCheck, FiSliders, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { useNotification } from '../../context/NotificationContext';

export const AdminSettings = () => {
  const { success } = useNotification();
  const [currency, setCurrency] = useState('USD');
  const [feePercentage, setFeePercentage] = useState(8);

  const handleSave = (e) => {
    e.preventDefault();
    success('System configuration saved successfully!');
  };

  return (
    <div className="d-flex flex-column gap-4" style={{ maxWidth: 840 }}>
      <div>
        <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
          Platform Settings & Gate Policies
        </h1>
        <p className="text-muted small mb-0">
          Configure payment processing gateways, ticketing tax rules, and turnstile sync intervals.
        </p>
      </div>

      <form onSubmit={handleSave} className="d-flex flex-column gap-4">
        {/* Gateway settings */}
        <div className="admin-card p-4">
          <h2 className="h6 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#350047' }}>
            Payment Gateway & Financial Parameters
          </h2>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">Operating Currency</label>
              <select className="form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD ($ - United States Dollar)</option>
                <option value="EUR">EUR (€ - Euro)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">Default Service Fee (%)</label>
              <input
                type="number"
                className="form-control"
                value={feePercentage}
                onChange={(e) => setFeePercentage(e.target.value)}
              />
            </div>

            <div className="col-12">
              <div className="form-check form-switch mt-2">
                <input className="form-check-input" type="checkbox" id="instantPayout" defaultChecked />
                <label className="form-check-label small fw-semibold text-secondary" htmlFor="instantPayout">
                  Automate Instant Verification Receipts (Recommended)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Gate security settings */}
        <div className="admin-card p-4">
          <h2 className="h6 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#350047' }}>
            Gate Check-in Security Settings
          </h2>

          <div className="d-flex flex-column gap-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="preventDup" defaultChecked />
              <label className="form-check-label small fw-semibold text-secondary" htmlFor="preventDup">
                Strict duplicate ticket rejection (blocks multiple entries with same QR code)
              </label>
            </div>

            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="offlineSync" defaultChecked />
              <label className="form-check-label small fw-semibold text-secondary" htmlFor="offlineSync">
                Enable local caching for offline entrance gate scanners during network dropouts
              </label>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-accent-pink px-4 py-2">
            Save Configuration Changes
          </button>
        </div>
      </form>
    </div>
  );
};
