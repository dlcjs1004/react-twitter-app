import { FiImage } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "pages/home";

export default function PostEditForm() {
  const params = useParams(); //post id 값 가져오기
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const handleFileUpload = () => {};

  // useEffect로 페이지 로드가 되었을 때 호출할 수 있도록 작업
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db,"posts", params.id);
      const docSnap = await getDoc(docRef);
      //console.log(docSnap.data(), docSnap.id);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
        });
        navigate(`/posts/${post?.id}`);
        toast.success("게시글을 수정했습니다.");
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: {name, value},
    } = e;

    if (name === "content" ) {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea 
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        onChange={onChange}
        value={content}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input 
          type="file" 
          name="file-input" 
          id="file-input" 
          accept="image/*"
          onChange={handleFileUpload} 
          className="hidden"
        />
        <input 
          type="submit" 
          value="수정" 
          className="post-form__submit-btn"
        />
      </div>
    </form>
  );
}