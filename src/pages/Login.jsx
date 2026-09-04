import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { safeReturnTo } from "@/lib/authReturnTo";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";


export default function Login() {
  const { login } = useAuth();

  const {
    language,
    setLanguage,
    isRTL,
  } = useLanguage();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const returnTo = safeReturnTo();

  const BackIcon =
    isRTL ? ArrowRight : ArrowLeft;


  const copy =
    language === "fa"
      ? {
          school:
            "مجتمع آموزشی معصومه عظیمیان",

          tagline:
            "آموزش . رشد . آینده",

          title:
            "ورود به حساب کاربری",

          subtitle:
            "برای ادامه، اطلاعات حساب خود را وارد کنید.",

          email:
            "ایمیل",

          emailPlaceholder:
            "example@email.com",

          password:
            "رمز عبور",

          passwordPlaceholder:
            "رمز عبور خود را وارد کنید",

          forgot:
            "رمز عبور را فراموش کرده‌اید؟",

          submit:
            "ورود",

          submitting:
            "در حال ورود...",

          noAccount:
            "حساب کاربری ندارید؟",

          createAccount:
            "ایجاد حساب",

          home:
            "صفحه اصلی",

          error:
            "ایمیل یا رمز عبور صحیح نیست.",

          showPassword:
            "نمایش رمز عبور",

          hidePassword:
            "پنهان کردن رمز عبور",
        }
      : {
          school:
            "Masoumeh Azimian Educational Complex",

          tagline:
            "Education · Growth · Future",

          title:
            "Welcome back",

          subtitle:
            "Enter your account details to continue.",

          email:
            "Email",

          emailPlaceholder:
            "example@email.com",

          password:
            "Password",

          passwordPlaceholder:
            "Enter your password",

          forgot:
            "Forgot password?",

          submit:
            "Sign in",

          submitting:
            "Signing in...",

          noAccount:
            "Don't have an account?",

          createAccount:
            "Create account",

          home:
            "Home",

          error:
            "The email or password is incorrect.",

          showPassword:
            "Show password",

          hidePassword:
            "Hide password",
        };


  const registerUrl =
    "/register" +
    (
      returnTo !== "/"
        ? "?returnTo=" +
          encodeURIComponent(returnTo)
        : ""
    );


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(
        email,
        password
      );

      window.location.href =
        returnTo === "/"
          ? "/dashboard"
          : returnTo;
    } catch {
      setError(copy.error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="
        min-h-screen
        bg-[#FBF6EE]
        px-4
        py-6
        text-[#222222]
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-3rem)]
          w-full
          max-w-6xl
          flex-col
        "
      >
        {/* Top navigation */}
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#001858]/55
              transition-colors
              hover:text-[#001858]
            "
          >
            <BackIcon
              className="h-4 w-4"
            />

            {copy.home}
          </Link>


          <div
            className="
              flex
              items-center
              rounded-xl
              bg-[#F3EDE4]
              p-1
            "
          >
            <button
              type="button"
              onClick={() =>
                setLanguage("fa")
              }
              className={`
                rounded-lg
                px-3
                py-1.5
                text-[11px]
                font-bold
                transition-all
                ${
                  language === "fa"
                    ? "bg-[#001858] text-white"
                    : "text-[#001858]/50"
                }
              `}
            >
              فارسی
            </button>

            <button
              type="button"
              onClick={() =>
                setLanguage("en")
              }
              className={`
                rounded-lg
                px-3
                py-1.5
                text-[11px]
                font-bold
                transition-all
                ${
                  language === "en"
                    ? "bg-[#001858] text-white"
                    : "text-[#001858]/50"
                }
              `}
            >
              English
            </button>
          </div>
        </div>


        {/* Login */}
        <div
          className="
            flex
            flex-1
            items-center
            justify-center
            py-10
          "
        >
          <div
            className="
              w-full
              max-w-[440px]
            "
          >
            {/* Identity */}
            <div
              className="
                mb-8
                text-center
              "
            >
              <Link
                to="/"
                className="
                  mx-auto
                  mb-5
                  flex
                  h-[76px]
                  w-[76px]
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#FFF9F1]
                  p-2
                  shadow-[8px_10px_22px_rgba(80,65,45,0.09),-7px_-7px_18px_rgba(255,255,255,0.95)]
                "
              >
                <img
                  src="/media/site/3cc1bf827_BlackandWhiteElegantInitialsLogo1.png"
                  alt={copy.school}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />
              </Link>

              <div
                className="
                  text-xs
                  font-semibold
                  text-[#001858]/55
                "
              >
                {copy.school}
              </div>

              <div
                className="
                  mt-1
                  text-[10px]
                  text-[#001858]/35
                "
              >
                {copy.tagline}
              </div>
            </div>


            {/* Card */}
            <div
              className="
                rounded-[1.75rem]
                bg-[#FFF9F1]
                p-6
                shadow-[12px_15px_35px_rgba(80,65,45,0.10),-10px_-10px_28px_rgba(255,255,255,0.95)]
                sm:p-8
              "
            >
              <div
                className="
                  mb-7
                "
              >
                <div
                  className="
                    mb-3
                    h-[3px]
                    w-8
                    rounded-full
                    bg-[#F5A623]
                  "
                />

                <h1
                  className="
                    text-2xl
                    font-bold
                    text-[#001858]
                  "
                >
                  {copy.title}
                </h1>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-7
                    text-[#66616A]
                  "
                >
                  {copy.subtitle}
                </p>
              </div>


              {error && (
                <div
                  role="alert"
                  className="
                    mb-5
                    rounded-xl
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                  "
                >
                  {error}
                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-xs
                      font-bold
                      text-[#001858]/70
                    "
                  >
                    {copy.email}
                  </label>

                  <div className="relative">
                    <Mail
                      className="
                        absolute
                        start-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-[#001858]/35
                      "
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      placeholder={
                        copy.emailPlaceholder
                      }
                      required
                      className="
                        h-[50px]
                        w-full
                        rounded-xl
                        border
                        border-[#001858]/5
                        bg-[#F6EFE6]
                        ps-11
                        pe-4
                        text-sm
                        outline-none
                        shadow-[inset_4px_4px_9px_rgba(80,65,45,0.07),inset_-4px_-4px_9px_rgba(255,255,255,0.9)]
                        transition-all
                        placeholder:text-[#777]/35
                        focus:border-[#002699]/20
                      "
                    />
                  </div>
                </div>


                {/* Password */}
                <div>
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <label
                      htmlFor="password"
                      className="
                        text-xs
                        font-bold
                        text-[#001858]/70
                      "
                    >
                      {copy.password}
                    </label>

                    <Link
                      to="/forgot-password"
                      className="
                        text-[11px]
                        font-semibold
                        text-[#002699]
                        hover:text-[#001858]
                      "
                    >
                      {copy.forgot}
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      className="
                        absolute
                        start-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-[#001858]/35
                      "
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      placeholder={
                        copy.passwordPlaceholder
                      }
                      required
                      className="
                        h-[50px]
                        w-full
                        rounded-xl
                        border
                        border-[#001858]/5
                        bg-[#F6EFE6]
                        ps-11
                        pe-11
                        text-sm
                        outline-none
                        shadow-[inset_4px_4px_9px_rgba(80,65,45,0.07),inset_-4px_-4px_9px_rgba(255,255,255,0.9)]
                        transition-all
                        placeholder:text-[#777]/35
                        focus:border-[#002699]/20
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      aria-label={
                        showPassword
                          ? copy.hidePassword
                          : copy.showPassword
                      }
                      className="
                        absolute
                        end-3
                        top-1/2
                        flex
                        h-8
                        w-8
                        -translate-y-1/2
                        items-center
                        justify-center
                        text-[#001858]/35
                        hover:text-[#001858]
                      "
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex
                    h-[50px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#001858]
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_10px_22px_rgba(0,24,88,0.18)]
                    transition-colors
                    hover:bg-[#002699]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="
                          h-4
                          w-4
                          animate-spin
                        "
                      />

                      {copy.submitting}
                    </>
                  ) : (
                    copy.submit
                  )}
                </button>
              </form>


              <div
                className="
                  mt-7
                  text-center
                  text-xs
                  text-[#66616A]
                "
              >
                {copy.noAccount}{" "}

                <Link
                  to={registerUrl}
                  className="
                    font-bold
                    text-[#002699]
                    hover:text-[#001858]
                  "
                >
                  {copy.createAccount}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
