/**
   * Function to paginate
   * @param { integer } limit
   * @param { integer } page
   * @param { integer } count
   * @returns { object }
   ** otherwise it throws an error
   */
const getPaginationMeta = (limit, page, count) => {
  const pageCount = Math.ceil(count / limit);
  return {
    page,
    pageCount,
    totalItems: count
  };
};

export default getPaginationMeta;
