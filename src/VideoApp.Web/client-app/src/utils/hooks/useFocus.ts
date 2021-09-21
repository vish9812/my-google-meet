import React, { useCallback, useMemo, useRef } from "react";

const useFocus = (): [
  React.MutableRefObject<HTMLInputElement | null>,
  VoidFunction
] => {
  const htmlElRef = useRef<HTMLInputElement>(null);

  const setFocus = useCallback(() => {
    if (htmlElRef.current) htmlElRef.current.focus();
  }, [htmlElRef]);

  return useMemo(() => [htmlElRef, setFocus], [htmlElRef, setFocus]);
};

export default useFocus;
