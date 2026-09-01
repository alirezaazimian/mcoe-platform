import {
  useEffect,
} from 'react';

import {
  X,
} from 'lucide-react';


export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 620,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (
      event
    ) => {
      if (
        event.key === 'Escape'
      ) {
        onClose();
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    window.addEventListener(
      'keydown',
      onKeyDown
    );

    document.body.style.overflow =
      'hidden';

    return () => {
      window.removeEventListener(
        'keydown',
        onKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    open,
    onClose,
  ]);


  if (!open) {
    return null;
  }


  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          'center',
        padding: 16,
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
          background:
            'rgba(46,42,38,0.35)',
          backdropFilter:
            'blur(2px)',
          cursor: 'default',
        }}
      />

      <div
        className="neu-raised"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: 22,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          borderRadius: 18,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems:
              'center',
            justifyContent:
              'space-between',
            flexShrink: 0,
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#3a3a3a',
              margin: 0,
            }}
          >
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              color: '#9a9a9a',
              display: 'flex',
            }}
          >
            <X
              style={{
                width: 18,
                height: 18,
              }}
            />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
