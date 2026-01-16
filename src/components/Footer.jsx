export default function Footer() {
  return (
    <footer
      style={{
        padding: '20px',
        textAlign: 'center',
        background: '#0b0b0b',
        color: '#666',
        fontSize: '0.9rem',
      }}
    >
      © {new Date().getFullYear()} Albin Joseph
    </footer>
  )
}
