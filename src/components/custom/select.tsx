import {
    Select as CoreSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

function Select({
    id,
    options,
    placeholder,
    className,
    defaultValue,
    onValueChange
}: {
    options: Array<{}>;
    placeholder: string;
    id: string;
    className?: string;
    defaultValue?: string;
    onValueChange?: (item: string) => void;
}) {
    return (
        <CoreSelect
            defaultValue={defaultValue}
            onValueChange={onValueChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder || 'Select an item'} />
            </SelectTrigger>
            <SelectContent
                id={id}
                className={className}>
                {options.map((option: any) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}>
                        <div className="flex items-center gap-x-2">
                            {option.icon && <div>{option.icon}</div>}
                            <div>{option.label}</div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </CoreSelect>
    );
}

export default Select;
