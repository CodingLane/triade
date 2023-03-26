import * as Types from 'framework/dropdown/contracts/types';

export const filterOptions = (field: Types.DropdownOptions, filter?: string | null) => {
    if (!filter || filter === null) return true;
    const parts = filter.toLowerCase().split(' ');
    return parts.every((part) => field.label.toLowerCase().includes(part));
};

export const createGroups = (options: Types.GroupedDropdownOptions[], filter?: string | null) => {
    const groups = options
        .filter((option) => filterOptions(option, filter))
        .map((field) => field.group)
        .filter((group, index, self) => self.indexOf(group) === index);

    return groups;
};

export const mapToGroups = (options: Types.GroupedDropdownOptions[], filter?: string | null) => {
    const groups = createGroups(options, filter);

    const mapped: Types.OptionGroup[] = [];

    groups.forEach((group) => {
        const groupOption = options
            .filter((option) => option.group === group)
            .filter((option) => filterOptions(option, filter))
            .map((option) => ({ value: option.value, label: option.label, favorite: option.favorite }));
        mapped.push({
            name: group,
            options: groupOption,
            isParent: false,
        });
    });
    return mapped.sort((left, right) => (left.name < right.name ? -1 : 1));
};

export const mapToGroupsWithFavorites = (
    options: Types.GroupedDropdownOptions[],
    labels: Types.FavoriteLabels,
    favorites: string[],
    filter?: string | null,
) => {
    const grouped = mapToGroups(options, filter);

    const favoriteGroup: Types.OptionGroup = {
        name: labels.favorite ?? 'Favorites',
        isParent: true,
        options: [],
    };

    const nonFavoriteGroup: Types.OptionGroup = {
        name: labels.nonFavorite ?? 'Standard',
        isParent: true,
        options: [],
    };

    grouped.forEach((group) => {
        if (group.isParent) throw new Error('We should not have a parent group!');

        const favOptions = group.options.filter((opt) => favorites.includes(opt.value));
        const nonFavOptions = group.options.filter((opt) => !favorites.includes(opt.value));
        if (favOptions.length > 0)
            favoriteGroup.options.push({
                ...group,
                options: favOptions,
            });
        if (nonFavOptions.length > 0)
            nonFavoriteGroup.options.push({
                ...group,
                options: nonFavOptions,
            });
    });

    return [favoriteGroup, nonFavoriteGroup];
};
