import { useState, useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import ProductSelectSection from './components/ProductSelectSection'
import CustomerDetailSection from './components/CustomerDetailSection'
import BillingAddressSection from './components/BillingAddressSection'
import PaymentMethodSection from './components/PaymentMethodSection'
import { TbCreditCard, TbCashBanknote, TbWallet, TbQrcode } from 'react-icons/tb'
import { useOrderFormStore } from './store/orderFormStore'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/auth'
import ApiService from '@/services/ApiService'
import Loading from '@/components/shared/Loading'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

async function apiGetData(id){
    return ApiService.fetchDataWithAxios({
        url: `/get-product-list/${id}`,
        method: 'get',
    })
}


const baseValidationSchema = z.object({
    user_id: z.string().min(1, { message: 'User ID required' }),
    name: z.string().min(1, { message: 'Name required' }),
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }).nullish(),
    phone: z
        .string()
        .min(1, { message: 'Please input your mobile number' }).nullish(),
    address: z.string().min(1, { message: 'Addrress required' }).nullish(),
    pin: z.string().min(1, { message: 'Postcode required' }).nullish(),
    city: z.string().min(1, { message: 'City required' }).nullish(),
    paymentMethod: z.string().min(1, { message: 'Payment Method required' }),
})
const SalesForm = (props) => {
    const [loading, setLoading] = useState(true);
    const [apierror, setApiError] = useState(null);
    const { onFormSubmit, children, defaultValues, defaultProducts } = props
    const [paymentMethodOptions, setpaymentMethodOptions] = useState([
        { label: 'Cash', value: 'cash', icon: <TbCashBanknote /> },
        { label: 'Credit/Debit card', value: 'creditOrDebitCard', icon: <TbCreditCard /> },
        { label: 'UPI', value: 'upi', icon: <TbQrcode /> },
    ]);
    
    const { setProductList, setSelectedProduct } =
        useOrderFormStore()

    const { user } = useAuth()

    useEffect(() => {
        apiGetData(user.id).then((resp) => {
            setProductList(resp)
        }).catch((e) => {
            setApiError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    useEffect(() => {
        reset({
            paymentMethod: 'cash',
            phone: '',

        })
    }, [props.refresh])

    // useEffect(() => {
    //     if (defaultProducts) {
    //         setSelectedProduct(defaultProducts)
    //     }
    //     if (!isEmpty(defaultValues)) {
    //         reset(defaultValues)
    //     }
    //     return () => {
    //         setSelectedProduct([])
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const onSubmit = (values) => {
        onFormSubmit?.(values)
    }

    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            paymentMethod: 'cash',
            ...(defaultValues ? defaultValues : {}),
        },
        resolver: zodResolver(baseValidationSchema),
    })
    
    const selectedPaymentMethod = watch('paymentMethod', '')

    if (apierror) {
        return <div>{apierror.message}</div>
    }

    return (
        
        <div className="flex">
            {loading ? <Loading loading={true} /> :
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex-1">
                        <div className="flex flex-col gap-4">
                            <ProductSelectSection />
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-30">
                                <CustomerDetailSection
                                    control={control}
                                    errors={errors}
                                    setpaymentMethodOptions={setpaymentMethodOptions}
                                    setValue={setValue}
                                    getValues={getValues}
                                />
                                <BillingAddressSection
                                    control={control}
                                    errors={errors}
                                />
                                <PaymentMethodSection
                                    control={control}
                                    errors={errors}
                                    paymentMethodOptions={paymentMethodOptions}
                                    selectedPaymentMethod={
                                        selectedPaymentMethod
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
            }
        </div>
    )
}

export default SalesForm
