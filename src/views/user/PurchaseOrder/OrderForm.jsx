import { useState, useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import ProductSelectSection from './components/ProductSelectSection'
import { useOrderFormStore } from './store/orderFormStore'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/auth'
import ApiService from '@/services/ApiService'
import Loading from '@/components/shared/Loading'

async function apiGetData(id){
    return ApiService.fetchDataWithAxios({
        url: `/get-product-list/${id}`,
        method: 'get',
    })
}

const OrderForm = (props) => {
    const [loading, setLoading] = useState(true);
    const [apierror, setApiError] = useState(null);
    const { onFormSubmit, children, defaultValues, defaultProducts } = props

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
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
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
            {loading ? <Loading loading={true} /> :
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={handleKeyDown}
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
            }
        </div>
    )
}

export default OrderForm
