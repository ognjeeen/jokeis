'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchJoke } from '@/utils/request';

const JokeEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    category: 'IT',
    description: '',
    author: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Fetch joke data for form
    const fetchJokeData = async () => {
      try {
        const jokeData = await fetchJoke(id);
        setFields(jokeData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJokeData();
  }, []);

  // Name is connected to the id of input field and value is self explanatory
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/jokes/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.status === 200) {
        router.push(`/jokes/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    mounted &&
    !loading && (
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl text-center font-semibold mb-6">Edit Joke</h2>

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
              className="border rounded w-full py-2 px-3 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              required
              disabled
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
            <span className="text-gray-300 text-sm">
              *You can only edit description of your joke!
            </span>
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
              className="border rounded w-full py-2 px-3 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              placeholder="Enter your name (Joke will be posted under this name)"
              value={fields.author}
              onChange={handleChange}
              disabled
            />
          </div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit joke
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default JokeEditForm;
