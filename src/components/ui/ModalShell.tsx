'use client';

import { useEffect, useRef, ReactNode, useCallback } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function ModalShell({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  'aria-label': ariaLabel,
}: ModalShellProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.classList.add('overlay-open');
      document.addEventListener('keydown', handleKeyDown);
      // Focus first focusable element
      const timer = setTimeout(() => {
        const first = modalRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('overlay-open');
      };
    } else {
      document.body.classList.remove('overlay-open');
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
      className={`fixed inset-0 z-50 bg-white flex flex-col fade-in ${className}`}
    >
      {children}
    </div>
  );
}
