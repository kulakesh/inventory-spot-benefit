import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Card } from '@/components/ui'
import Upload from '@/components/ui/Upload'
import Loading from '@/components/shared/Loading'
import toast from '@/components/ui/toast'
import ApiService from '@/services/ApiService'
import Notification from '@/components/ui/Notification'

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const baseValidationSchema = z.object({
    bank: z.string().min(1, { message: 'Bank Required' }),
    amount: z.coerce.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .positive("Amount must be a positive number"),
    ref_number: z.string().min(1, { message: 'Referance Number Required' }),
    upload: z.array(z.instanceof(File)).nonempty('At least one file uploaded!'),
})

async function pushData(data) {
    return ApiService.fetchDataWithAxios({
        url: '/franchisee-request-fund',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data,
    })
}

const RequestFund = (props) => {
    const [loading, setLoading] = useState(false);
    
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
    } = useForm({
        defaultValues: {
            bank: 'SBI',
            amount: '',
            ref_number: '',
            upload: [],
        },
        resolver: zodResolver(baseValidationSchema),
    })
    const onSubmit = async (values) => {
        const payload = {
            bank: values.bank,
            amount: values.amount,
            upload: values.upload?.[0] || null,
            ref_number: values.ref_number,
            type: 'franchisee',
        }
        console.log(payload)
        try{
            setLoading(true)
            const resp = await pushData(payload)
            if (resp) {
                toast.push(
                    toast.push(
                        <Notification type="success">Fund Request Successful!</Notification>,
                        { placement: 'top-center' },
                    )
                )
                // reset()
            }
        }catch (e) {
            toast.push(
                <Notification type="danger">
                    {e?.response?.data?.message || e?.message.toString() || e?.toString()}
                </Notification>,
                { placement: 'top-center' },
            )
        }finally {
            setLoading(false)
        }
    }
    const maxUpload = 1
    const beforeUpload = (files, fileList) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/jpg', 'image/png']
        const maxFileSize = 1024 * 1024 * 2 // 2MB

        if (fileList.length >= maxUpload) {
            return `You can only upload ${maxUpload} file(s)`
        }

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg, .jpg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 2MB!'
                }
            }
        }

        return valid
    }

    return (
        
        <div className="flex">
            {loading ? <Loading loading={true} /> :
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={handleKeyDown}
            >
                <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 p-4 rounded shadow">
                <Card>
                    <FormItem
                        asterisk
                        label="Bank"
                        invalid={Boolean(errors.bank)}
                        errorMessage={errors.bank?.message}
                    >
                        <Controller
                            name="bank"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="SBI"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        asterisk
                        label="Amount"
                        invalid={Boolean(errors.amount)}
                        errorMessage={errors.amount?.message}
                    >
                        <Controller
                            name="amount"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    autoComplete="off"
                                    placeholder="Amount"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        asterisk
                        label="UTR/NEFT Number"
                        invalid={Boolean(errors.ref_number)}
                        errorMessage={errors.ref_number?.message}
                    >
                        <Controller
                            name="ref_number"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="UTR/NEFT Number"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Upoad Image "
                        invalid={Boolean(errors.upload)}
                        errorMessage={errors.upload?.message}
                    >
                        <Controller
                            name="upload"
                            control={control}
                            render={({ field }) => (
                                <Upload
                                    beforeUpload={beforeUpload}
                                    fileList={field.value}
                                    onFileRemove={(files) => field.onChange(files)}
                                    onChange={(files) => field.onChange(files)}
                                    tip={<p className="mt-2">jpeg, jpg or png only (max 2MB)</p>}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="flex justify-end">
                        <Button variant="solid" type="submit" loading={loading}>
                            Submit
                        </Button>
                    </div>
                </Card>
                </div>
                <div className="col-span-4 p-4 rounded shadow">
                <Card>
                    <h2 className="text-lg font-semibold mb-4">Bank Details:</h2>
                    <p><strong>Name:</strong> SPOTBENEFIT MARKETING PRIVATE LIMITED</p>
                    <p><strong>Account Number:</strong> 43126446589</p>
                    <p><strong>IFSC Code:</strong> SBIN0000104</p>
                    <p><img className='mx-auto' src="https://spotbenefit.in//build/images/sbi-qr-2.jpg" alt="QR Code" /></p>
                </Card>
                </div>
                </div>
            </Form>
            }
        </div>
    )
}

export default RequestFund
