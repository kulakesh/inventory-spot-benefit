import { useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import ApiService from '@/services/ApiService'
import { Card } from '@/components/ui'
import Select from '@/components/ui/Select'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import dayjs from 'dayjs'

const { Tr, Th, Td, THead, TBody } = Table

async function apiGetData(page, pageSize){
    const url = `/franchisee-wallet-history/?page=${page}&per_page=${pageSize}`
    return ApiService.fetchDataWithAxios({
        url: url,
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

const WalletHistory = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalRecord, setTotalRecord] = useState();
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 2,
    })
    let total_page = 0;

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        apiGetData(pagination.page, pagination.pageSize).then((response) => {
            setTotalRecord(response.total || 0)
            setData(response.data)
        }).catch((e) => {
            setError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }
    const table = useReactTable({
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
    })
    const onPaginationChange = (page) => {
        table.setPageIndex(page - 1)
        console.log('Page changed:', page)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    if (error) {
        return <div>{error || error.message}</div>
    }
    return (
        <div>
            <Card>
                <Table>
                    <THead>
                        <Tr>
                            <Th>Sl. No.</Th>
                            <Th>Type</Th>
                            <Th>Credit</Th>
                            <Th>Debit</Th>
                            <Th>Remark</Th>
                            <Th>Description</Th>
                            <Th>Date</Th>
                        </Tr>
                    </THead>
                    {loading ?
                        <TableRowSkeleton
                        columns={6}
                        rows={10}
                        avatarInColumns={[1]}
                        avatarProps={{ width: 28, height: 28 }}
                        />
                    :
                    <TBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.original.id}>
                                    <Td>{row.index + 1}</Td>
                                    <Td>{row.original.type}</Td>
                                    <Td>{row.original.type === 'cr' ? row.original.amount : 0}</Td>
                                    <Td>{row.original.type === 'dr' ? row.original.amount : 0}</Td>
                                    <Td>{row.original.remark}</Td>
                                    <Td>{row.original.description}</Td>
                                    <Td>{dayjs.unix(Date.parse(row.original.created_at)/1000).format('D MMM, YYYY h:mm a')}</Td>
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
                    total={totalRecord}
                    onChange={onPaginationChange}
                />
                {console.log('totalRecord', totalRecord)}
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

export default WalletHistory