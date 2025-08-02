import React from "react";

function CommentForm({}) {
  return (
    <div className="comments-form">
      <form action="#">
        <div className="row">
          <div className="col-md-6 col-12">
            <input type="text" placeholder="Name" />
          </div>
          <div className="col-md-6 col-12">
            <input type="email" placeholder="Email" />
          </div>
          <div className="col-12">
            <input type="tel" placeholder="Phone" />
          </div>
          <div className="col-12">
            <textarea
              name="message"
              id="message"
              cols={30}
              rows={10}
              placeholder="Write a Comment"
            ></textarea>
          </div>
          <div className="col-12">
            <input type="submit" value="Post Comment" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
