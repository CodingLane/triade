import React from 'react';
import * as Contracts from 'framework/dropdown/contracts';
import * as Atoms from 'framework/dropdown/components/atoms';

export interface StandardProps<T extends string> {
    id?: string;
    options: Contracts.DropdownOptions[];
    top?: number;
    onOptionClick: (option?: string) => void;
    filter?: string | null;
    onFilteredChange: (options: string[]) => void;
    current?: T;
}

export const Standard = React.forwardRef(
    <T extends string>(
        { id, options, top, filter, onOptionClick, onFilteredChange, current }: StandardProps<T>,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const filtered = React.useMemo(
            () => options.filter((option) => Contracts.filterOptions(option, filter)),
            [options, filter],
        );

        React.useEffect(() => {
            onFilteredChange(filtered.map((filter) => filter.value));
        }, [filtered]);

        const selected = React.useMemo(
            () => filtered.filter((option) => option.label === current).pop(),
            [options, current],
        );

        return (
            <div className='dropdown-content' ref={ref} style={{ top }}>
                {filtered.map((option) => (
                    <Atoms.Option
                        key={option.value}
                        onClick={onOptionClick}
                        id={id?.concat('option').concat(option.value)}
                        option={option}
                        selected={selected}
                    />
                ))}
            </div>
        );
    },
);
