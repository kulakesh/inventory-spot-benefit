
import { useState, useEffect, useMemo } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import { data, useNavigate } from 'react-router'
import { HiPrinter, HiOutlineEye } from 'react-icons/hi'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import ApiService from '@/services/ApiService'
import { useAuth } from '@/auth'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Dialog from '@/components/ui/Dialog'
import ScrollBar from '@/components/ui/ScrollBar'
import classNames from '@/utils/classNames'
import dayjs from 'dayjs'
import Tooltip from '@/components/ui/Tooltip'
import DatePicker from '@/components/ui/DatePicker'

const { Tr, Th, Td, THead, TBody } = Table

async function apiGetData(id, data){
    return ApiService.fetchDataWithAxios({
        url: `/get-sales-list/${id}/${data.startDate}/${data.endDate}`,
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
    const [items, setItems] = useState([])
    const [productsDialogOpen, setProductsDialogOpen] = useState(false)
    const [dateRange, setDateRange] = useState([null, null])

    const { user } = useAuth()

    useEffect(() => {
        apiGetData(user.id, {startDate: 'undefined', endDate: 'undefined'}).then((response) => {
            setData(response)
        }).catch((e) => {
            setError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    // useEffect(() => {
    //     if(items.length)
    //         setProductsDialogOpen(true)
    // }, [items]);
    const handleRangePickerChange = (date) => {
        if(date[0] === null || date[1] === null) return;
        setLoading(true);
        setDateRange(date)
        apiGetData(user.id, {startDate: dayjs(date[0]).format('YYYY-MM-DD'), endDate: dayjs(date[1]).format('YYYY-MM-DD')}).then((response) => {
            setData(response)
        }).catch((e) => {
            setError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }

    const totalData = data.length

    const table = useReactTable({
        data,
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
    const handleProductDialog = (value) => {
        setItems(value)
        setProductsDialogOpen(true)
    }
    const handlePrint = (value) => {
        navigate(`/user/invoice2`, {
            state: value,
        })
    }
    if (error) {
        return <>
            <div>{error.message}</div>
            <div className="flex items-center justify-end">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by date:
                </label>
                <DatePicker.DatePickerRange
                    placeholder="Select dates range"
                    value={dateRange}
                    inputFormat="DD MMM, YYYY"
                    separator="to"
                    onChange={handleRangePickerChange}
                    className="w-64 mb-4 ml-4"
                />
            </div>
        </>
        
    }
    return (
        <div>
            <div className="flex items-center justify-end">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by date:
                </label>
                <DatePicker.DatePickerRange
                    placeholder="Select dates range"
                    value={dateRange}
                    inputFormat="DD MMM, YYYY"
                    separator="to"
                    onChange={handleRangePickerChange}
                    className="w-64 mb-4 ml-4"
                />
            </div>
            <Card>
            <Table>
                <THead>
                    <Tr>
                        <Th>Sl No</Th>
                        <Th>Name</Th>
                        <Th>Phone</Th>
                        <Th>City</Th>
                        <Th>Amount</Th>
                        <Th>Items</Th>
                        <Th>Date</Th>
                        <Th>Action</Th>
                    </Tr>
                </THead>
                {loading ?
                    <TableRowSkeleton
                    columns={6}
                    rows={10}
                    avatarInColumns={[2, 3, 5]}
                    avatarProps={{ width: 28, height: 28 }}
                    />
                :
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.original.id}>
                                <Td>{row.index + 1}</Td>
                                <Td className={row.original.myshopee_order_id ? 'text-blue-500' : ''}>{row.original.name}</Td>
                                <Td>{row.original.phone}</Td>
                                <Td>{row.original.city}</Td>
                                <Td>{row.original.amount}</Td>
                                <Td>
                                    <div className="flex items-center">
                                        <Badge className="mr-2" innerClass="bg-blue-500" content={row.original.items.length}>
                                            <Tooltip title="View items">
                                                <Button onClick={() => handleProductDialog(row.original.items)} shape="circle" size="sm" icon={<HiOutlineEye />} />
                                            </Tooltip>
                                        </Badge>
                                    </div>
                                </Td>
                                <Td>{dayjs.unix(row.original.created_at).format('D MMM, YYYY h:mm a')}</Td>
                                <Td><Button onClick={() => handlePrint(row.original)} shape="circle" size="sm" icon={<HiPrinter />} /></Td>
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
            
            <Dialog
                isOpen={productsDialogOpen}
                onClose={() => setProductsDialogOpen(false)}
                onRequestClose={() => setProductsDialogOpen(false)}
            >
                <div className="text-center mb-6">
                    <h4 className="mb-1">Ordered items</h4>
                </div>
                <div className="mt-4">
                    <div className="mb-6">
                        <ScrollBar
                            className={classNames('overflow-y-auto h-80')}
                        >
                            {items?.map((product) => (
                                <div
                                    key={product.id}
                                    className="py-3 pr-5 rounded-lg flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                size="lg"
                                                shape="round"
                                                src={product.img_url}
                                            />
                                            <div>
                                                <p className="heading-text font-bold">
                                                    {product.name}
                                                </p>
                                                <p>Price: ₹{product.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        Qnt:
                                        <span className="heading-text font-bold">
                                            {product.quantity}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </ScrollBar>
                    </div>
                </div>
                <Button
                    block
                    type="button"
                    variant="solid"
                    onClick={() => setProductsDialogOpen(false)}
                >
                    Close
                </Button>
            </Dialog>
        </div>
    )
}

export default PaginationTable

