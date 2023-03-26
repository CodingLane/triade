import React from 'react';

import './BaseInput.css';

export interface BaseInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: boolean;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(({ error, ...props }, ref) => {
    const blurOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (props.onKeyUp) props.onKeyUp(event);
        if (event.key.toLowerCase() !== 'enter') return;
        event.currentTarget.blur();
    };

    const disgardCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (!error) {
            event.persist();
            return;
        }
        event.currentTarget.selectionStart = event.currentTarget.selectionEnd;
    };

    return (
        <input
            {...props}
            onKeyUp={blurOnEnter}
            className={`customBase ${props.className} ${error ? 'errorCaptured' : ''}`}
            onCopy={disgardCopy}
            ref={ref}
        />
    );
});
