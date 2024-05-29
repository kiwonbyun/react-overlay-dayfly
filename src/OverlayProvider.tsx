import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { rootElementId } from './constants';

interface DimStyle {
  backgroundColor?: string;
  zIndex?: number;
}

interface IOverlayProvider {
  children: ReactNode;
  dimStyle?: DimStyle | null;
}

export const OverlayContext = createContext<{
  mount(id: string, element: ReactNode): void;
  unmount(id: string): void;
} | null>(null);

export const StyleContext = createContext<DimStyle | null>(null);

export const OverlayProvider = ({
  children,
  dimStyle = null,
}: IOverlayProvider) => {
  const [overlays, setOverlays] = useState<Map<string, ReactNode>>(new Map());
  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlays((prevOverlays) => {
      const clone = new Map(prevOverlays);
      clone.set(id, element);
      return clone;
    });
  }, []);
  const unmount = useCallback((id: string) => {
    setOverlays((prevOverlays) => {
      const clone = new Map(prevOverlays);
      clone.delete(id);
      return clone;
    });
  }, []);

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  const clearOverlays = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    setOverlays(new Map());
  };

  const modalRoot = document.getElementById(rootElementId);
  if (!modalRoot) {
    throw new Error(
      `id:'${rootElementId}' element is required. Please ensure it exists in the DOM.`
    );
  }

  useEffect(() => {
    document.addEventListener('keydown', clearOverlays);
    return () => document.removeEventListener('keydown', clearOverlays);
  }, []);

  return (
    <StyleContext.Provider value={dimStyle}>
      <OverlayContext.Provider value={context}>
        {children}
        {[...overlays.entries()].map(([id, element]) => {
          return <Fragment key={id}>{element}</Fragment>;
        })}
        ;
      </OverlayContext.Provider>
    </StyleContext.Provider>
  );
};
