import Card from '@/components/ui/Card'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { components } from 'react-select'

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

const SkuSection = ({ control, errors, selectedSku, skuOptions }) => {
    
    return (
        <Card id="sku">
            <h4 className="mb-6">SKU</h4>
            <FormItem
                label="Select SKU"
                invalid={Boolean(errors.sku_id)}
                errorMessage={errors.sku_id?.message}
            >
                <Controller
                    name="sku_id"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={skuOptions}
                            {...field}
                            components={{
                                Option: CustomSelectOption,
                                Control: CustomControl,
                            }}
                            placeholder=""
                            value={skuOptions.filter(
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

export default SkuSection
