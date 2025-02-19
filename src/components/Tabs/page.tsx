import { motion } from 'framer-motion';

import { tabs } from '@/constants';
import { TabProps } from '@/type';

const Tab = ({ id, text, selected, setSelected }: TabProps) => {
    return (
        <button
            onClick={() => setSelected(id)}
            className={`${
                selected ? 'font-bold' : 'border border-[#ddd]'
            } relative h-10 min-w-[120px] rounded-[100px] px-6 py-1 text-sm text-[#222] transition-colors`}>
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-[100px] border-2 border-[#222] bg-white"></motion.span>
            )}
        </button>
    );
};

const CategoryTabs = ({
    selectedCategory,
    setSelectedCategory
}: {
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <div className="mb-8 flex flex-wrap items-center gap-2">
            {tabs.map((tab, index) => (
                <Tab
                    id={tab.key}
                    text={tab.name}
                    selected={selectedCategory === tab.key}
                    setSelected={setSelectedCategory}
                    key={tab.key}
                />
            ))}
        </div>
    );
};

export default CategoryTabs;
