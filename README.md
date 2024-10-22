Digital Church Platform
A modern, interactive web application designed to strengthen church communities through digital engagement. This platform offers daily devotionals, prayer support, event management, and seamless social sharing capabilities.
Show Image
✨ Features

Daily Devotionals: Automatically fetches and displays random Bible verses daily
Interactive Prayer Wall: Community prayer request system with weekly refresh
Event Management: Display and manage church events and activities
Social Media Integration: Easy sharing on Facebook, Twitter, WhatsApp, and TikTok
Push Notifications: PWA-enabled notifications for daily devotionals and updates
Image Carousel: Showcase church moments and activities
Sermon Sharing: Share inspiring sermons across social platforms

🚀 Getting Started
Prerequisites

Modern web browser
Node.js (recommended version 14.0 or higher)
Basic understanding of HTML, CSS, and JavaScript

Installation

Clone the repository:

bashCopygit clone https://github.com/yourusername/digital-church-platform.git

Navigate to the project directory:

bashCopycd digital-church-platform

Install dependencies:

bashCopynpm install

Start the development server:

bashCopynpm start
💻 Usage
Daily Devotional

Automatically loads a new verse every 24 hours
Shares devotionals on various social media platforms
Maintains history to avoid duplicate verses

Prayer Wall

Submit prayer requests through the text input
View community prayers
Automatically refreshes weekly
Stores prayers locally using browser storage

Events

Display upcoming church events
Includes event name and date
Easily manageable through the events list

🔧 Configuration
Push Notifications
To enable push notifications, ensure your manifest.json includes:
jsonCopy{
  "name": "Digital Church Platform",
  "short_name": "Church App",
  "start_url": "/",
  "display": "standalone",
  "gcm_sender_id": "YOUR_SENDER_ID"
}
API Configuration
The application uses the Bible.org API for devotionals. Ensure you have proper API access configured.
📱 Progressive Web App
This application is PWA-enabled, allowing users to:

Install it on their devices
Receive push notifications
Access content offline
Experience app-like behavior

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.
🙏 Acknowledgments

Bible.org API for providing Bible verses
All contributors and community members
Open source community for various tools and libraries used

📞 Support
For support, please email andyrosecpt@gmail.com or open an issue in the repository.

Developed by : Iviwe Mtambeka
