import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "firebaseApp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault(); //일단 해당 폼이 제출되지 않도록 막기

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); //메인페이지 이동
      toast.success("성공적으로 로그인이 되었습니다.");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {name, value},
    } = e;
    //console.log(name, value);

    if (name === "email") {
      setEmail(value);
      const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력해주세요");
      } else {
        setError("");
      }
    }
  };

  const onClickSocialLogin = async (e: any) => {
    const {
      target: {name},
    } = e;

    //console.log(name); //google을 눌렀는지 or github 버튼을 눌렀는지 확인
    let provider;
    const auth = getAuth(app);

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth, 
      provider as GithubAuthProvider | GoogleAuthProvider
    ).then((result) => {
      //console.log(result);
      toast.success("로그인 되었습니다.");
    }).catch((error) => {
      //console.log(error);
      const errorMessage = error?.message;
      toast?.error(errorMessage);
    });
    
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form__title">로그인</div>

      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input 
          type="text" 
          name="email" 
          id="email" 
          value={email} 
          required
          onChange={onChange} />
      </div>

      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          value={password} 
          onChange={onChange} 
          required />
      </div>

      {/* 만약 에러가 있다면 */}
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      

      <div className="form__block">
        계정이 없으신가요?
        <Link to="/users/signup" className="form__link">회원가입하기</Link>
      </div>

      <div className="form__block--lg">
        <button type="submit" className="form__btn--submit" disabled={error?.length > 0}>
          로그인
        </button>
      </div>

      <div className="form__block">
        <button 
          type="button" 
          name="google"
          className="form__btn--google" 
          onClick={onClickSocialLogin}
        >
          Google로 로그인
        </button>
      </div>

      <div className="form__block">
        <button 
          type="button" 
          name="github"
          className="form__btn--github" 
          onClick={onClickSocialLogin}
        >
          Github로 로그인
        </button>
      </div>
    </form>
  );
}