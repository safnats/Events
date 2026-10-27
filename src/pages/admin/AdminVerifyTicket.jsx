import React, { useState } from 'react';
import {
  FiCheckSquare,
  FiCamera,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiClock,
  FiUser,
  FiCalendar,
  FiMapPin,
  FiRefreshCw
} from 'react-icons/fi';
import { bookingService } from '../../services/bookingService';
import { useNotification } from '../../context/NotificationContext';

export const AdminVerifyTicket = () => {
  const { success, warning, error } = useNotification();
  const [ticketInput, setTicketInput] = useState('TKT-EVT-78901');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [isScanningActive, setIsScanningActive] = useState(true);

  const handleVerify = async (codeToVerify) => {
    const code = codeToVerify || ticketInput;
    if (!code.trim()) {
      error('Please enter a ticket ID or scan QR code.');
      return;
    }

    setLoading(true);
    const result = await bookingService.verifyTicket(code);
    setVerificationResult(result);
    setLoading(false);

    if (result.status === 'VALID') {
      success('Ticket Verified! Valid for admission.');
    } else if (result.status === 'ALREADY_USED') {
      warning('Warning: Ticket was already scanned and used!');
    } else if (result.status === 'CANCELLED') {
      error('Access Denied: Ticket cancelled or refunded.');
    } else {
      error('Invalid Ticket: Not found in database.');
    }
  };

  const handleCheckIn = async () => {
    if (!verificationResult?.booking?.ticketId) return;

    setCheckingIn(true);
    const updated = await bookingService.checkInTicket(verificationResult.booking.ticketId);
    setCheckingIn(false);

    setVerificationResult({
      status: 'ALREADY_USED',
      message: `Checked in successfully at ${updated.checkedInAt || 'just now'}.`,
      booking: updated
    });

    success(`Attendee ${updated.attendeeName} checked in successfully!`);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div>
        <h1 className="h4 fw-bold mb-1" style={{ color: '#1F0E2A' }}>
          Gate Access & Ticket Verification
        </h1>
        <p className="text-muted small mb-0">
          Cryptographic check-in terminal to validate tickets and prevent duplicate venue entry.
        </p>
      </div>

      <div className="row g-4">
        {/* Left Column: QR Scanner & Manual Entry */}
        <div className="col-lg-6">
          {/* Scanner Simulation Viewfinder */}
          <div className="admin-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h6 fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: '#350047' }}>
                <FiCamera /> Optical QR Scanner Interface
              </h2>
              <span
                className="badge rounded-pill px-2 py-1"
                style={{ backgroundColor: isScanningActive ? '#10B981' : '#9CA3AF', color: '#fff' }}
              >
                {isScanningActive ? 'SCANNER LIVE' : 'PAUSED'}
              </span>
            </div>

            {/* Viewfinder frame */}
            <div
              className="rounded-4 overflow-hidden position-relative d-flex flex-column align-items-center justify-content-center p-4 text-center"
              style={{
                height: 280,
                backgroundColor: '#1F0E2A',
                border: '2px dashed #F43F8C'
              }}
            >
              {/* Laser sweep animation */}
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  right: '10%',
                  height: 3,
                  backgroundColor: '#F43F8C',
                  boxShadow: '0 0 14px #F43F8C',
                  animation: 'scanLaser 2.2s ease-in-out infinite alternate'
                }}
              />

              <style>{`
                @keyframes scanLaser {
                  0% { top: 15%; opacity: 0.8; }
                  50% { opacity: 1; }
                  100% { top: 85%; opacity: 0.8; }
                }
              `}</style>

              <div
                className="p-4 rounded-3 border border-2 border-white border-opacity-50 text-white"
                style={{ width: 170, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div className="text-white-50 small">
                  Align Gate QR Pass
                </div>
              </div>

              <div className="text-white-50 small mt-3">
                Aim device camera at customer's digital or printed pass
              </div>
            </div>

            {/* Simulation Preset Quick Buttons */}
            <div className="mt-3 pt-2">
              <div className="text-muted small fw-semibold mb-2">Simulate Scan Scenarios:</div>
              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTicketInput('TKT-EVT-78901');
                    handleVerify('TKT-EVT-78901');
                  }}
                  className="btn btn-xs btn-outline-success py-1 px-2"
                  style={{ fontSize: '0.78rem' }}
                >
                  &check; Valid Pass (Alex M.)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTicketInput('TKT-EVT-78902');
                    handleVerify('TKT-EVT-78902');
                  }}
                  className="btn btn-xs btn-outline-primary py-1 px-2"
                  style={{ fontSize: '0.78rem' }}
                >
                  &check; Valid Pass (AI Summit)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTicketInput('TKT-FAKE-99999');
                    handleVerify('TKT-FAKE-99999');
                  }}
                  className="btn btn-xs btn-outline-danger py-1 px-2"
                  style={{ fontSize: '0.78rem' }}
                >
                  &times; Invalid / Counterfeit
                </button>
              </div>
            </div>
          </div>

          {/* Manual Ticket ID Entry */}
          <div className="admin-card p-4">
            <h2 className="h6 fw-bold mb-3" style={{ color: '#350047' }}>
              Manual Ticket ID Lookup
            </h2>

            <div className="input-group mb-3">
              <span className="input-group-text bg-light text-muted">
                <FiSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter TKT-EVT-XXXXX or EVT-XXXXX"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleVerify(ticketInput)}
                disabled={loading}
                className="btn btn-accent-pink px-4"
              >
                {loading ? 'Verifying...' : 'Verify Ticket'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Verification Result Panel */}
        <div className="col-lg-6">
          <div className="admin-card p-4 h-100">
            <h2 className="h6 fw-bold mb-3 pb-2 border-bottom" style={{ color: '#350047' }}>
              Ticket Status & Attendee Clearance
            </h2>

            {verificationResult ? (
              <div className="d-flex flex-column gap-3">
                {/* 1. Status Indicator Banner */}
                {verificationResult.status === 'VALID' && (
                  <div
                    className="p-3 rounded-3 d-flex align-items-center gap-3"
                    style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46' }}
                  >
                    <FiCheckCircle size={32} style={{ color: '#10B981', flexShrink: 0 }} />
                    <div>
                      <div className="fw-bold fs-6">ADMISSION GRANTED (VALID TICKET)</div>
                      <div className="small">{verificationResult.message}</div>
                    </div>
                  </div>
                )}

                {verificationResult.status === 'ALREADY_USED' && (
                  <div
                    className="p-3 rounded-3 d-flex align-items-center gap-3"
                    style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E' }}
                  >
                    <FiAlertTriangle size={32} style={{ color: '#F59E0B', flexShrink: 0 }} />
                    <div>
                      <div className="fw-bold fs-6">ALREADY CHECKED IN (DUPLICATE)</div>
                      <div className="small">{verificationResult.message}</div>
                    </div>
                  </div>
                )}

                {verificationResult.status === 'INVALID' && (
                  <div
                    className="p-3 rounded-3 d-flex align-items-center gap-3"
                    style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B' }}
                  >
                    <FiXCircle size={32} style={{ color: '#EF4444', flexShrink: 0 }} />
                    <div>
                      <div className="fw-bold fs-6">ACCESS REJECTED (INVALID PASS)</div>
                      <div className="small">{verificationResult.message}</div>
                    </div>
                  </div>
                )}

                {verificationResult.status === 'CANCELLED' && (
                  <div
                    className="p-3 rounded-3 d-flex align-items-center gap-3"
                    style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B' }}
                  >
                    <FiAlertTriangle size={32} style={{ color: '#EF4444', flexShrink: 0 }} />
                    <div>
                      <div className="fw-bold fs-6">TICKET CANCELLED / REFUNDED</div>
                      <div className="small">{verificationResult.message}</div>
                    </div>
                  </div>
                )}

                {/* 2. Detailed Metadata Card */}
                {verificationResult.booking ? (
                  <div className="p-4 rounded-3 border bg-light mt-2">
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="text-muted small">Attendee Name</div>
                        <div className="fw-bold fs-6" style={{ color: '#1F0E2A' }}>
                          {verificationResult.booking.attendeeName}
                        </div>
                        <div className="text-muted small">{verificationResult.booking.attendeeEmail}</div>
                      </div>

                      <div className="col-sm-6">
                        <div className="text-muted small">Ticket Tier</div>
                        <div className="fw-bold" style={{ color: '#F43F8C' }}>
                          {verificationResult.booking.ticketTier}
                        </div>
                        <div className="small text-muted">{verificationResult.booking.ticketQuantity} person(s) admitted</div>
                      </div>

                      <div className="col-12">
                        <div className="text-muted small">Event Name</div>
                        <div className="fw-semibold" style={{ color: '#350047' }}>
                          {verificationResult.booking.eventTitle}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="text-muted small">Venue & Location</div>
                        <div className="small">{verificationResult.booking.eventVenue}</div>
                      </div>

                      <div className="col-sm-6">
                        <div className="text-muted small">Booking Reference</div>
                        <div className="fw-mono fw-bold">{verificationResult.booking.bookingReference}</div>
                      </div>
                    </div>

                    {/* Check In Action Button */}
                    {verificationResult.status === 'VALID' && (
                      <div className="mt-4 pt-3 border-top">
                        <button
                          type="button"
                          onClick={handleCheckIn}
                          disabled={checkingIn}
                          className="btn btn-primary-purple w-100 py-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2"
                        >
                          <FiCheckCircle size={20} />
                          {checkingIn ? 'Confirming Gate Entry...' : 'Grant Entry & Check In Attendee'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <FiCheckSquare size={48} className="text-muted opacity-50 mb-3" />
                <p className="small mb-0">
                  Scan a QR ticket pass or input a ticket code on the left to verify authenticity.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
