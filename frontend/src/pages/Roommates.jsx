import React, { useEffect, useState } from "react";

// All available sports and interests
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
  const selectedSports = getRandomSubset(allSports, 2, 5);
  const sportsPreferences = {};
  selectedSports.forEach((sport) => {
    sportsPreferences[sport] = getRandomBinaryPreference();
  });
  return sportsPreferences;
};

// Generates a random set of interests with binary preferences
const generateRandomInterests = () => {
  const selectedInterests = getRandomSubset(allInterests, 3, 6);
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

  const sports = generateRandomSports();
  const interests = generateRandomInterests();

  return {
    id: id,
    name: randomName,
    age: randomAge,
    sports: sports,
    interests: interests,
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
const Roommates = () => {
  const [roommates, setRoommates] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSports, setSelectedSports] = useState({});
  const [selectedInterests, setSelectedInterests] = useState({});
  const [connectedRoommates, setConnectedRoommates] = useState(new Set());

  useEffect(() => {
    const dummyData = generateDummyRoommates(10);
    setRoommates(dummyData);

    const initialSports = {};
    allSports.forEach((sport) => (initialSports[sport] = false));
    setSelectedSports(initialSports);

    const initialInterests = {};
    allInterests.forEach((interest) => (initialInterests[interest] = false));
    setSelectedInterests(initialInterests);
  }, []);

  const handleConnect = (roommateId) => {
    if (connectedRoommates.has(roommateId)) {
      alert("You have already connected with this roommate.");
      return;
    }
    setConnectedRoommates((prev) => new Set(prev).add(roommateId));
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
    const matchesSearch = roommate.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const activeSportsFilters = Object.keys(selectedSports).filter(
      (sport) => selectedSports[sport]
    );
    const matchesSports =
      activeSportsFilters.length === 0 ||
      activeSportsFilters.every(
        (filterSport) => roommate.sports[filterSport] === 1
      );

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
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Find Your Ideal Roommate
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover people who share your lifestyle and interests.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Filters */}
          <aside className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Filters</h2>

            <div className="mb-6">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search by Name
              </label>
              <input
                id="search"
                type="text"
                placeholder="e.g. Alice"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Sports
              </h3>
              <div className="space-y-2">
                {allSports.map((sport) => (
                  <label
                    key={sport}
                    className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-150"
                  >
                    <input
                      type="checkbox"
                      name={sport}
                      checked={selectedSports[sport]}
                      onChange={handleSportChange}
                      className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                    />
                    <span className="ml-2 text-gray-800">{sport}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Interests
              </h3>
              <div className="space-y-2">
                {allInterests.map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-150"
                  >
                    <input
                      type="checkbox"
                      name={interest}
                      checked={selectedInterests[interest]}
                      onChange={handleInterestChange}
                      className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                    />
                    <span className="ml-2 text-gray-800">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Roommate List */}
          <main className="md:col-span-2">
            {filteredRoommates.length > 0 ? (
              <ul className="space-y-6">
                {filteredRoommates.map((roommate) => {
                  const isConnected = connectedRoommates.has(roommate.id);
                  return (
                    <li
                      key={roommate.id}
                      className={`relative bg-white p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform ${
                        isConnected
                          ? "ring-2 ring-green-500 scale-100"
                          : "hover:scale-[1.01] hover:shadow-xl"
                      }`}
                    >
                      {isConnected && (
                        <div className="absolute top-3 right-3 text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded-full">
                          Connected
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {roommate.name}
                          </h2>
                          <p className="text-md text-gray-600 mt-1">
                            Age: {roommate.age}
                          </p>
                        </div>
                        <button
                          onClick={() => handleConnect(roommate.id)}
                          disabled={isConnected}
                          className={`mt-4 sm:mt-0 py-2 px-5 rounded-lg font-semibold shadow-md transition-all duration-200
                          ${
                            isConnected
                              ? "bg-green-600 text-white cursor-not-allowed"
                              : "bg-indigo-600 text-white hover:bg-indigo-700"
                          }`}
                        >
                          {isConnected ? "Connected" : "Connect"}
                        </button>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">
                            Sports You'd Share:
                          </p>
                          <div className="flex flex-wrap gap-2 text-sm">
                            {Object.entries(roommate.sports).map(
                              ([sport, pref]) => (
                                <span
                                  key={sport}
                                  className={`px-3 py-1 rounded-full font-medium ${
                                    pref === 1
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {sport} {pref === 1 ? "👍" : "👌"}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800 mb-2">
                            Interests in Common:
                          </p>
                          <div className="flex flex-wrap gap-2 text-sm">
                            {Object.entries(roommate.interests).map(
                              ([interest, pref]) => (
                                <span
                                  key={interest}
                                  className={`px-3 py-1 rounded-full font-medium ${
                                    pref === 1
                                      ? "bg-pink-100 text-pink-800"
                                      : "bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {interest} {pref === 1 ? "✨" : "✔️"}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-center text-gray-500 text-lg mt-20">
                No roommates found matching your criteria. Try adjusting your
                filters!
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Roommates;
