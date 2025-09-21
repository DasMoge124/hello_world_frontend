import React, { useEffect, useState } from "react";

// --- Dummy Data Generation Functions ---

// All available sports and interests from the images
const allSports = [
  "Basketball",
  "Athletics",
  "Football / Soccer",
  "Weight Lifting",
  "Tennis",
  "Cycling",
  "Badminton",
  "Pickleball",
  "Table Tennis",
  "Boxing / Kickboxing",
  "Swimming",
  "Other Sports",
];

const allInterests = [
  "Arts and Crafts",
  "Reading",
  "Music",
  "Movies / TV Shows",
  "Cooking",
  "Gardening",
  "Gym / Fitness",
  "Skating / Skateboarding",
  "Gaming",
  "Partying",
];

// Helper to get a random subset of an array
const getRandomSubset = (arr, min = 0, max) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generates a random boolean for a preference (0 or 1)
const getRandomBinaryPreference = () => (Math.random() < 0.5 ? 0 : 1);

// Generates a random set of sports with binary preferences
const generateRandomSports = () => {
  const selectedSports = getRandomSubset(allSports, 2, 5); // 2 to 5 random sports
  const sportsPreferences = {};
  selectedSports.forEach((sport) => {
    sportsPreferences[sport] = getRandomBinaryPreference();
  });
  return sportsPreferences;
};

// Generates a random set of interests with binary preferences
const generateRandomInterests = () => {
  const selectedInterests = getRandomSubset(allInterests, 3, 6); // 3 to 6 random interests
  const interestPreferences = {};
  selectedInterests.forEach((interest) => {
    interestPreferences[interest] = getRandomBinaryPreference();
  });
  return interestPreferences;
};

// Generates a single dummy roommate
const generateDummyRoommate = (id) => {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Dianne",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
  ];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAge = Math.floor(Math.random() * (30 - 18 + 1)) + 18;
  const randomBudget = Math.floor(Math.random() * (1200 - 500 + 1)) + 500;

  const sports = generateRandomSports();
  const interests = generateRandomInterests();

  return {
    id: id,
    name: randomName,
    age: randomAge,
    budget: randomBudget,
    sports: sports, // structured for filtering
    interests: interests, // structured for filtering
  };
};

// Generates an array of dummy roommates
const generateDummyRoommates = (count) => {
  const roommates = [];
  for (let i = 1; i <= count; i++) {
    roommates.push(generateDummyRoommate(i));
  }
  return roommates;
};

// --- Roommates Component ---

function Roommates() {
  const [roommates, setRoommates] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSports, setSelectedSports] = useState({});
  const [selectedInterests, setSelectedInterests] = useState({});

  useEffect(() => {
    // Generate 10 dummy roommates on component mount
    const dummyData = generateDummyRoommates(10);
    setRoommates(dummyData);

    // Initialize selectedSports and selectedInterests to all unchecked
    const initialSports = {};
    allSports.forEach((sport) => (initialSports[sport] = false));
    setSelectedSports(initialSports);

    const initialInterests = {};
    allInterests.forEach((interest) => (initialInterests[interest] = false));
    setSelectedInterests(initialInterests);

    // Note: In a real application, you'd fetch from your backend here.
  }, []);

  const handleConnect = (roommateId) => {
    // Dummy connect action
    console.log(`Connect request sent for roommate ID: ${roommateId}`);
    alert("Connection request sent!");
  };

  const handleSportChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSports((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setSelectedInterests((prev) => ({ ...prev, [name]: checked }));
  };

  const filteredRoommates = roommates.filter((roommate) => {
    // 1. Filter by search term
    const matchesSearch = roommate.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // 2. Filter by selected sports
    const activeSportsFilters = Object.keys(selectedSports).filter(
      (sport) => selectedSports[sport]
    );
    const matchesSports =
      activeSportsFilters.length === 0 ||
      activeSportsFilters.every(
        (filterSport) => roommate.sports[filterSport] === 1
      );

    // 3. Filter by selected interests
    const activeInterestsFilters = Object.keys(selectedInterests).filter(
      (interest) => selectedInterests[interest]
    );
    const matchesInterests =
      activeInterestsFilters.length === 0 ||
      activeInterestsFilters.every(
        (filterInterest) => roommate.interests[filterInterest] === 1
      );

    return matchesSearch && matchesSports && matchesInterests;
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Find Your Ideal Roommate
      </h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sports Filter */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Filter by Sports
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {allSports.map((sport) => (
              <label
                key={sport}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={sport}
                  checked={selectedSports[sport]}
                  onChange={handleSportChange}
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                />
                <span>{sport}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Interests Filter */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Filter by Interests
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {allInterests.map((interest) => (
              <label
                key={interest}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={interest}
                  checked={selectedInterests[interest]}
                  onChange={handleInterestChange}
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Roommate list */}
      {filteredRoommates.length > 0 ? (
        <ul className="space-y-4">
          {filteredRoommates.map((roommate) => (
            <li
              key={roommate.id}
              className="p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-grow mb-3 sm:mb-0">
                <h2 className="font-bold text-xl text-gray-900">
                  {roommate.name}
                </h2>
                <p className="text-md text-gray-600">
                  Age: {roommate.age} · Budget: ${roommate.budget}/month
                </p>
                <div className="text-sm text-gray-700 mt-2">
                  <p className="font-medium">Sports:</p>
                  <ul className="list-disc list-inside ml-2">
                    {Object.entries(roommate.sports).map(([sport, pref]) => (
                      <li key={sport}>
                        {sport} ({pref === 1 ? "Prefers" : "Okay"})
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium mt-1">Interests:</p>
                  <ul className="list-disc list-inside ml-2">
                    {Object.entries(roommate.interests).map(
                      ([interest, pref]) => (
                        <li key={interest}>
                          {interest} ({pref === 1 ? "Prefers" : "Okay"})
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleConnect(roommate.id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 self-end sm:self-center"
              >
                Connect
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No roommates found matching your criteria. Try adjusting your filters!
        </p>
      )}
    </div>
  );
}

export default Roommates;
