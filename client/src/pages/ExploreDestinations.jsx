
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import amazon from '../assets/amazon.jpg';
import disneyland from '../assets/disneyland.jpg';
import everest from '../assets/everest.jpg';
import maldives from '../assets/maldives.jpg';
const ExploreDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sampleDestinations = [
    {
        id: 1,
        name: 'Amazon Rainforest',
        category: 'nature-and-wildlife',
        description: 'Explore the lush greenery of the Amazon.',
        imageUrl: 'https://t3.ftcdn.net/jpg/05/36/24/84/360_F_536248460_6v17TuLgFcIzwNzNzQfrRfeO2OUvOgAe.jpg'
    },
    {
        id: 2,
        name: 'Maldives',
        category: 'beaches-and-islands',
        description: 'Pristine beaches and crystal-clear waters.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzYlE5QESJtCIKuFkQ4RashZOJ4oKESadqDw&s',
    },
    {
        id: 3,
        name: 'Disneyland',
        category: 'family-and-romantic-getaways',
        description: 'Fun for all ages at Disneyland.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/971/593/287/disneyland-walt-disney-disney-wallpaper-preview.jpg'
    },
    {
        id: 4,
        name: 'Mount Everest',
        category: 'adventure-and-nightlife',
        description: 'The ultimate adventure for climbers.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/571/11/735/sunlight-mount-everest-digital-art-mountains-wallpaper-preview.jpg'
    },
    {
        id: 6,
        name: 'Pyramids of Giza',
        category: 'cultural-and-historical-sites',
        description: 'Marvel at ancient wonders.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/27/399/789/sunsets-clouds-landscapes-nature-desert-egypt-pyramids-great-pyramid-of-giza-2560x1600-nature-deserts-hd-art-wallpaper-preview.jpg'
    },
    {
        id: 7,
        name: 'Serengeti National Park',
        category: 'nature-and-wildlife',
        description: 'Witness the great migration.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDReUdgtBWEweL3tqtJxfqHTExViFlEJSlQ&s'
    },
    {
        id: 8,
        name: 'https://c4.wallpaperflare.com/wallpaper/171/438/477/night-clouds-street-japan-track-hd-wallpaper-thumb.jpg',
        category: 'cultural-and-historical-sites',
        description: 'Traditional temples and culture.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/171/438/477/night-clouds-street-japan-track-hd-wallpaper-thumb.jpg'
    },
    {
        id: 9,
        name: 'Dubai',
        category: 'luxury-and-wellness',
        description: 'Experience opulence and grandeur.',
        imageUrl: 'https://wallpapers.com/images/featured/dubai-z03qow0d0d3yuumg.jpg'
    },
    {
        id: 10,
        name: 'Bangkok',
        category: 'budget-and-shopping-destinations',
        description: 'Affordable yet vibrant.',
        imageUrl: 'https://t4.ftcdn.net/jpg/00/98/44/37/360_F_98443741_G8VlrLoRGWUSA3cGgw36RqEiBkfVR9pX.jpg'
    },
    {
        id: 11,
        name: 'Santorini',
        category: 'beaches-and-islands',
        description: 'Picturesque sunsets for couples.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/889/754/414/greece-santorini-wallpaper-preview.jpg'
    },
    {
        id: 12,
        name: 'Ibiza',
        category: 'adventure-and-nightlife',
        description: 'Party all night at Ibiza.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/240/986/362/landing-sea-spain-ibiza-wallpaper-preview.jpg'
    },
    {
        id: 13,
        name: 'Tokyo',
        category: 'cultural-and-historical-sites',
        description: 'A haven for food lovers.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/361/244/960/street-city-tokyo-japan-wallpaper-preview.jpg'
    },
    {
        id: 14,
        name: 'Bali Retreat',
        category: 'luxury-and-wellness',
        description: 'Relax and rejuvenate in Bali.',
        imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/414729041.jpg?k=1bf583d0f81cb9bfcd046c7f863775c3235e5ea95ab26739f57c11f526c4a408&o='
    },
    {
        id: 15,
        name: 'Milan',
        category: 'budget-and-shopping-destinations',
        description: 'Fashion capital of the world.',
        imageUrl: 'https://c4.wallpaperflare.com/wallpaper/464/820/842/italy-arch-puddle-lombardy-wallpaper-preview.jpg'
    }
];


  const fetchDestinations = async (category) => {
    try {
      setLoading(true);
      const filteredDestinations = category
        ? sampleDestinations.filter((dest) => dest.category === category)
        : sampleDestinations;
      setDestinations(filteredDestinations);
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations(filter);
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
        Explore Destinations
      </h1>
      <div className="flex justify-center mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 border rounded-lg shadow-md w-full max-w-xs bg-white focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          <option value="nature-and-wildlife">Nature and Wildlife</option>
        <option value="adventure-and-nightlife">Adventure and Nightlife</option>
        <option value="family-and-romantic-getaways">Family and Romantic Getaways</option>
        <option value="beaches-and-islands">Beaches and Islands</option>
        <option value="cultural-and-historical-sites">Cultural and Historical Sites</option>
        <option value="luxury-and-wellness">Luxury and Wellness</option>
        <option value="budget-and-shopping-destinations">Budget and Shopping Destinations</option>

        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="relative group overflow-hidden border rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/destination/${destination.id}`)}
            >
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-50 text-white">
                <h2 className="text-lg font-bold truncate">{destination.name}</h2>
                <p className="text-sm truncate">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreDestinations;
