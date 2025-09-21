import React, { useEffect, useState } from "react";

function Roommates() {
  const [roommates, setRoommates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch roommates from backend
    const fetchRoommates = async () => {
      try {
        const res = await fetch("http://localhost:8085/api/roommates");
        const data = await res.json();
        setRoommates(data);
      } catch (err) {
        console.error("Error fetching roommates:", err);
      }
    };
    fetchRoommates();
  }, []);

  const handleConnect = async (roommateId) => {
    try {
      const res = await fetch(`http://localhost:8085/api/roommates/${roommateId}/connect`, {
        method: "POST",
      });
      if (res.ok) {
        alert("Connection request sent!");
      } else {
        alert("Error sending request.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send request.");
    }
  };

  const filteredRoommates = roommates.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find Roommates</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search roommates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Roommate list */}
      {filteredRoommates.length > 0 ? (
        <ul className="space-y-3">
          {filteredRoommates.map((roommate) => (
            <li
              key={roommate.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{roommate.name}</h2>
                <p className="text-sm text-gray-600">
                  Age: {roommate.age} · Budget: ${roommate.budget}/month
                </p>
                <p className="text-sm">{roommate.preferences}</p>
              </div>
              <button
                onClick={() => handleConnect(roommate.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Connect
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No roommates found.</p>
      )}
    </div>
  );
}

export default Roommates;