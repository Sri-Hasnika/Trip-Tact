import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DestinationDetails = () => {
  const { id } = useParams(); // Get the destination ID from the URL
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const token = JSON.parse(user).token;

  const sampleDestinations = [
    {
      id: 1,
      name: 'Amazon Rainforest',
      category: 'nature-and-wildlife',
      description: 'Explore the lush greenery of the Amazon.',
      imageUrl: 'https://t3.ftcdn.net/jpg/05/36/24/84/360_F_536248460_6v17TuLgFcIzwNzNzQfrRfeO2OUvOgAe.jpg',
      openingHours: '6:00 AM - 6:00 PM',
      entryFee: 20,
      contactInfo: 'contact@amazontrails.com',
      notes: 'Bring insect repellent and wear comfortable hiking boots.',
    },
    {
      id: 2,
      name: 'Maldives',
      category: 'beaches-and-islands',
      description: 'Pristine beaches and crystal-clear waters.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzYlE5QESJtCIKuFkQ4RashZOJ4oKESadqDw&s',
      openingHours: 'Open 24/7',
      entryFee: null,
      contactInfo: 'info@maldivesparadise.com',
      notes: 'Best time to visit is from November to April.',
    },
    {
      id: 3,
      name: 'Disneyland',
      category: 'family-and-romantic-getaways',
      description: 'Fun for all ages at Disneyland.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/971/593/287/disneyland-walt-disney-disney-wallpaper-preview.jpg',
      openingHours: '9:00 AM - 10:00 PM',
      entryFee: 120,
      contactInfo: 'contact@disneyland.com',
      notes: 'Tickets are cheaper if booked online in advance.',
    },
    {
      id: 4,
      name: 'Mount Everest',
      category: 'adventure-and-nightlife',
      description: 'The ultimate adventure for climbers.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/571/11/735/sunlight-mount-everest-digital-art-mountains-wallpaper-preview.jpg',
      openingHours: 'Accessible anytime (depending on weather)',
      entryFee: 30,
      contactInfo: 'info@everestadventures.com',
      notes: 'Requires a trekking permit and acclimatization days.',
    },
    {
      id: 6,
      name: 'Pyramids of Giza',
      category: 'cultural-and-historical-sites',
      description: 'Marvel at ancient wonders.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/27/399/789/sunsets-clouds-landscapes-nature-desert-egypt-pyramids-great-pyramid-of-giza-2560x1600-nature-deserts-hd-art-wallpaper-preview.jpg',
      openingHours: '8:00 AM - 5:00 PM',
      entryFee: 15,
      contactInfo: 'info@gizapyramids.gov',
      notes: 'Early morning visits recommended to avoid the heat.',
    },
    {
      id: 7,
      name: 'Serengeti National Park',
      category: 'nature-and-wildlife',
      description: 'Witness the great migration.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDReUdgtBWEweL3tqtJxfqHTExViFlEJSlQ&s',
      openingHours: '6:00 AM - 7:00 PM',
      entryFee: 40,
      contactInfo: 'info@serengeti.com',
      notes: 'Best time to visit is during the annual migration (June-October).',
    },
    {
      id: 8,
      name: 'Kyoto',
      category: 'cultural-and-historical-sites',
      description: 'Traditional temples and culture.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/171/438/477/night-clouds-street-japan-track-hd-wallpaper-thumb.jpg',
      openingHours: 'Varies by site (usually 9:00 AM - 5:00 PM)',
      entryFee: 10,
      contactInfo: 'visit@kyoto.jp',
      notes: 'Do Not miss the Arashiyama Bamboo Grove and Fushimi Inari Shrine.',
    },
    {
      id: 9,
      name: 'Dubai',
      category: 'luxury-and-wellness',
      description: 'Experience opulence and grandeur.',
      imageUrl: 'https://wallpapers.com/images/featured/dubai-z03qow0d0d3yuumg.jpg',
      openingHours: 'Open 24/7',
      entryFee: null,
      contactInfo: 'info@visitdubai.com',
      notes: 'Check out the Burj Khalifa and Desert Safari experiences.',
    },
    {
      id: 10,
      name: 'Bangkok',
      category: 'budget-and-shopping-destinations',
      description: 'Affordable yet vibrant.',
      imageUrl: 'https://t4.ftcdn.net/jpg/00/98/44/37/360_F_98443741_G8VlrLoRGWUSA3cGgw36RqEiBkfVR9pX.jpg',
      openingHours: 'Varies by attraction',
      entryFee: null,
      contactInfo: 'contact@tourismthailand.org',
      notes: 'Do not miss the floating markets and street food.',
    },
    {
      id: 11,
      name: 'Santorini',
      category: 'beaches-and-islands',
      description: 'Picturesque sunsets for couples.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/889/754/414/greece-santorini-wallpaper-preview.jpg',
      openingHours: 'Open 24/7',
      entryFee: null,
      contactInfo: 'info@santorinivisits.com',
      notes: 'Best visited during the off-season (April-May or September-October).',
    },
    {
      id: 12,
      name: 'Ibiza',
      category: 'adventure-and-nightlife',
      description: 'Party all night at Ibiza.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/240/986/362/landing-sea-spain-ibiza-wallpaper-preview.jpg',
      openingHours: 'Varies by club/venue',
      entryFee: 50,
      contactInfo: 'info@ibiza-party.com',
      notes: 'Most famous clubs are Pacha and Amnesia.',
    },
    {
      id: 13,
      name: 'Tokyo',
      category: 'cultural-and-historical-sites',
      description: 'A haven for food lovers.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/361/244/960/street-city-tokyo-japan-wallpaper-preview.jpg',
      openingHours: 'Open 24/7',
      entryFee: null,
      contactInfo: 'info@tokyoguide.jp',
      notes: 'Try sushi at Tsukiji Fish Market and ramen in Akihabara.',
    },
    {
      id: 14,
      name: 'Bali Retreat',
      category: 'luxury-and-wellness',
      description: 'Relax and rejuvenate in Bali.',
      imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/414729041.jpg?k=1bf583d0f81cb9bfcd046c7f863775c3235e5ea95ab26739f57c11f526c4a408&o=',
      openingHours: 'Open 24/7',
      entryFee: null,
      contactInfo: 'info@baliretreats.com',
      notes: 'Best enjoyed at private resorts for a luxurious experience.',
    },
    {
      id: 15,
      name: 'Milan',
      category: 'budget-and-shopping-destinations',
      description: 'Fashion capital of the world.',
      imageUrl: 'https://c4.wallpaperflare.com/wallpaper/464/820/842/italy-arch-puddle-lombardy-wallpaper-preview.jpg',
      openingHours: 'Varies by shopping area',
      entryFee: null,
      contactInfo: 'info@visitmilan.com',
      notes: 'Do not miss the Galleria Vittorio Emanuele II and Duomo di Milano.',
    },
  ];
  
  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      const destinationData = sampleDestinations.find((dest) => dest.id === parseInt(id));
      if (destinationData) {
        setDestination(destinationData); // Set destination from sample data
      } else {
        throw new Error('Destination not found');
      }
    } catch (err) {
      setError(err.message || 'Error fetching destination details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinationDetails();
  }, [id]);

  // Format category name for display
  const formatCategory = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' & ');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="text-center p-8">
          <div className="inline-block w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
<div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-r from-red-50 to-pink-50 p-4">
        <div className="bg-white pt-20 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/destinations')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Destination not found</h3>
          <p className="text-gray-600 mb-6">We couldn't find the destination you're looking for.</p>
          <button 
            onClick={() => navigate('/destinations')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Explore Other Destinations
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    category,
    imageUrl,
    openingHours,
    entryFee,
    contactInfo,
    notes,
  } = destination;

  // Category badges color mapping
  const getCategoryColor = (cat) => {
    const categoryColors = {
      'nature-and-wildlife': 'bg-green-100 text-green-800',
      'beaches-and-islands': 'bg-blue-100 text-blue-800',
      'cultural-and-historical-sites': 'bg-amber-100 text-amber-800',
      'family-and-romantic-getaways': 'bg-pink-100 text-pink-800',
      'adventure-and-nightlife': 'bg-violet-100 text-violet-800',
      'luxury-and-wellness': 'bg-purple-100 text-purple-800',
      'budget-and-shopping-destinations': 'bg-teal-100 text-teal-800',
    };
    return categoryColors[cat] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/destinations')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Explore Destinations
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero image section */}
          <div className="relative h-80 sm:h-96 w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor(category)}`}>
                {formatCategory(category)}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{name}</h1>
            </div>
          </div>
          
          {/* Content section */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main description */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About this destination</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Travel Notes</h3>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-gray-700">{notes || 'No additional notes available.'}</p>
                  </div>
                </div>
              </div>
              
              {/* Details sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Destination Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Opening Hours</h4>
                        <p className="text-gray-800">{openingHours || 'Not specified'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Entry Fee</h4>
                        <p className="text-gray-800">{entryFee ? `$${entryFee}` : 'Free'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                        <p className="text-gray-800">{contactInfo || 'Not available'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add to My Trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;