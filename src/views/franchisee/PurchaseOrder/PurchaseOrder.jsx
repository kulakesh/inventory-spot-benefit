import { useState } from 'react'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Container from '@/components/shared/Container'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import OrderForm from './OrderForm'
import { useNavigate } from 'react-router'
import { TbTrash } from 'react-icons/tb'
import { useOrderFormStore } from './store/orderFormStore'
import { useAuth } from '@/auth'
import ApiService from '@/services/ApiService'

async function pushData(data) {
    return ApiService.fetchDataWithAxios({
        url: '/create-franchisee-order',
        method: 'post',
        data,
    })
}
const PurchaseOrder = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { setSelectedProduct, selectedProduct } = useOrderFormStore()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

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
            products: orderData,
        }
        
        try{
            const resp = await pushData(orderDetails)
            if (resp) {
                toast.push(
                    <Notification type="success">Order Placed!</Notification>,
                    { placement: 'top-center' },
                )
                setSelectedProduct([])
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
        // navigate('/concepts/orders/order-list')
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        setSelectedProduct([])
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

    return (
        <>
            <OrderForm onFormSubmit={handleFormSubmit}>
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
            </OrderForm>
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

export default PurchaseOrder
