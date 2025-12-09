import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-base">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      <WhatsAppButton 
        phoneNumber="5491112345678" 
        message="Hola! Me gustaría hacer una consulta sobre el Hotel Araucarias." 
      />
    </div>
  )
}

export default Layout