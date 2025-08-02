import { ICommentCardData } from "@/data/comment-card-seeds";
import Image from "next/image";
import React from "react";
interface CommentCardProps {
  commentCardData: ICommentCardData;
}
function CommentCard({ commentCardData }: CommentCardProps) {
  return (
    <div className="single-comments-wrap">
      <div className="single-comments-inner">
        <div className="comments-autor-thumb">
          <Image
            src={commentCardData.src}
            alt={commentCardData.alt}
            width={120}
            height={120}
           
          />
        </div>
        <div className="comments-content">
          <h6>{commentCardData.name}</h6>
          <p className="comments-date">{commentCardData.time}</p>
          <p>{commentCardData.desc}</p>
        </div>
      </div>
      <a href={commentCardData.btnHref} className="reply-btn">
        {commentCardData.btnText}
      </a>
    </div>
  );
}

export default CommentCard;
