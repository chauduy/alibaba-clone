import { Product, Timestamp } from '@/type';

export const getOrderStatus = (date: Timestamp) => {
    if (!date) return;
    const deliveryTime = new Date(date.seconds * 1000 + date.nanoseconds / 1e6);
    const present = new Date();
    if (deliveryTime.getTime() > present.getTime()) {
        return 'Delivering';
    } else {
        return 'Completed';
    }
};

export const convertToDate = (date: Timestamp) =>
    new Date(date.seconds * 1000 + date.nanoseconds / 1e6).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

export const getAmount = (list: Product[]) => {
    return list.reduce(
        (acc, cur) =>
            acc +
            Math.round(
                cur.price.includes('-')
                    ? parseFloat(cur.price.split('-')[1].replace('$', ''))
                    : parseFloat(cur.price.split('$')[1].replace('$', ''))
            ),
        10
    );
    // shipping price included
};
