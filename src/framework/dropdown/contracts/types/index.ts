export interface DropdownOptions {
    value: string;
    label: string;
    favorite?: boolean;
}

export interface GroupedDropdownOptions extends DropdownOptions {
    group: string;
}

export type FilterCallback = (field: { value: string; label: string; group: string }) => boolean;

interface BaseOptionGroup {
    name: string;
}

export interface OptionChildGroup extends BaseOptionGroup {
    options: DropdownOptions[];
    isParent: false;
}

export interface OptionParentGroup extends BaseOptionGroup {
    options: OptionGroup[];
    isParent: true;
}

export type OptionGroup = OptionChildGroup | OptionParentGroup;

export interface FavoriteLabels {
    favorite?: string;
    nonFavorite?: string;
}
