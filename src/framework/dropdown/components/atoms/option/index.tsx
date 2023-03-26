import React from 'react';
import * as Contracts from 'framework/dropdown/contracts';
import * as Icons from 'react-feather';

export interface OptionProps {
    id?: string;
    selected?: Contracts.DropdownOptions;
    option: Contracts.DropdownOptions;
    className?: string;
    onClick: (option: string) => void;
    icon?: JSX.Element;
    favorites?: boolean;
    isFavorite?: boolean;
    onFavorize?: (option: Contracts.DropdownOptions) => void;
}

export const Option = ({
    id,
    selected,
    option,
    className,
    favorites,
    isFavorite,
    onFavorize,
    onClick,
}: OptionProps) => {
    const ident = React.useMemo(() => id?.concat('option').concat(option.value), [id, option]);

    const styling = React.useMemo(
        () =>
            'dropdown-option'
                .concat(className ?? '')
                .concat(option.label === selected?.label ? ' selected-dropdown' : ''),
        [selected, option],
    );

    const favorize = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        event.stopPropagation();
        if (!onFavorize) return;
        onFavorize(option);
    };

    const handleClick = () => onClick(option.value);

    return (
        <div className='dropdown-option-container' onClick={handleClick}>
            {favorites && (
                <Icons.Star
                    color='#FFC300'
                    fill={isFavorite ? '#FFC300' : 'transparent'}
                    size={18}
                    className='dropdown-option-favorite'
                    onClick={favorize}
                />
            )}
            <div className={styling} id={ident}>
                {option.label}
            </div>
        </div>
    );
};
