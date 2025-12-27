import { useState } from 'react'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Container from '@/components/shared/Container'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import SalesForm from './TransferForm'
import { TbTrash } from 'react-icons/tb'
import { useOrderFormStore } from './store/orderFormStore'
import { useAuth } from '@/auth'
import ApiService from '@/services/ApiService'

async function pushData(data) {
    return ApiService.fetchDataWithAxios({
        url: '/create-transfer',
        method: 'post',
        data,
    })
}
const Sales = () => {
    const { user } = useAuth()
    const { setSelectedProduct, selectedProduct, setProductList, productList } = useOrderFormStore()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [formRefresh, setFormRefresh] = useState(true)

    const handleFormSubmit = async (values) => {
        
        setIsSubmiting(true)
        const orderData = selectedProduct.map(
            ({ id, quantity }) => ({ id, quantity }),
        )
        if(!orderData.length) {
            toast.push(
                <Notification type="danger">
                    Please select at least one product to create an order.
                </Notification>,
                { placement: 'top-center' },
            )
            setIsSubmiting(false)
            return
        }
        
        const orderDetails = {
            id: user.id,
            sku: values,
            products: orderData,
        }
        
        try{
            const resp = await pushData(orderDetails)
            
            if (resp) {
                toast.push(
                    <Notification type="success">Stock Transferred!</Notification>,
                    { placement: 'top-center' },
                )
                setProductList(
                    productList.map((item) => {
                        const product = selectedProduct.find((p) => p.id === item.id)
                        if (product) {
                            item.balance = item.balance - product.quantity
                        }
                        return item
                    })
                )
                setSelectedProduct([])
                setFormRefresh((prev) => !prev)
                
            }
        }catch (e) {
            toast.push(
                <Notification type="danger">
                    {e?.response?.data?.message || e.message.toString() || e.toString()}
                </Notification>,
                { placement: 'top-center' },
            )
        }
        setIsSubmiting(false)
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        setSelectedProduct([])
        setFormRefresh((prev) => !prev)
        toast.push(
            <Notification type="success">Order discarded!</Notification>,
            { placement: 'top-center' },
        )
        // navigate('/concepts/orders/order-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }
    if(user.id != 2){
        return <div>You are not authorized to access this page.</div>
    }
    return (
        <>
            <SalesForm onFormSubmit={handleFormSubmit} refresh={formRefresh}>
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </SalesForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default Sales
