import '../globals.css'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-cyber-bg text-white antialiased" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {children}
    </div>
  )
}
