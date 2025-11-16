import { useLocation } from 'react-router'
import Logo from '@/components/template/Logo'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'

const Invoice = () => {
    const location = useLocation()
    const invoice = location.state

    let total = 0, current_total, tax = 0
    console.log("Invoice>",invoice);
    
    invoice.items.map((item) => {
        current_total = (item.quantity * item.amount) / Number(`1.${Math.round(item?.tax)}`)
        total += current_total
        tax += (item.quantity * item.amount) - current_total
    })

    invoice.tax = tax
    invoice.total = total
    const handleBack = () => {
        navigate(`/user/sales/create`)
    }
    return (
        (invoice && Object.keys(invoice).length > 0) ? (
        <div className="w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6" id="invoice">
            <div className="grid grid-cols-2 items-center">
                <div>
                    <Logo
                        type="streamline"
                        imgClass="mx-auto"
                        logoWidth={60}
                    />
                </div>
            
                <div className="text-right">
                    <p>
                    Spot Benefit
                    </p>
                    <p className="text-gray-500 text-sm">
                    info@spotbenefit.in
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                    +91 9954364001, +91 9954364004 
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                    GSTIN: 8657671212
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 items-center mt-8">
                <div>
                    <p className="font-bold text-gray-800">
                    Bill to :
                    </p>
                    <p className="text-gray-500">
                    {invoice.name}
                    <br />
                    {invoice.city}
                    </p>
                    <p className="text-gray-500">
                    {invoice.phone} {invoice.email}
                    </p>
                </div>
            
                <div className="text-right">
                    <p className="">
                    Invoice number:
                    <span className="text-gray-500">INV-{invoice.id}</span>
                    </p>
                    <p>
                    Invoice date: <span className="text-gray-500">{dayjs.unix(invoice.created_at).format('D MMM, YYYY h:mm a')}</span>
                    </p>
                </div>
            </div>

            <div className="-mx-4 mt-8 flow-root sm:mx-0">
                <table className="min-w-full">
                    <thead className="border-b border-gray-300 text-gray-900">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-full sm:w-1/2">Items</th>
                        <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:w-1/6">Quantity</th>
                        <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:w-1/6">Price</th>
                        <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0 sm:w-1/6">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        {invoice.items && invoice.items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div className="font-medium text-gray-900">{item.name}</div>
                                    <div className="mt-1 truncate text-gray-500">{item.hsn}</div>
                                </td>
                                <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">{item.quantity}</td>
                                <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">₹{item.amount}</td>
                                <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                    ₹{(item.quantity * item.amount).toFixed(2)} 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Subtotal</th>
                        <th scope="row" className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
                        <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">₹{total.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Tax</th>
                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax</th>
                        <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">₹{tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total</th>
                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
                        <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">₹{invoice.amount}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16 sm:w-full">
                This is a computer-generated document and does not require a signature.
            </div>
            <div className="text-center mt-16 sm:w-full print:hidden">
                <Button variant="solid" onClick={handleBack}>Back</Button>
            </div>

        </div>
        ) : (
            <div className="w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6 text-center">
                <h2 className="text-xl font-bold text-gray-800">No Invoice Data Available</h2>
                <p className="text-gray-500 mt-4">Please check the invoice details or try again later.</p>
            </div>
        )
    )
}
export default Invoice;