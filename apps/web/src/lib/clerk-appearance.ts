export const sharedClerkAppearance = {
  variables: {
    colorPrimary: '#635bff',
    colorBackground: 'transparent',
    colorText: '#09090b',
    colorTextSecondary: '#52525b',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    rootBox: { width: '100%' },
    cardBox: { width: '100%', boxShadow: 'none', border: 'none', background: 'transparent' },
    card: { boxShadow: 'none', padding: 0, background: 'transparent', border: 'none' },
    headerTitle: { display: 'none' },
    headerSubtitle: { display: 'none' },
    dividerLine: { background: 'rgba(9, 9, 11, 0.1)' },
    dividerText: { color: '#71717a' },
    formFieldLabel: { color: '#3f3f46', fontWeight: '600', fontSize: '14px' },
    formFieldInput: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(9, 9, 11, 0.1)',
      borderRadius: '12px',
      fontSize: '15px',
      padding: '12px 14px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02) inset',
      outline: 'none',
      color: '#09090b',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      '&:focus': {
        borderColor: '#635bff',
        boxShadow: '0 0 0 3px rgba(99, 91, 255, 0.15)',
      }
    },
    formButtonPrimary: {
      background: '#635bff',
      color: '#ffffff',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      padding: '12px',
      boxShadow: '0 4px 14px rgba(99,91,255,0.25)',
      border: 'none',
      transition: 'transform 0.1s, box-shadow 0.2s',
      '&:hover': {
        background: '#524add',
        boxShadow: '0 6px 20px rgba(99,91,255,0.35)',
      },
      '&:active': {
        transform: 'scale(0.98)'
      }
    },
    footerActionLink: { color: '#635bff', fontWeight: '600' },
    identityPreviewEditButton: { color: '#635bff' },
    socialButtonsBlockButton: {
      background: '#ffffff',
      border: '1px solid rgba(9, 9, 11, 0.1)',
      borderRadius: '12px',
      fontSize: '14px',
      color: '#09090b',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      '&:hover': {
        background: '#fafafa',
        borderColor: 'rgba(9, 9, 11, 0.15)',
      }
    },
  },
}
