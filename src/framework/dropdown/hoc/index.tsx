import React from 'react';
import * as Icons from 'react-feather';

import './Dropdown.css';
import { BaseInput } from 'framework/input';
import * as Options from 'framework/dropdown/components/molecules';
import * as Contracts from 'framework/dropdown/contracts';

interface DropdownProps<T extends string> {
    current: T;
    onChange: (field: T) => void;
    onBlur?: () => void;
    onFavorizeOption?: (option: Contracts.DropdownOptions) => void;
    searchable?: boolean;
    maxLength?: number;
    max?: number;
    minLength?: number;
    min?: number;
    regex?: RegExp;
    id?: string;
    className?: string;
    closeOnSelect?: boolean;
    favorites?: string[];
    fields: Contracts.DropdownOptions[] | Contracts.GroupedDropdownOptions[];
    placeholder?: string;
}

export const Dropdown = <T extends string>({
    id,
    fields,
    current,
    onChange,
    onBlur,
    searchable = false,
    className,
    closeOnSelect,
    favorites,
    onFavorizeOption,
    placeholder,
}: DropdownProps<T>) => {
    const dropdown = React.useRef<HTMLDivElement>();
    const setDropdown = (ref: HTMLDivElement) => (dropdown.current = ref);
    const input = React.useRef<HTMLInputElement>();
    const setInput = (ref: HTMLInputElement) => (input.current = ref);
    const menu = React.useRef<HTMLDivElement>();
    const setMenu = (ref: HTMLDivElement) => (menu.current = ref);
    const textContainer = React.useRef<HTMLDivElement>();
    const setTextContainer = (ref: HTMLDivElement) => (textContainer.current = ref);
    const text = React.useRef<HTMLDivElement>();
    const setText = (ref: HTMLDivElement) => (text.current = ref);

    const [currentVisibleOptions, setCurrentVisibleOptions] = React.useState<string[]>([]);
    const grouped = fields.some((field) => (field as Contracts.GroupedDropdownOptions).group !== undefined);

    const [top, setTop] = React.useState<number>();
    const [active, setActive] = React.useState(false);
    const [search, setSearch] = React.useState<string | null>(null);

    const handleOptionClick = (option?: string) => {
        onChange(option as T);
        setSearch(null);
        if (!closeOnSelect) return;
        setActive(false);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value);

    const toggle = () => setActive((prev) => !prev);

    const enterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.persist();
        if (event.key.toLowerCase() !== 'enter') return;
        if (search === null) return;
        console.log('enter search', currentVisibleOptions);
        if (currentVisibleOptions.length > 0) onChange(currentVisibleOptions[0] as T);
        setSearch(null);
        toggle();
    };

    React.useEffect(() => {
        if (!input.current) return;

        if (active) input.current.focus();
        else {
            setSearch(null);
            input.current.blur();
        }
    }, [input.current, active]);

    React.useEffect(() => {
        const clickListener = (event: MouseEvent) => {
            if ((dropdown.current as any)?.contains(event.target)) return;
            setActive(false);
        };
        const scrollListener = () => setTop(input.current?.getBoundingClientRect().top);

        document.addEventListener('click', clickListener);
        document.addEventListener('scroll', scrollListener);
        return () => {
            document.removeEventListener('click', clickListener);
            document.removeEventListener('scroll', scrollListener);
        };
    }, []);

    React.useLayoutEffect(() => {
        if (!textContainer.current || !text.current || !input.current) return;
        textContainer.current.style.width = `${text.current.clientWidth + 17.5}px`;
        input.current.style.width = `${text.current.clientWidth - 4.5}px`;
    }, [text.current, textContainer.current, current]);

    return (
        <div className={`dropdown ${active ? 'active' : ''} ${className ?? ''}`} ref={setDropdown}>
            <div className='customBase dropdown-search'>
                <div
                    className={'dropdown-text'.concat(!searchable ? ' dropdown-readonly' : '')}
                    onClick={toggle}
                    ref={setTextContainer}
                >
                    {!search && (
                        <div className='dropdown-searchtext' ref={setText}>
                            {current ?? placeholder}
                        </div>
                    )}
                    <BaseInput
                        value={search ?? ''}
                        id={id?.concat('input')}
                        onChange={handleSearch}
                        className='dropdown-searchinput'
                        autoComplete='off'
                        autoCapitalize='off'
                        autoCorrect='off'
                        disabled={!searchable}
                        ref={setInput}
                        onKeyUp={enterSearch}
                    />
                </div>
                <Icons.ChevronDown size={16} className='dropdown-searchicon' onClick={toggle} />
            </div>
            {grouped ? (
                <Options.Grouped
                    id={id}
                    onOptionClick={handleOptionClick}
                    onFilteredChange={setCurrentVisibleOptions}
                    options={fields as Contracts.GroupedDropdownOptions[]}
                    current={current}
                    top={top}
                    ref={setMenu}
                    filter={search}
                    onFavorize={onFavorizeOption}
                    favorites={favorites}
                />
            ) : (
                <Options.Standard
                    id={id}
                    onOptionClick={handleOptionClick}
                    options={fields}
                    current={current}
                    filter={search}
                    top={top}
                    ref={setMenu}
                    onFilteredChange={setCurrentVisibleOptions}
                />
            )}
        </div>
    );
};
