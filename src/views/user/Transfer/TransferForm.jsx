import { useState, useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import ProductSelectSection from './components/ProductSelectSection'
import SkuSection from './components/SkuSection'
import { PiWarehouseDuotone } from 'react-icons/pi'
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
async function apiGetSku(){
    return ApiService.fetchDataWithAxios({
        url: `/list-sku`,
        method: 'get',
    })
}


const baseValidationSchema = z.object({
    sku_id: z.number().min(1, { message: 'SKU required' }),
})
const SalesForm = (props) => {
    const [loading, setLoading] = useState(true);
    const [apierror, setApiError] = useState(null);
    const { onFormSubmit, children, defaultValues, defaultProducts } = props
    const [skuOptions, setSkuOptions] = useState([
            { label: 'SKU Name', value: 'sku_id', icon: <PiWarehouseDuotone /> },,
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
        apiGetSku().then((resp) => {
            setSkuOptions(resp?.filter(item => item.id !== 2).map(item => ({ label: item.name, value: item.id, icon: <PiWarehouseDuotone />  })) || [])
        }).catch((e) => {
            setApiError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    useEffect(() => {
        reset({
            sku_id: '',

        })
    }, [props.refresh])


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
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            sku_id: '',
            ...(defaultValues ? defaultValues : {}),
        },
        resolver: zodResolver(baseValidationSchema),
    })
    
    const selectedSku = watch('sku_id', '')

    if (apierror) {
        return <div>{apierror.message}</div>
    }

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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SkuSection
                                    control={control}
                                    errors={errors}
                                    skuOptions={skuOptions}
                                    selectedSku={
                                        selectedSku
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
