'use client';
import { useEffect, useState } from 'react';

const JokeAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    category: 'IT',
    description: '',
    author: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Name is connected to the id of input field and value is self explanatory
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    mounted && (
      <>
        <div>
          <form action="/api/jokes" method="POST">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add New Joke
            </h2>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 font-bold mb-2"
              >
                Joke Category/Type
              </label>
              <select
                value={fields.category}
                onChange={handleChange}
                id="category"
                name="category"
                className="border rounded w-full py-2 px-3"
                required
              >
                <option value="IT">IT/Programming</option>
                <option value="School">School/Education</option>
                <option value="Family">Family</option>
                <option value="Work">Work/Office</option>
                <option value="Life">Life Situations</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                required
                value={fields.description}
                onChange={handleChange}
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Place for your super cool funny joke"
              ></textarea>
            </div>

            <div className="mb-12">
              <label
                htmlFor="author"
                className="block text-gray-700 font-bold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your name (Joke will be posted under this name)"
                value={fields.author}
                onChange={handleChange}
              />
              <span className="text-gray-300 text-sm">
                *If you leave this field empty, the joke will be posted
                anonymously
              </span>
            </div>

            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default JokeAddForm;
