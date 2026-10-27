import React from 'react';
import {
  FiZap,
  FiShield,
  FiSmartphone,
  FiSmile,
  FiCheckCircle
} from 'react-icons/fi';

export const ValuePropositions = () => {
  const features = [
    {
      icon: <FiZap size={28} style={{ color: '#F43F8C' }} />,
      title: 'Instant QR Delivery',
      desc: 'Tickets generated immediately upon checkout. Add to Apple Wallet, Google Wallet or save as PDF.'
    },
    {
      icon: <FiShield size={28} style={{ color: '#350047' }} />,
      title: '100% Verified Events',
      desc: 'Direct partnerships with leading venues and world-class promoters. Zero fake passes, guaranteed.'
    },
    {
      icon: <FiSmartphone size={28} style={{ color: '#F43F8C' }} />,
      title: 'Seamless Mobile Entry',
      desc: 'High-speed scanner integration at entry gates. Just flash your dynamic screen QR and step right in.'
    },
    {
      icon: <FiSmile size={28} style={{ color: '#350047' }} />,
      title: 'Attendee Protection',
      desc: 'Clear refund policies, automated reschedule alerts, and 24/7 dedicated concierge assistance.'
    }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="content-container py-3">
        <div className="text-center max-w-700 mx-auto mb-5" style={{ maxWidth: 640 }}>
          <div className="badge-pink-pill mb-2">The Eventra Standard</div>
          <h2 className="section-title mb-2">Designed For The Best Live Experiences</h2>
          <p className="text-muted">
            We remove the friction from discovering, booking, and experiencing extraordinary events.
          </p>
        </div>

        <div className="row g-4">
          {features.map((item, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div
                className="eventra-card p-4 h-100"
                style={{
                  backgroundColor: '#FAF7FC',
                  borderColor: '#EFE7F5'
                }}
              >
                <div
                  className="rounded-3 p-3 d-inline-flex mb-3"
                  style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 14px rgba(53, 0, 71, 0.06)' }}
                >
                  {item.icon}
                </div>
                <h3 className="h5 fw-bold mb-2" style={{ color: '#350047' }}>
                  {item.title}
                </h3>
                <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
