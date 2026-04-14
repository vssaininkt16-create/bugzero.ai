import '../globals.css'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {children}
    </div>
  )
}
