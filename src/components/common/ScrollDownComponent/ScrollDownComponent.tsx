import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components'
import { ChevronIcon } from "../../../UI/Svg";
import { activityList } from "../../../config/userActivityList";


const StyledBox = styled.div`
    position: fixed;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 10px;
    bottom: 2.08vw;
    inset-inline-end: 2.08vw;
    @media screen and (max-width: 720px) {
      bottom: 26px;
      inset-inline-end: 26px;
    }
`

const StyledBtn = styled.button`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 2px solid #000;
    background-color: #fff;
    box-shadow: 3px 3px 10px #606060;
    cursor: pointer;
    svg {
        width: 70%;
        height:70%;
    }
`

const TopBtn = styled(StyledBtn)`
  svg {
    transform: rotate(180deg);
  }
`



interface IProps {
  className?: string
}

const ScrollDownComponent = React.memo(({ className }: IProps) => {
  const [currentBtn, setCurrentBtn] = useState<"top" | "bottom">("bottom");

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    const treshhold = document.body.scrollHeight - window.innerHeight - 200
    if (scrolled < treshhold) {
      setCurrentBtn("bottom");
    } else {
      setCurrentBtn("top");
    }
  }, []);

  const handleScroll = useCallback((top: boolean) => {
    window.scrollTo({
      top: top ? 0 : document.body.scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  }, [])



  useEffect(() => {
    window?.addEventListener("scroll", toggleVisible);
    return () => {
      window?.removeEventListener("scroll", toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <StyledBox>
      <TopBtn
        onClick={() => handleScroll(true)}
        style={{ display: currentBtn === "top" ? "inline" : "none" }}
        className={className}
        data-action={activityList["app-scroll-down"]}
      >
        <ChevronIcon />
      </TopBtn>
      <StyledBtn
        onClick={() => handleScroll(false)}
        style={{ display: currentBtn === "bottom" ? "inline" : "none" }}
        className={className}
        data-action={activityList["app-scroll-down"]}
      >
        <ChevronIcon />
      </StyledBtn>
    </StyledBox>
  );
});

export default ScrollDownComponent;
