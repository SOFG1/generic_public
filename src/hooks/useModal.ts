import { useCallback, useState } from 'react';

export const useModal = ({ defaultOpen = false } = {}) => {
  const [isOpened, setIsOpened] = useState(defaultOpen);
  const [data, setData] = useState<unknown>(null);
  const onClose = useCallback(() => {
    setIsOpened(false);
    setData(null);
  }, [isOpened]);

  const onOpen = useCallback((data?: unknown) => {
    setIsOpened(true);
    if (data !== undefined) setData(data);
  }, [isOpened]);

  const onToggle = useCallback(() => {
    setIsOpened((prevState) => !prevState);
  }, [isOpened]);

  return {
    isOpened,
    onOpen,
    onClose,
    onToggle,
    data,
  };
};
