import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import ProductSelectSection from './components/ProductSelectSection'
import { useOrderFormStore } from './store/orderFormStore'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/auth'
import ApiService from '@/services/ApiService'

async function apiGetData(id){
    return ApiService.fetchDataWithAxios({
        url: `/get-product-list/${id}`,
        method: 'get',
    })
}

const OrderForm = (props) => {
    const { onFormSubmit, children, defaultValues, defaultProducts } = props

    const { setProductOption, setProductList, setSelectedProduct } =
        useOrderFormStore()

    const { user } = useAuth()

    useEffect(() => {
        apiGetData(user.id).then((resp) => {
            setProductList(resp)
            setProductOption(resp)
        }).catch((error) => {
            console.log('Error fetching product data:', error);
            // setError(error);
        }).finally(() => {
            // setLoading(false);
        })
    }, []);


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
    } = useForm()

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex-1">
                        <div className="flex flex-col gap-4">
                            <ProductSelectSection />
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </div>
    )
}

export default OrderForm
