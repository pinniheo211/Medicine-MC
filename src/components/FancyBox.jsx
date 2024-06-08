import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

function Fancybox({ children, delegates, option }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = delegates || '[data-fancybox]';
    const options = option || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef}>{children}</div>;
}

export default Fancybox;
