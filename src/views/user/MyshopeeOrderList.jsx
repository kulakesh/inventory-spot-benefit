
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
import { useAuth } from '@/auth'
import { TbMinus, TbPlus } from 'react-icons/tb'
import useResponsive from '@/utils/hooks/useResponsive'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'


const { Tr, Th, Td, THead, TBody } = Table

async function apiGetData(history, id){
    const url = history ? `/get-order-history/` : `/sku-order-list/`  + id;
    return ApiService.fetchDataWithAxios({
        url: url,
        method: 'get',
    })
}
async function pushData(data) {
    return ApiService.fetchDataWithAxios({
        url: '/sku-order-confirm',
        method: 'post',
        data,
    })
}
async function apiPushData(data) {
    return ApiService.fetchDataWithAxios({
        url: '/create-sales',
        method: 'post',
        data,
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
    const [conformationID, setConformationID] = useState(null)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [orderConfirmWhistle, setOrderConfirmWhistle] = useState(false)


    const { user } = useAuth()

    const { smaller } = useResponsive()

    useEffect(() => {
        initialData()
    }, [])

    const initialData = () => {
        apiGetData(history, user.id).then((response) => {
            setData(response)
            
        }).catch((e) => {
            setError(e?.response?.data?.message || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }
    const handleProductIncremental = (product) => {
        const newData = data.map((item) => {
            if(item.id === product.order_id) {
                item.items.map((p) => {
                    if(p.id === product.id) {
                        const totalIssue = p.issue ? p.issue + 1 : 1
                        if(totalIssue <= p.quantity - p.issued && totalIssue <= p.balance) {
                            p.issue = totalIssue
                        }
                    }
                    return p
                })
            }
            return item
        })
        setData(newData)
    }
    const handleProductDecremental = (product) => {
        const newData = data.map((item) => {
            if(item.id === product.order_id) {
                item.items.map((p) => {
                    if(p.id === product.id) {
                        const totalIssue = p.issue ? p.issue - 1 : 0
                        if(totalIssue >= 0) {
                            p.issue = totalIssue
                        }
                    }
                    return p
                })
            }
            return item
        })
        setData(newData)
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

    const handleOrderConfirmation = async () => {
        if(!conformationID) return
        setIsSubmiting(true)
        var orderData = []
        data.map((item) => {
            if(item.id === conformationID) {
                orderData = item.items.map(
                    ({ id, issue }) => ({ id, issue }),
                )
            }
        })
        const orderDetails = {
            order_id: conformationID,
            order_items: orderData,
        }
        try{
            const resp = await pushData(orderDetails)
            
            if (resp) {
                
                // const resData = data.map((item) => {
                //     if(item.id === conformationID) {
                //         return resp
                //     }
                //     return item
                // })
                // setData(resData)
                setShowOrderConfirmationDialog(false)
                setProductsDialogOpen(false)
                setConformationID(null)
                toast.push(
                    <Notification type="success">Order fullfilled!</Notification>,
                    { placement: 'top-center' },
                )
                initialData()
            }
        }catch (e) {
            console.error('Error confirming order:', e);
            toast.push(
                <Notification type="danger">
                    {e?.response?.data?.message || e.message.toString() || e.toString()}
                </Notification>,
                { placement: 'top-center' },
            )
        }
        setIsSubmiting(false)
        /*
        ApiService.fetchDataWithAxios({
            url: '/sku-order-confirm',
            method: 'post',
            orderDetails,
        })
        .then((response) => {
            if(response) {
                setShowOrderConfirmationDialog(false)
                setConformationID(null)
                const resData = data.map((item) => {
                    if(item.id === conformationID) {
                        return {...item, response}
                    }
                    return item
                })
                setData(resData)
            }
        })
        .catch((error) => {
            console.error('Error confirming order:', error);
        }).finally(() => {
            setIsSubmiting(false)
        })
        */

        hideOrderConfirmationDialog()
    }

    const popupOrderConformationDialog = (id) => {
        setShowOrderConfirmationDialog(true)
        setConformationID(id)
    }

    const hideOrderConfirmationDialog = () => {
        setShowOrderConfirmationDialog(false)
        setConformationID(null)
    }

    if (error) {
        return <div>{error || error?.message}</div>
    }
    return (
        <div>
            <Card>
            <Table>
                <THead>
                    <Tr>
                        <Th>Sl No</Th>
                        <Th>User ID</Th>
                        <Th>Name</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
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
                                <Td>{row.original.user?.user_id}</Td>
                                <Td>{row.original.user?.name}</Td>
                                <Td>{row.original.amount}</Td>
                                <Td>{status[row.original.status]}</Td>
                                <Td>{dayjs.unix(row.original.created_at).format('D MMM, YYYY h:mm a')}</Td>
                                {history ? null : 
                                <Td>
                                    <div className="flex justify-end text-lg gap-1">
                                    <div className="flex items-center">
                                        <Badge className="mr-2" innerClass="bg-blue-500" content={row.original.items.length}>
                                            <Tooltip title="View items">
                                                <Button onClick={() => handleProductDialog(row.original.items)} shape="circle" size="sm" icon={<HiCheck />} />
                                            </Tooltip>
                                        </Badge>
                                    </div>
                                    
                                    <Button icon={<HiOutlineTrash />} variant="plain" size="xs" className="bg-error text-white"/>
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
                width={850}
            >
                <div className="text-center mb-6">
                    <h4 className="mb-1">Ordered items</h4>
                </div>
                <div className="mt-4">
                    <div className="mb-6">
                        <ScrollBar
                            className={classNames('overflow-y-auto h-120')}
                        >
                            <Table compact={smaller.sm} className="mt-6">
                            <THead>
                                <Tr>
                                    <Th className="w-[40%]">Product</Th>
                                    <Th className="w-[20%]">Price</Th>
                                    <Th className="w-[10%]">Request Qnty</Th>
                                    <Th className="w-[10%]">Issued Qnty</Th>
                                    <Th className="w-[10%]">Stock </Th>
                                    <Th className="w-[10%]">Issue</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {items?.map((product) => (
                                    <Tr key={product.id}>
                                        <Td>
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    size="md"
                                                    shape="round"
                                                    src={product.img_url}
                                                />
                                                <span>{product.name}</span>
                                            </div>
                                        </Td>
                                        <Td>₹{product.amount}</Td>
                                        <Td>{product.quantity}</Td>
                                        <Td>{product.issued}</Td>
                                        <Td>
                                            {
                                                product.balance < product.quantity 
                                                ? <Badge
                                                    content={product.balance}
                                                    innerClass="bg-red-500"
                                                />
                                                : <Badge
                                                    content={product.balance}
                                                    innerClass="bg-green-500"
                                                />
                                            }
                                        </Td>
                                        <Td>
                                            <div className="flex items-center">
                                                <Button
                                                    type="button"
                                                    icon={<TbMinus />}
                                                    size="xs"
                                                    onClick={() =>
                                                        handleProductDecremental(
                                                            product,
                                                        )
                                                    }
                                                />
                                                <div className="w-10 text-center">
                                                    <span>{product.issue}</span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    icon={<TbPlus />}
                                                    size="xs"
                                                    onClick={() =>
                                                        handleProductIncremental(
                                                            product,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                            </TBody>
                            </Table>
                        </ScrollBar>
                    </div>
                </div>
                <Button
                    block
                    type="button"
                    variant="solid"
                    // onClick={() => setProductsDialogOpen(false)}
                    onClick={() => popupOrderConformationDialog(items[0].order_id)} 
                    loading={isSubmiting}
                >
                    ISSUE
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
        </div>
    )
}

export default PaginationTable

