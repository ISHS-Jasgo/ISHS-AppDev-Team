import styles from './Login.module.css';

export default function Login() {
  return (
    <div>
      <form action="/action_page.php">
        <div className={styles.box}>
          <div className={styles.container}>
            <input
              type="text"
              placeholder="아이디"
              name="id"
              id="id"
              required
            />

            <input
              type="password"
              placeholder="비밀번호"
              name="psw"
              id="psw"
              required
            />

            <button type="submit" className={styles.loginbtn}>
              로그인
            </button>
          </div>

          <button style={{ width: 'auto' }} className={styles.btnA}>
            학생 회원가입
          </button>
          <button style={{ width: 'auto' }} className={styles.btnB}>
            교직원 회원가입
          </button>
          <button type="button" className={styles.btnC}>
            외부인 회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
