import Navbar from '../components/Navbar';  // Import Navbar

import Image from 'next/image';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import NotificationPanel from '../components/NotificationPanel';

export default function Home() {
  return (
    <div>
      <Navbar />  {/* Navbar is now included at the top */}

      {/* Landing page content */}
      <section style={styles.landingPage}>
        <h1>Welcome to My Chat App</h1>
        <p>Connect with your friends and family!</p>
      </section>

      {/* Chat section */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ChatWindow messages={[]} />
        <MessageInput onSendMessage={(message) => {}} />
        <NotificationPanel notifications={[]} />
      </div>
    </div>
  );
}

const styles = {
  landingPage: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f5f5f5',
  },
};

