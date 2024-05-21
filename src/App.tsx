import {useEffect, useMemo, useState} from "react";
import {Route, Routes, useLocation, useNavigate,} from "react-router-dom";
import "./App.scss";
import {
  CallCenter, CallCenterHistory,
  Election,
  HOCPage, PrivacyPolicyWebAppPage,
  RawData,
  Sentimentor,
  Settings,
  SignIn,
  SignUp,
  Stats,
  User,
  Volunteers
} from "./pages"
import "./assets/scss/style.scss";
import {Menu} from "./components/common/Menu";
import {useUserState} from "./store/user";
import {useUserActions} from "./store/user/hooks";
import {ToolbarComponent} from "./components/common/ToolbarComponent";
import {useAppActions} from "./store/app";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {opponentsSetGTrends} from "./store/opponents";
import {useMenu} from "./config/menu";
import {ScrollDownComponent} from "./components/common/ScrollDownComponent";
import {UserActivityWatcher} from "./components/common/UserActivityWatcher";
import AlertComponent from "./components/common/AlertComponent/AlertComponent";
import Opponents from "./pages/Opponents";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import {signUpUrl} from "./config/signUpUrl";


function App() {
  const { t } = useTranslation();
  const { isLogin, errorMessage, token } = useUserState();
  const { onClearError, getUserInfoAction } = useUserActions();
  const { onShowAlert } = useAppActions();
  const [isRedirect, setIsRedirect] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUserState();
  const menu = useMenu();

  //This is temporary code that prevents localstorage bug
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(opponentsSetGTrends({}));
  }, []);

  //////
  // const userMustSign = useMemo(() => {
  //   if (userInfo?.group?.id === 410) {
  //     return false
  //   }
  //   return !userInfo?.signature && userInfo?.group?.country?.id === 328;
  // }, [userInfo]);

  useEffect(() => {
    const condition = isLogin
      ? false
      : !(pathname === "/sign-in" || pathname === signUpUrl);
    if (pathname !== "/privacy-policy" && pathname !== "/privacy-policy-webapp") {
      setIsRedirect(condition);
    }
  }, [isLogin, pathname]);

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        onClearError();
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorMessage]);

  useEffect(() => {
    if (token) {
      getUserInfoAction(token);
    }
  }, [token]);

  // Listen for 504error in api requests and show alert
  useEffect(() => {
    document.addEventListener("504error", () => {
      onShowAlert(false, t("504 error"));
    });
  }, []);

  //Navigate to the first accessible page (prevent empty page showing)
  useEffect(() => {
    for (let i = 0; i < menu.length; i++) {
      const page = menu[i].key;
      if (userInfo?.permissions[page].access && pathname === "/") {
        navigate(menu[i].link);
        break;
      }
    }
  }, [userInfo?.permissions, pathname]);


  useEffect(() => {
    if (isRedirect) {
      navigate("/sign-in")
    }
  }, [isRedirect])

  useEffect(() => {
    if (
      userInfo?.role?.name === "caller" &&
      ["/distribution", "/sign-in"].filter((path) => path === pathname).length ===
      0
    ) {
      navigate("/distribution")
    }
  }, [userInfo?.role?.name])


  return (
    <div className="App">
      <UserActivityWatcher />
      {isLogin && pathname !== signUpUrl && <Menu />}
      {/* {isLogin && pathname !== signUpUrl && (
        <Modal
          show={userMustSign}
          onClose={() => console.log("user can not close this modal")}
          isHiddenClose={true}
        >
          <AskSignatureView />
        </Modal>
      )} */}
      <div className="Content">
        <ToolbarComponent />
        <Routes>
          <Route
            path="/"
            element={
              <HOCPage>
                <Stats />
              </HOCPage>
            }
          />
          <Route
            path="/raw-data"
            element={
              <HOCPage>
                <RawData />
              </HOCPage>
            }
          />
          <Route
            path="/monitoring"
            element={
              <HOCPage>
                <Sentimentor />
              </HOCPage>
            }
          />
          <Route
            path="/distribution"
            element={
              <HOCPage>
                <CallCenter />
              </HOCPage>
            }
          />
          <Route
            path="/distribution-history"
            element={
              <HOCPage>
                <CallCenterHistory />
              </HOCPage>
            }
          />
          <Route
            path="/election"
            element={
              <HOCPage>
                <Election />
              </HOCPage>
            }
          />
          <Route
            path="/volunteers"
            element={
              <HOCPage>
                <Volunteers />
              </HOCPage>
            }
          />
          <Route
            path="/opponents"
            element={
              <HOCPage>
                <Opponents />
              </HOCPage>
            }
          />
          <Route
            path="/user"
            element={
              <HOCPage>
                <User />
              </HOCPage>
            }
          />
          <Route
            path="/settings"
            element={
              <HOCPage>
                <Settings />
              </HOCPage>
            }
          />
          {/* <Route
            path="/relations"
            element={
              <HocPage>
                 <Relations />
              </HocPage>
            }
          /> */}

          <Route path="/sign-in" element={<SignIn />} />
          <Route path={signUpUrl} element={<SignUp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path = "/privacy-policy-webapp" element = {<PrivacyPolicyWebAppPage/>}/>
        </Routes>
      </div>
      {isLogin && pathname !== signUpUrl && <ScrollDownComponent />}
      <AlertComponent />
    </div>
  );
}

export default App;
