

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
      notes: 'Don’t miss the Arashiyama Bamboo Grove and Fushimi Inari Shrine.',
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
      notes: 'Don’t miss the floating markets and street food.',
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
      notes: 'Don’t miss the Galleria Vittorio Emanuele II and Duomo di Milano.',
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!destination) {
    return <div className="text-center">Destination not found</div>;
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/destinations')}
        className="mb-6 text-blue-500 underline"
      >
        Back to Explore Destinations
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-blue-600 mb-4">{name}</h1>
          <p className="text-lg text-gray-600 mb-4">{description}</p>
          <h3 className="text-xl font-semibold text-blue-500">Category: {category}</h3>
          <h4 className="text-lg font-medium mt-4">Opening Hours: {openingHours || 'N/A'}</h4>
          <h4 className="text-lg font-medium mt-2">Entry Fee: {entryFee ? `$${entryFee}` : 'Free'}</h4>
          <h4 className="text-lg font-medium mt-2">Contact Info: {contactInfo || 'N/A'}</h4>
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Notes:</h4>
            <p>{notes || 'No additional notes available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
