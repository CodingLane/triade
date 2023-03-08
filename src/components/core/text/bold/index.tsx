import React from 'react';

import '../Text.css';

export const BoldText = ({
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`bold ${props.className}`}
    />
  );
};
