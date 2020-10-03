export const getFormFields = (event) => {
  event.preventDefault();
  return Array.prototype.slice
    .call(event.target)
    .filter((el) => el.name)
    .reduce(
      (form, el) => ({
        ...form,
        [el.name]: el.value
      }),
      {}
    );
};
