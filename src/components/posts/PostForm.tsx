import { FiImage } from "react-icons/fi";
import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]); //성공적으로 생성한 태그들을 담고 있음

  const handleFileUpload = () => {};

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
      });
      setTags([]);
      setHashTag("");
      setContent("");
      toast.success("게시글을 생성했습니다.");
    } catch (e: any) {
      console.log(e);
    }
  };
  
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: {name, value},
    } = e;

    //console.log(name, value);

    if (name === "content" ) {
      setContent(value);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };

  const handleKeyUp = (e: any) => {
    // 스페이스바를 눌렀고, vlaue가 빈 값이 아니라면 태그를 생성해준다
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      //만약 같은 태그가 있다면 에러를 띄운다.
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag(""); //초기화
      }
    }
  };

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

      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, index) => (
            <span 
              className="post-form__hashtags-tag" 
              key={index}
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>
        
        <input 
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp} //스페이스바 눌렀을 때 입력되도록
          value={hashTag}
          />

      </div>

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
          value="Tweet" 
          className="post-form__submit-btn"
        />
      </div>
    </form>
  );
}