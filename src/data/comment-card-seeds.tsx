export interface ICommentCardData {
  src: string;
  alt: string;
  name: string;
  time: string;
  btnText: string;
  btnHref: string;
  desc: string;
}

export const CommentCardData: ICommentCardData[] = [
  {
    src: "/img/blog/comment-1.png",
    alt: "img",
    name: "Patric Evra",
    time: "November 02, 2024 - 9:44 am",
    btnText: "Reply",
    btnHref: "#",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
  },
  {
    src: "/img/blog/comment-2.jpg",
    alt: "img",
    name: "Monica Benedict",
    time: "November 02, 2024 - 9:44 am",
    btnText: "Reply",
    btnHref: "#",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu occaecat cupidatat non proident, sunt in culpa qui officia deserunt",
  },
];
