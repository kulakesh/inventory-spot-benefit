import Card from '@/components/ui/Card'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { TbCreditCard, TbCashBanknote, TbBuildingBank, TbQrcode } from 'react-icons/tb'
import { components } from 'react-select'

const paymentMethodOptions = [
    { label: 'Cash', value: 'cash', icon: <TbCashBanknote /> },
    { label: 'Credit/Debit card', value: 'creditOrDebitCard', icon: <TbCreditCard /> },
    { label: 'UPI', value: 'upi', icon: <TbQrcode /> },
    { label: 'Bank transfer', value: 'bankTransfer', icon: <TbBuildingBank /> },
]


const { Control } = components

const CustomSelectOption = (props) => {
    return (
        <DefaultOption
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <span className="text-xl">{data.icon}</span>
                    <span>{label}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <span className="text-xl ltr:ml-4 rtl:mr-4 text-primary">
                    {selected.icon}
                </span>
            )}
            {children}
        </Control>
    )
}

const PaymentMethodSection = ({ control, errors, selectedPaymentMethod }) => {
    return (
        <Card id="payment">
            <h4 className="mb-6">Payment</h4>
            <FormItem
                label="Payment method"
                invalid={Boolean(errors.paymentMethod)}
                errorMessage={errors.paymentMethod?.message}
            >
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={paymentMethodOptions}
                            {...field}
                            components={{
                                Option: CustomSelectOption,
                                Control: CustomControl,
                            }}
                            placeholder=""
                            value={paymentMethodOptions.filter(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default PaymentMethodSection
