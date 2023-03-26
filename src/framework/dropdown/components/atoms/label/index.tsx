import React from 'react';

export interface LabelProps {
    label: string;
    className?: string;
}

export const Label = ({ label, className }: LabelProps) => (
    <div className={`dropdown-group-label ${className ?? ''}`}>{label}</div>
);
