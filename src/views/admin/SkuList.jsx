
import { useState, useEffect, useMemo } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import { useNavigate } from 'react-router'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import ApiService from '@/services/ApiService'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

async function apiGetData(){
    return ApiService.fetchDataWithAxios({
        url: '/list-sku',
        method: 'get',
    })
}

const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]

const PaginationTable = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGetData().then((response) => {
            setData(response)
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const totalData = data.length

    const columns = useMemo(
        () => [
            {
                header: 'User ID',
                accessorKey: 'username',
            },
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'City',
                accessorKey: 'city',
            },
        ],
        [],
    )

    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const handleEdit = (row) => {
        navigate(`/admin/sku/edit/${row.original.id}`)
    }

    const onPaginationChange = (page) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div>
            <Card>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            <Th className="w-20">Sl No</Th>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {
                                            <Sorter
                                                sort={header.column.getIsSorted()}
                                            />
                                        }
                                        </div>
                                    </Th>
                                )
                            })}
                            <Th>Action</Th>
                        </Tr>
                    ))}
                </THead>
                {loading ?
                    <TableRowSkeleton
                    columns={7}
                    rows={10}
                    avatarInColumns={[0]}
                    avatarProps={{ width: 28, height: 28 }}
                    />
                :
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                <Td>
                                    {row.index + 1}
                                </Td>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    )
                                })}
                                <Td>
                                    <Button onClick={() => handleEdit(row)} icon={<HiOutlinePencil />} variant="solid" size="xs" className="mr-2"/>
                                    <Button icon={<HiOutlineTrash />} variant="plain" size="xs" className="bg-error"/>
                                </Td>
                            </Tr>
                        )
                    })}
                </TBody>
                }
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize,
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
            </Card>
        </div>
    )
}

export default PaginationTable

