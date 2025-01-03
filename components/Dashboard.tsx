import { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('rss');

  return (
    <div className="min-h-screen bg-gray-400 text-black">
      <div className="container mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-6 border-b border-gray-300">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'rss'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-900 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab('rss')}
          >
            RSS Feed
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'rtmp'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab('rtmp')}
          >
            Live Stream
          </button>
        </div>

        {/* Content */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {activeTab === 'rss' && (
            <RSSFeed />
          )}
          {activeTab === 'rtmp' && (
            <RTMPLiveStream />
          )}
        </div>
      </div>
    </div>
  );
}

// RSS Feed Component
function RSSFeed() {
  const rssFeedUrl = 'https://feeds.simplecast.com/54nAGcIl';

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Podcast Episodes</h2>
      <p>
        Fetch and display the RSS feed from:
        {/* <a href={rssFeedUrl} className="text-blue-500 hover:underline ml-1">
          {rssFeedUrl}
        </a> */}
      </p>
    </div>
  );
}

// RTMP Live Stream Component
function RTMPLiveStream() {
  const rtmpUrl = 'rtmp://test.com/live';

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Stream</h2>
      <p>To stream live, use the following RTMP URL:</p>
      <code className="block bg-gray-100 p-2 rounded mt-2">{rtmpUrl}</code>
    </div>
  );
}
