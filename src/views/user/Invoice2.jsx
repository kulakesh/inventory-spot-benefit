import { useLocation } from 'react-router'
import Logo from '@/components/template/Logo'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router'

const Invoice = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const invoice = location.state

    let total = 0, current_total, tax = 0
    
    invoice.items.map((item) => {
        current_total = (item.quantity * item.amount) / Number(`1.${Math.round(item?.tax)}`)
        total += current_total
        tax += (item.quantity * item.amount) - current_total
    })

    invoice.tax = tax
    invoice.total = total
    const handleBack = () => {
        navigate(-1)
    }

    return (
        (invoice && Object.keys(invoice).length > 0) ? (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg px-8 py-6">
            <div className="flex items-center justify-between">
            <Logo
                type="streamline"
                imgclassName="mx-auto"
                logoWidth={60}
            />
            <h1 className="text-2xl font-bold text-gray-700">Tax Invoice</h1>
            </div>
            <hr className="my-4"/>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Billing Details</h4>
                    <p><span className="font-semibold">Customer Id:</span> {invoice.member?.user_id}</p>
                    <p><span className="font-semibold">Customer Name:</span> {invoice.member?.name}</p>
                    <p><span className="font-semibold">Address:</span> {invoice.member?.address} {invoice.member?.city} {invoice.member?.state} {invoice.member?.pin} </p>
                    <p><span className="font-semibold">Contact No:</span> {invoice.member?.phone} </p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Company</h4>
                    <p>Spot Benefit Marketing Pvt Ltd</p>
                    <p>{invoice.sku?.address} {invoice.sku?.city} {invoice.sku?.state} {invoice.sku?.pin}</p>
                    <p>Contact:  {invoice.sku?.phone}</p>
                    <p>Email: {invoice.sku?.email}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Shipping Address</h4>
                    <p>Customer Name:{invoice.member?.name}</p>
                    <p>Address: {invoice.member?.address} {invoice.member?.city} {invoice.member?.state} {invoice.member?.pin} </p>
                    <p>Contact No: {invoice.member?.phone} </p>
                </div>
                <div>
                    <p><span className="font-semibold">Invoice No:</span> INV{invoice.id}</p>
                    <p><span className="font-semibold">Invoice Date:</span> {dayjs.unix(invoice.created_at).format('D MMM, YYYY h:mm a')}</p>
                </div>
            </div>


            <h4 className="font-semibold text-gray-800 mb-2">Invoice Items</h4>
            <table className="w-full mb-2 border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-2 border">Particulars</th>
                <th className="px-2 border">HSN Code</th>
                <th className="px-2 border">Qty</th>
                <th className="px-2 border">Rate (₹)</th>
                <th className="px-2 border">Gross Amt (₹)</th>
                <th className="px-2 border">IGST (%)</th>
                <th className="px-2 border">IGST (₹)</th>
                <th className="px-2 border">Net Amt (₹)</th>
                </tr>
            </thead>
            <tbody>
            {invoice.items && invoice.items.map((item, index) => (
                <tr key={index}>
                <td className="px-2 border">{item.name}</td>
                <td className="px-2 border">{item.hsn}</td>
                <td className="px-2 border">{item.quantity}</td>
                <td className="px-2 border">{item.rate}</td>
                <td className="px-2 border">{item.gross}</td>
                <td className="px-2 border">{item.tax}</td>
                <td className="px-2 border">{item.igst}</td>
                <td className="px-2 border">{item.amount}</td>
                </tr>
            ))}
            </tbody>
            </table>
            
            <div class="flex justify-end">
                <table class="min-w-max w-1/2 bg-white border border-gray-300">
                    <tbody>
                    <tr>
                        <td class="font-semibold px-4 border">Before Tax Amount:</td>
                        <td class="px-4 border">₹{invoice.gross_total}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold px-4 border">Add: IGST:</td>
                        <td class="px-4 border">₹{invoice.igst_total}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold px-4 border">Shipping Charges:</td>
                        <td class="px-4 border">₹0.00</td>
                    </tr>
                    <tr>
                        <td class="font-semibold px-4 border">Total Amount After Tax:</td>
                        <td class="px-4 border font-bold">₹{invoice.amount}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div classNameName="text-center mt-16 sm:w-full print:hidden">
                <Button variant="solid" onClick={handleBack}>Back</Button>
            </div>
        </div>
        ) : (
            <div classNameName="w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6 text-center">
                <h2 classNameName="text-xl font-bold text-gray-800">No Invoice Data Available</h2>
                <p classNameName="text-gray-500 mt-4">Please check the invoice details or try again later.</p>
            </div>
        )
    )
}
export default Invoice;