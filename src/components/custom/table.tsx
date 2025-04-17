import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

function CustomTable({
    row,
    headColumns,
    cellColumns
}: {
    row: any;
    headColumns: Array<any>;
    cellColumns: Array<any>;
}) {
    return (
        <Table className="min-h-[224px]">
            <TableHeader>
                <TableRow>
                    {headColumns?.map((item) => (
                        <TableHead
                            key={item.name}
                            className={`tableColumn ${item.style}`}>
                            {item.name}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {row?.map((item: any) => (
                    <TableRow key={item.id}>
                        {cellColumns?.map((cell) => {
                            const cellStyle = item.hasOwnProperty(`${cell.name}_style`)
                                ? Object.values(item[`${cell.name}_style`]).join('')
                                : '';

                            return (
                                <TableCell
                                    key={cell.name}
                                    className={`tableColumn ${cellStyle}`}>
                                    {Object.values(item[cell.name])}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default CustomTable;
