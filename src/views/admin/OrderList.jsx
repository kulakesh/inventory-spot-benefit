
import { useState, useEffect, useMemo } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import { useParams, useNavigate } from 'react-router'
import { HiOutlinePencil, HiOutlineTrash, HiCheck, HiOutlineEye } from 'react-icons/hi'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import ApiService from '@/services/ApiService'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Dialog from '@/components/ui/Dialog'
import ScrollBar from '@/components/ui/ScrollBar'
import classNames from '@/utils/classNames'
import dayjs from 'dayjs'
import Tooltip from '@/components/ui/Tooltip'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

const { Tr, Th, Td, THead, TBody } = Table

async function apiGetData(history){
    const url = history ? `/get-order-history` : `/get-order-list`
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

const status = [
    <Badge
        className="mr-4"
        content={'Pending'}
        innerClass="bg-white text-gray-500"
    />, 
    'Deleted', 
    <Badge
        className="mr-4"
        content={'Complete'}
        innerClass="bg-emerald-500"
    />, 
]
const PaginationTable = () => {
    const { history } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([])
    const [productsDialogOpen, setProductsDialogOpen] = useState(false)
    const [showOrderConfirmationDialog, setShowOrderConfirmationDialog] = useState(false)
    const [showOrderCancellationDialog, setShowOrderCancellationDialog] = useState(false)
    const [conformationID, setConformationID] = useState(null)
    const [isSubmiting, setIsSubmiting] = useState(false)

    useEffect(() => {
        apiGetData(history).then((response) => {
            setData(response)
        }).catch((e) => {
            setError(e?.response?.data?.message || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    // useEffect(() => {
    //     if(items.length)
    //         setProductsDialogOpen(true)
    // }, [items]);

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

    const handleOrderConfirmation = () => {
        if(!conformationID) return
        setIsSubmiting(true)
        ApiService.fetchDataWithAxios({
            url: `/confirm-order/${conformationID}`,
            method: 'get',
        })
        .then((response) => {
            if(response) {
                setShowOrderConfirmationDialog(false)
                setConformationID(null)
                setData((prevData) => prevData.map((item) => {
                    if(item.id === conformationID) {
                        return { ...item, status: 2 } // 2 is the status for 'Complete'
                    }
                    return item
                }))
            }
        })
        .catch((error) => {
            console.error('Error confirming order:', error);
        }).finally(() => {
            setIsSubmiting(false)
        })

        hideOrderConfirmationDialog()
    }

    const handleOrderCancellation = () => {
        if(!conformationID) return
        setIsSubmiting(true)
        ApiService.fetchDataWithAxios({
            url: `/cancel-order/${conformationID}`,
            method: 'get',
        })
        .then((response) => {
            if(response) {
                setShowOrderConfirmationDialog(false)
                setConformationID(null)
                setData((prevData) => prevData.filter((item) => item.id !== conformationID))
            }
        })
        .catch((error) => {
            console.error('Error cancelling order:', error);
        }).finally(() => {
            setIsSubmiting(false)
        })

        hideOrderCancellationDialog()
    }

    const popupOrderConformationDialog = (id) => {
        setShowOrderConfirmationDialog(true)
        setConformationID(id)
    }

    const hideOrderConfirmationDialog = () => {
        setShowOrderConfirmationDialog(false)
        setConformationID(null)
    }
    const popupOrderCancellationDialog = (id) => {
        setShowOrderCancellationDialog(true)
        setConformationID(id)
    }
    const hideOrderCancellationDialog = () => {
        setShowOrderCancellationDialog(false)
        setConformationID(null)
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
                        <Th>Sl No</Th>
                        <Th>ID</Th>
                        <Th>Username</Th>
                        <Th>Name</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                        <Th>Items</Th>
                        <Th>Date</Th>
                        {history ? null : <Th>Action</Th>}
                    </Tr>
                </THead>
                {loading ?
                    <TableRowSkeleton
                    columns={9}
                    rows={10}
                    avatarInColumns={[5, 6, 8]}
                    avatarProps={{ width: 28, height: 28 }}
                    />
                :
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.original.id}>
                                <Td>{row.index + 1}</Td>
                                <Td>{row.original.user?.id}</Td>
                                <Td>{row.original.user?.username}</Td>
                                <Td>{row.original.user?.name}</Td>
                                <Td>{row.original.amount}</Td>
                                <Td>{status[row.original.status]}</Td>
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
                                {history ? null : 
                                <Td>
                                    <div className="flex justify-end text-lg gap-1">
                                    <Button 
                                        onClick={() => popupOrderConformationDialog(row.original.id)} 
                                        icon={<HiCheck />} 
                                        loading={isSubmiting}
                                        variant="solid" 
                                        size="xs"/>
                                    <Button 
                                        onClick={() => popupOrderCancellationDialog(row.original.id)} 
                                        icon={<HiOutlineTrash />} 
                                        loading={isSubmiting}
                                        variant="plain" 
                                        size="xs" 
                                        className="bg-error text-white"/>
                                    </div>
                                </Td>
                                }
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
            <ConfirmDialog
                isOpen={showOrderConfirmationDialog}
                title="Order Confirmation"
                onClose={hideOrderConfirmationDialog}
                onRequestClose={hideOrderConfirmationDialog}
                onCancel={hideOrderConfirmationDialog}
                onConfirm={handleOrderConfirmation}
            >
                <p>
                    Are you sure you want confirm this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
            <ConfirmDialog
                isOpen={showOrderCancellationDialog}
                title="Cancel Confirmation"
                onClose={hideOrderCancellationDialog}
                onRequestClose={hideOrderCancellationDialog}
                onCancel={hideOrderCancellationDialog}
                onConfirm={handleOrderCancellation}
                type="danger"
            >
                <p>
                    Are you sure you want cancel this order? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </div>
    )
}

export default PaginationTable

