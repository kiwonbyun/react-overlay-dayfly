import React, { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface OverlayProps {
  isOpen: boolean;
  children: React.ReactNode;
  close: () => void;
}

export const Overlay = ({ isOpen, children, close }: OverlayProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    throw new Error(
      "'modal-root' element not found. Please ensure it exists in the DOM."
    );
  }

  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      <div
        className="dayfly-overlay-dim"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
        onClick={close}
      />
      <div
        className="dayfly-overlay-container"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '5px',
          boxShadow: '5px 6px 10px 0px rgba(0, 0, 0, 0.12)',
          padding: '5px 10px',
        }}
      >
        {children}
      </div>
    </Fragment>,
    document.getElementById('modal-root') as HTMLElement
  );
};
