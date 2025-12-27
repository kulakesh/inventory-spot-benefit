import { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import Avatar from '@/components/ui/Avatar'
import Table from '@/components/ui/Table'
import ScrollBar from '@/components/ui/ScrollBar'
import AutoComplete from '@/components/shared/AutoComplete'
import useResponsive from '@/utils/hooks/useResponsive'
import { useOrderFormStore } from '../store/orderFormStore'
import classNames from '@/utils/classNames'
import { NumericFormat } from 'react-number-format'
import { TbSearch, TbMinus, TbPlus } from 'react-icons/tb'

const { Tr, Th, Td, THead, TBody } = Table

const ProductSelectSection = () => {
    const { productList, selectedProduct, setSelectedProduct } =
        useOrderFormStore()

    const [inputValue, setInputValue] = useState('')

    const [productsDialogOpen, setProductsDialogOpen] = useState(false)

    const { smaller } = useResponsive()

    const handleOptionSelect = (option) => {
        const selected = productList.find(
            (product) => product.id === option.id,
        )
        
        if (selected) {
            if (selectedProduct.some((product) => product.id === selected.id)) {
                return
            }else if(selected.balance <= 0 ){
                return
            // }else if(selected.category_id === 1 ){
            //     return
            } else {
                selectedProduct.push({ ...selected, quantity: 1 })
                setSelectedProduct(selectedProduct)
            }
        }
    }

    const handleProductIncremental = (productToIncrease) => {
        setSelectedProduct(
            selectedProduct.map((product) => {
                if (product.id === productToIncrease.id) {
                    if(productToIncrease.balance > product.quantity) {
                        product.quantity = product.quantity + 1
                    }
                }
                return product
            }),
        )
    }

    const handleProductDecremental = (productToDecrease) => {
        const targeted = productToDecrease

        targeted.quantity = targeted.quantity - 1
        if (targeted.quantity === 0) {
            setSelectedProduct(
                selectedProduct.filter((product) => product.id !== targeted.id),
            )
        } else {
            setSelectedProduct(
                selectedProduct.map((product) => {
                    if (product.id === targeted.id) {
                        product = targeted
                    }
                    return product
                }),
            )
        }
    }

    const handleProductTypography = (productToChange, event) => {
        const targeted = productToChange

        targeted.quantity = event.target.valueAsNumber
        if (targeted.quantity === 0) {
            setSelectedProduct(
                selectedProduct.filter((product) => product.id !== targeted.id),
            )
        } else {
            if (targeted.quantity > productToChange.balance) {
                targeted.quantity = productToChange.balance
            }
            setSelectedProduct(
                selectedProduct.map((product) => {
                    if (product.id === targeted.id) {
                        product = targeted
                    }
                    return product
                }),
            )
        }
    }

    const handleProductChecked = (checked, selected) => {
        if (checked) {
            selectedProduct.push({ ...selected, quantity: 1 })
            setSelectedProduct(selectedProduct)
        } else {
            setSelectedProduct(
                selectedProduct.filter((product) => product.id !== selected.id),
            )
        }
    }

    const total = useMemo(() => {
        return selectedProduct.reduce((accumulator, product) => {
            return accumulator + product.amount * product.quantity
        }, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProduct, selectedProduct.length])
    const totalBv = useMemo(() => {
        return selectedProduct.reduce((accumulator, product) => {
            return accumulator + product.bv * product.quantity
        }, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProduct, selectedProduct.length])

    return (
        <>
            <Card id="selectProducts">
                <h4 className="mb-6">Select products</h4>
                <div className="flex items-center gap-2">
                    <AutoComplete
                        data={productList}
                        optionKey={(product) => product.name}
                        value={inputValue}
                        renderOption={(option) => (
                            // <div className="flex items-center gap-2">
                            //     <Avatar shape="round" src={option.img_url} />
                            //     <span>{option.name}</span>
                            // </div>
                            <>
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        shape="round"
                                        src={option.img_url}
                                    />
                                    <div>
                                        <p className="heading-text font-bold">
                                            {option.name}
                                        </p>
                                        <p>
                                            BV: {option.bv} 
                                            {option.category_id === 1 ? 
                                                <Badge
                                                    className="ms-2"
                                                    content={'P'}
                                                    innerClass="bg-emerald-500"
                                                />
                                            : 
                                                <Badge
                                                    className="ms-2"
                                                    content={'R'}
                                                    innerClass="bg-blue-500"
                                                />
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    Stock: 
                                    <span className="heading-text font-bold">
                                        {option.balance}
                                    </span>
                                </div>
                            </>
                        )}
                        suffix={<TbSearch className="text-lg" />}
                        placeholder="Search product"
                        onInputChange={setInputValue}
                        onOptionSelected={handleOptionSelect}
                    />
                    <Button
                        type="button"
                        variant="solid"
                        onClick={() => setProductsDialogOpen(true)}
                    >
                        Browse products
                    </Button>
                </div>
                <Table compact={smaller.sm} className="mt-6">
                    <THead>
                        <Tr>
                            <Th className="w-[70%]">Product</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Total</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {selectedProduct.length > 0 ? (
                            selectedProduct.map((product) => (
                                <Tr key={product.id}>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                shape="round"
                                                src={product.img_url}
                                            />
                                            <div>
                                                <div className="heading-text font-bold">
                                                    {product.name}
                                                </div>
                                                <div>
                                                    BV: {product.bv} 
                                                    {product.category_id === 1 ? 
                                                        <Badge
                                                            className="ms-2"
                                                            content={'P'}
                                                            innerClass="bg-emerald-500"
                                                        />
                                                    : 
                                                        <Badge
                                                            className="ms-2"
                                                            content={'R'}
                                                            innerClass="bg-blue-500"
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            <NumericFormat
                                                fixedDecimalScale
                                                prefix="₹"
                                                displayType="text"
                                                value={product.amount}
                                                decimalScale={2}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center">
                                            <Button
                                                type="button"
                                                icon={<TbMinus />}
                                                size="xs"
                                                onClick={() =>
                                                    handleProductDecremental(
                                                        product,
                                                    )
                                                }
                                            />
                                            <div className="w-15 text-center">
                                                <Input
                                                    type="number" 
                                                    autoComplete="off"
                                                    value={product.quantity}
                                                    className="text-center"
                                                    onChange={(event) =>
                                                        handleProductTypography(
                                                            product, event
                                                        )
                                                    }
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                icon={<TbPlus />}
                                                size="xs"
                                                onClick={() =>
                                                    handleProductIncremental(
                                                        product,
                                                    )
                                                }
                                            />
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="heading-text font-bold">
                                            <NumericFormat
                                                fixedDecimalScale
                                                prefix="₹"
                                                displayType="text"
                                                value={
                                                    product.amount *
                                                    product.quantity
                                                }
                                                decimalScale={2}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td className="text-center" colSpan={4}>
                                    No product selected!
                                </Td>
                            </Tr>
                        )}
                    </TBody>
                </Table>
                <div className="mt-8 flex justify-between">
                    <span className="text-base flex items-center gap-2">
                        <span className="font-semibold">Total BV: </span>
                        <span className="text-lg font-bold heading-text">
                            <NumericFormat
                                fixedDecimalScale
                                displayType="text"
                                value={totalBv}
                                decimalScale={2}
                            />
                        </span>
                    </span>
                    <span className="text-base flex items-center gap-2">
                        <span className="font-semibold">Grand Total: </span>
                        <span className="text-lg font-bold heading-text">
                            <NumericFormat
                                fixedDecimalScale
                                prefix="₹"
                                displayType="text"
                                value={total}
                                decimalScale={2}
                                thousandSeparator={true}
                            />
                        </span>
                    </span>
                </div>
            </Card>
            <Dialog
                isOpen={productsDialogOpen}
                onClose={() => setProductsDialogOpen(false)}
                onRequestClose={() => setProductsDialogOpen(false)}
            >
                <div className="text-center mb-6">
                    <h4 className="mb-1">All products</h4>
                    <p>Add products to this order.</p>
                </div>
                <div className="mt-4">
                    <div className="mb-6">
                        <ScrollBar
                            className={classNames('overflow-y-auto h-80')}
                        >
                            {productList.map((product) => (
                                <div
                                    key={product.id}
                                    className="py-3 pr-5 rounded-lg flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="px-1">
                                            {product.balance > 0 ? 
                                                <Checkbox
                                                    checked={selectedProduct.some(
                                                        (selected) =>
                                                            selected.id ===
                                                            product.id,
                                                    )}
                                                    onChange={(value) =>
                                                        handleProductChecked(
                                                            value,
                                                            product,
                                                        )
                                                    }
                                                />
                                            : 
                                                <Checkbox
                                                    disabled
                                                    checked={false}
                                                />
                                            }
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                size="lg"
                                                shape="round"
                                                src={product.img_url}
                                            />
                                            <div>
                                                <p className="heading-text font-bold">
                                                    {product.name}
                                                </p>
                                                <p>
                                                    BV: {product.bv} 
                                                    {product.category_id === 1 ? 
                                                        <Badge
                                                            className="ms-2"
                                                            content={'P'}
                                                            innerClass="bg-emerald-500"
                                                        />
                                                    : 
                                                        <Badge
                                                            className="ms-2"
                                                            content={'R'}
                                                            innerClass="bg-blue-500"
                                                        />
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        Stock:{' '}
                                        <span className="heading-text font-bold">
                                            {product.balance}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </ScrollBar>
                    </div>
                </div>
                <Button
                    block
                    type="button"
                    variant="solid"
                    onClick={() => setProductsDialogOpen(false)}
                >
                    Done
                </Button>
            </Dialog>
        </>
    )
}

export default ProductSelectSection
