const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          // className="btn"
          className={`btn currentPage === i + 1 ? "active" : ""`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

// function Pagination() {
//   return (
//     <>
//       {/* <h2 className="text-left text-2xl">Pagination</h2> */}
//       <div className="join my-4">
//         <button className="join-item btn btn-active">1</button>
//         <button className="join-item btn">2</button>
//         <button className="join-item btn">3</button>
//         <button className="join-item btn">4</button>
//       </div>
//     </>
//   );
// }

export default Pagination;
