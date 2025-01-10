import { PostProps } from "pages/home";
import { FaHeart, FaRegComment, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const handleDelete = () => {};

  return (
    <div className="post__box" key={post?.id}>
      <Link to = {`/posts/${post?.id}`} >
        <div className="post__box-profile">
          <div className="post__flex">
            {post?.profileUrl ? (
              <img 
                src={post?.profileUrl}
                alt="profile"
                className="post__box-profile-img"  
              />
            ) : (
              <FaUserCircle className={"post__box-profile-icon"} />
            )}
            <div className="post__email">{post?.email}</div>
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>
          <div className="post__box-content">{post?.content}</div>
        </div>
      </Link>
      <div className="post__box-footer">
        {/* post.uid === user.uid일 때 (아직 사용자 인증 로직 없기 때문) */}
        <>
          <button
            type="button"
            className="post__delete"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="post__edit"
          >
            <Link to={`/post/edit/${post?.id}`}>Edit</Link>
          </button>
        </>
        <button type="button" className="post__likes">
          <FaHeart />
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
}