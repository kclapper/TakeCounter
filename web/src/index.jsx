import React, { useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { useRef, useEffect } from 'react';

import { Modal } from 'bootstrap';

import TakeCounter from '../../components/src/TakeCounter';

function DownloadBanner() {
  const ref = useRef(null);
  const modal = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (!modal.current) {
      modal.current = new Modal(ref.current);
      modal.current.show();
    }
  }, [ref, modal]);

  return (
    <div ref={ref} className="modal fade" id="downloadModal" tabIndex="-1" aria-labelledby="downloadModalLabel" aria-hidden="true" data-bs-theme="light">
      <div className="modal-dialog">
        <div className="modal-content bg-white">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="downloadModalLabel">Download the desktop version</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" data-bs-theme="light" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Download the MacOS desktop version of Take Counter to take advantage
            of global keyboard shorcuts and automatic take counting.
            <br />
            <div className='mx-auto text-center'>
              <a className="icon-link" href="https://github.com/kclapper/TakeCounter/releases/latest" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                </svg>
                  Take Counter Downloads
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DownloadBanner />
    <TakeCounter />
  </React.StrictMode>
);
