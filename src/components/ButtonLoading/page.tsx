function Loading({ color }: { color?: string }) {
    return (
        <div
            className={`h-4 w-4 animate-spin rounded-full border-4 border-t-4 md:h-6 md:w-6 ${color ? `border-t-[${color}]` : 'border-t-white'}`}></div>
    );
}

export default Loading;
