import React, { Suspense, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { ERegistrationSteps } from "../types";
import { useUserState } from "../store/user";
import { Loader } from "../UI/Spinners";
import { useUserActions } from "../store/user/hooks";
import { desktopBp } from "../styles/variables";
import { withErrorBoundaryHOC } from "../utils/withErrorBoundaryHOC";
const StepOneView = React.lazy(
  () => import("../views/SighUpViews/StepOneView")
);
const StepTwoView = React.lazy(
  () => import("../views/SighUpViews/StepTwoView")
);
const StepThreeView = React.lazy(
  () => import("../views/SighUpViews/StepThreeView")
);

const SignUpStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 28.85vw;
  margin: 4.17vw auto 0;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 362px;
    margin: 52px auto 0;
  }
  @media screen and (max-width: 600px) {
    margin-top: 0px;
  }
`;

const SignUp = () => {
  const { step, userInfo } = useUserState();
  const { onSetRegistrationStep } = useUserActions();

  const isNotGroup = useMemo(() => {
    if (userInfo && userInfo?.group) {
      return true;
    }
    return false;
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      onSetRegistrationStep(ERegistrationSteps.StepTwo);
    }
  }, [userInfo]);

  if (isNotGroup) {
    console.log("group");
    return <Navigate to={"/"} />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <SignUpStyled>
        {step ? (
          step === ERegistrationSteps.StepOne ? (
            <StepOneView />
          ) : step === ERegistrationSteps.StepTwo ? (
            <StepTwoView />
          ) : (
            <StepThreeView />
          )
        ) : (
          <StepOneView />
        )}
      </SignUpStyled>
    </Suspense>
  );
}

export default withErrorBoundaryHOC(SignUp);
