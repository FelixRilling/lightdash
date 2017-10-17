type Class = any;
type Entry = [string, any];
type ElementCounted = [any, number];
type ForTimesIterator = (val?: number) => void;
type ForEachIterator = (val?: any, index?: number, arr?: any[]) => void;
type ForEachEntryIterator = (val?: any, key?: string, index?: number, obj?: object) => void;

export {
    Class,
    Entry,
    ElementCounted,
    ForTimesIterator,
    ForEachEntryIterator,
    ForEachIterator,
};