import React from "react";

const EditCategoryFooter = ({ AddNewArticle, handleSubmit }) => {
  return (
    <div className="editCategory_right_footer">
      <button className="btn btn-primary" type="submit" onClick={AddNewArticle}>
        Add
      </button>
      <button
        className="btn btn-secondary"
        type="submit"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};
export default EditCategoryFooter;
