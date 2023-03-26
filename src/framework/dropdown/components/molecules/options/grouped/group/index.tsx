import React from 'react';
import * as Atoms from 'framework/dropdown/components/atoms';
import * as Contracts from 'framework/dropdown/contracts';

export interface GroupProps {
    id?: string;
    grouped: Contracts.OptionGroup[];
    onOptionClick: (option: string) => void;
    selected?: Contracts.DropdownOptions;
    favorize?: boolean;
    onFavorize?: (option: Contracts.DropdownOptions) => void;
}

export const Group = ({ id, grouped, selected, favorize, onOptionClick, onFavorize }: GroupProps) => {
    return (
        <>
            {grouped.map((group, index) => (
                <div key={group.name.concat(`-${index}`)} className='dropdown-grouping'>
                    {!group.isParent ? (
                        <>
                            <Atoms.Label label={group.name} />
                            {group.options.map((option) => (
                                <Atoms.Option
                                    key={option.value}
                                    className='group-option'
                                    onClick={onOptionClick}
                                    id={id?.concat('option').concat(option.value)}
                                    selected={selected}
                                    option={option}
                                    favorites={favorize}
                                    isFavorite={option.favorite}
                                    onFavorize={onFavorize}
                                />
                            ))}
                        </>
                    ) : (
                        <Group
                            grouped={group.options}
                            onOptionClick={onOptionClick}
                            onFavorize={onFavorize}
                            id={id?.concat('option'.concat(group.name))}
                            favorize={favorize}
                            selected={selected}
                            key={group.name}
                        />
                    )}
                </div>
            ))}
        </>
    );
};
