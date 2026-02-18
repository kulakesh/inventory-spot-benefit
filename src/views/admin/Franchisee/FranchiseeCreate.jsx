
import { useEffect, useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import Card from '@/components/ui/Card'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ApiService from '@/services/ApiService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import Alert from '@/components/ui/Alert'
import Loading from '@/components/shared/Loading'
import { useParams, useNavigate } from 'react-router'
import { PiWarehouseDuotone } from 'react-icons/pi'
import SkuSection from '../../user/Transfer/components/SkuSection'

async function apiGetSku(){
    return ApiService.fetchDataWithAxios({
        url: `/list-sku`,
        method: 'get',
    })
}
const validationSchema = (id) => {
    return z.object({
        user_id: z.string(),
        name: z.string().min(4, 'Name Required'),
        email: z.string().nullish(),
        phone: z.string().nullish(),
        city: z.string().nullish(),
        state: z.string().nullish(),
        address: z.string().nullish(),
        pin: z.string().nullish(),
        gstin: z.string().nullish(),
        sku_id: z.number().min(1, { message: 'SKU required' }),
        username: z.string().min(4, 'Too Short!').max(12, 'Too Long!'),
        password: id 
            ? z.string().nullish() 
            : z.string()
            .min(1, { message: 'Password Required' })
            .min(6, { message: 'Too Short!' })
            .refine(
                (value) => /^[A-Za-z0-9_-]*$/.test(value),
                'Only Letters & Numbers Allowed',
            ),

    })
}

async function pushData(data) {
    return ApiService.fetchDataWithAxios({
        url: '/create-franchisee',
        method: 'post',
        data,
    })
}
async function pullData(id) {
    return ApiService.fetchDataWithAxios({
        url: `/get-franchisee/${id}`,
        method: 'get',
    })
}
const Franchisee = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(id ? true : false);
    const [apierror, setApiError] = useState(null);
    const [skuOptions, setSkuOptions] = useState([
                { label: 'SKU Name', value: 'sku_id', icon: <PiWarehouseDuotone /> },,
            ]);
    
    useEffect(() => {
        if (id) {
            setLoading(true)
            pullData(id).then((resp) => {
                reset(resp)
            }).catch((e) => {
                setApiError(e?.response?.data || e.toString());
            })
        }
        
        apiGetSku().then((resp) => {
            setSkuOptions(resp?.map(item => ({ label: item.name, value: item.id, icon: <PiWarehouseDuotone />  })) || [])
        }).catch((e) => {
            setApiError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }, [])
    
    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        setError,
        control,
    } = useForm({
        defaultValues: {
            user_id: '',
            name: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            address: '',
            pin: '',
            gstin: '',
            username: '',
            password: '',
        },
        resolver: zodResolver(validationSchema(id)),
    })

    const selectedSku = watch('sku_id', '')

    const [message, setMessage] = useTimeOutMessage()

    const onSubmit = async (values) => {
        try{
            if (id) {
                values.id = id
            }
            const resp = await pushData(values)
            if (resp) {
                setMessage?.({
                    text: resp?.message || 'Successfully Saved',
                    type: 'success'
                })
                if (!id) {
                    reset()
                }
            }
        }catch (e) {
            setMessage?.({
                text: e?.response?.data?.message || e.message.toString() || e.toString(),
                type: 'danger'
            })
            for (var key in e?.response?.data?.errors) {
                setError(key, {
                    type: 'manual',
                    message: e?.response?.data?.errors[key],
                })
            }
        }
    }
    if (apierror) {
        return <div>{apierror.message}</div>
    }
    return (
        <>
            {loading ? <Loading loading={true} /> :
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    {message && (
                        <Alert showIcon className="mb-4" type={message.type}>
                            <span className="break-all">{message.text}</span>
                        </Alert>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <FormItem
                                asterisk
                                label="User ID"
                                invalid={Boolean(errors.user_id)}
                                errorMessage={errors.user_id?.message}
                            >
                                <Controller
                                    name="user_id"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Plan User ID"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Name"
                                invalid={Boolean(errors.name)}
                                errorMessage={errors.name?.message}
                            >
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="SKU Name"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={Boolean(errors.email)}
                                errorMessage={errors.email?.message}
                            >
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="email"
                                            autoComplete="off"
                                            placeholder="e-mail"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Phone"
                                invalid={Boolean(errors.phone)}
                                errorMessage={errors.phone?.message}
                            >
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="number"
                                            autoComplete="off"
                                            placeholder="Phone Number"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="City"
                                invalid={Boolean(errors.city)}
                                errorMessage={errors.city?.message}
                            >
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="City Name"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="State"
                                invalid={Boolean(errors.state)}
                                errorMessage={errors.state?.message}
                            >
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="State Name"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                        <div>
                            <FormItem
                                label="Address"
                                invalid={Boolean(errors.address)}
                                errorMessage={errors.address?.message}
                            >
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Address"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="Pin"
                                invalid={Boolean(errors.pin)}
                                errorMessage={errors.pin?.message}
                            >
                                <Controller
                                    name="pin"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="number"
                                            autoComplete="off"
                                            placeholder="Pin Number"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                label="GSTIN"
                                invalid={Boolean(errors.gstin)}
                                errorMessage={errors.gstin?.message}
                            >
                                <Controller
                                    name="gstin"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="GSTIN"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>

                            <SkuSection
                                control={control}
                                errors={errors}
                                skuOptions={skuOptions}
                                selectedSku={
                                    selectedSku
                                }
                            />

                            <FormItem
                                asterisk
                                label="Username"
                                invalid={Boolean(errors.username)}
                                errorMessage={errors.username?.message}
                            >
                                <Controller
                                    name="username"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Username"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Password"
                                invalid={Boolean(errors.password)}
                                errorMessage={errors.password?.message}
                            >
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="password"
                                            autoComplete="off"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </div>
                    </div>
                </Card>
                <BottomStickyBar>
                    <Container>
                        <div className="flex items-center justify-between px-8">
                            <span></span>
                            <div className="flex items-center">
                            <Button
                                type="reset"
                                className="ltr:mr-2 rtl:ml-2"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button variant="solid" type="submit">
                                Submit
                            </Button>
                            </div>
                        </div>
                    </Container>
                </BottomStickyBar>
            </Form>
            }
        </>
    )
}

export default Franchisee

