import { useCallback, useEffect,  } from "react";
import { HintType, useAppActions, useAppState } from "../store/app";

export const useHint = (prevHint: HintType, currentHint: HintType, cardRef?: any) => {
  const { hint } = useAppState();
  const { onSetHint } = useAppActions();

  //Reset hint when user click somewhere
  const handleDocumentClick = useCallback(
    (e: any) => {
      if (!e.target.closest("button")) {
        onSetHint(null);
      }
    },
    [hint]
  );

  useEffect(() => {
    if (hint === currentHint) {
      document.addEventListener("click", handleDocumentClick);
    }
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick, hint]);

  //Scroll page to this card if there is a hint for this card
  useEffect(() => {
    const cardYOffset = cardRef?.current?.getBoundingClientRect().top;
    if (cardYOffset && hint === currentHint) {
      window.scrollTo({
        top: cardYOffset - 50,
        behavior: "smooth",
      });
    }
  }, [hint, cardRef]);

  //Set hint to the current step
  useEffect(() => {
    if (hint === prevHint) {
      onSetHint(currentHint);
    }
  }, [hint]);
};
