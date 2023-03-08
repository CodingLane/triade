import React from 'react';

import '../Text.css';

export const LightText = ({
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`light ${props.className}`}
    />
  );
};
