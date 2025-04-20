import * as React from 'react';

import { FaChevronLeft } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

function PaginationCustom({
    currentPage,
    totalPage,
    loading,
    onNext,
    onPrevious
}: {
    currentPage: number;
    totalPage: number;
    loading?: boolean;
    onNext: () => void;
    onPrevious: () => void;
}) {
    return (
        <div className="flex items-center">
            <Button
                variant={'ghost'}
                onClick={currentPage === 1 ? () => {} : onPrevious}
                disabled={currentPage === 1 || loading}>
                <FaChevronLeft className="h-4 w-4" />
                <span>Previous</span>
            </Button>
            <Button
                variant={'ghost'}
                onClick={currentPage === totalPage ? () => {} : onNext}
                disabled={currentPage === totalPage || loading}>
                <span>Next</span>
                <FaChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default PaginationCustom;
