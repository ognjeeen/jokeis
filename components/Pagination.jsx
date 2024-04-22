const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  // Using Math.ceil to round a number of total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  // Creating a handlePageChange function for pagination functionality, if statement if is true, we will pass newPage to the onPageChange function in Properties.jsx
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === 1}
        // Adding onClick function on button for previous page and passing a prop (page - 1) which will be prop named newPage in handlePageChange function
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === totalPages}
        // Adding onClick function on button for next page and passing a prop (page + 1) which will be prop named newPage in handlePageChange function
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
