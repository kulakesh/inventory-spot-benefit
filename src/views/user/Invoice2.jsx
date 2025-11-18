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
        navigate(`/user/sales/create`)
    }

    return (
        (invoice && Object.keys(invoice).length > 0) ? (
        <div class="max-w-5xl mx-auto bg-white shadow-md rounded-lg px-8 py-6">
            <div class="flex items-center justify-between">
            <Logo
                type="streamline"
                imgClass="mx-auto"
                logoWidth={60}
            />
            <h1 class="text-2xl font-bold text-gray-700">Tax Invoice</h1>
            </div>
            <hr class="my-4"/>

            <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="font-semibold text-gray-800 mb-2">Billing Details</h4>
                    <p><span class="font-semibold">Party Id:</span> KRYN00985801</p>
                    <p><span class="font-semibold">Party Name:</span> Ajija Sultana</p>
                    <p><span class="font-semibold">Address:</span> flat no 6B block-b vedanta residency near gayanjyoti college dagapur siligury,Kurseong,WEST BENGAL,Darjiling</p>
                    <p><span class="font-semibold">Contact No:</span> 9123747944</p>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800 mb-2">Company</h4>
                    <p>Karyon Organic Pvt Ltd</p>
                    <p>409, Balewadi highstreet, Baner, Pune-411045, Maharashtra(India)</p>
                    <p>Contact: 020-41228793, +91 7720077965</p>
                    <p>Email: info@karyon.org</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="font-semibold text-gray-800 mb-2">Shipping Address</h4>
                    <p>Party Id: KRYN00985801</p>
                    <p>Party Name: Ajija Sultana</p>
                    <p>Address: flat no 6B block-b vedanta residency near gayanjyoti college dagapur siligury,Kurseong,WEST BENGAL,Darjiling</p>
                    <p>Contact No: 9123747944</p>
                </div>
                <div>
                    <p><span class="font-semibold">Transfer Invoice No:</span> INC52461</p>
                    <p><span class="font-semibold">Invoice Date:</span> 31 May 2024</p>
                    <p><span class="font-semibold">Order No:</span> 7520149026</p>
                    <p><span class="font-semibold">Order Date:</span> 31 May 2024</p>
                </div>
            </div>


            <h4 class="font-semibold text-gray-800 mb-2">Invoice Items</h4>
            <table class="w-full mb-6 border border-gray-200">
            <thead class="bg-gray-100">
                <tr>
                <th class="px-2 border">Particulars</th>
                <th class="px-2 border">HSN Code</th>
                <th class="px-2 border">Qty</th>
                <th class="px-2 border">Rate (₹)</th>
                <th class="px-2 border">Gross Amt (₹)</th>
                <th class="px-2 border">IGST (%)</th>
                <th class="px-2 border">IGST (₹)</th>
                <th class="px-2 border">Net Amt (₹)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td class="px-2 border">Camiton 2.5 liter</td>
                <td class="px-2 border">31010099</td>
                <td class="px-2 border">4</td>
                <td class="px-2 border">2773.00</td>
                <td class="px-2 border">11093.33</td>
                <td class="px-2 border">5.00</td>
                <td class="px-2 border">554.67</td>
                <td class="px-2 border">11648.00</td>
                </tr>
                <tr>
                <td class="px-2 border">Sticon 250 ML</td>
                <td class="px-2 border">38089990</td>
                <td class="px-2 border">2</td>
                <td class="px-2 border">312.00</td>
                <td class="px-2 border">623.73</td>
                <td class="px-2 border">18.00</td>
                <td class="px-2 border">112.27</td>
                <td class="px-2 border">736.00</td>
                </tr>
            </tbody>
            </table>

            <div class="mb-2">
            <p><span class="font-semibold">Before Tax Amount:</span> ₹11717.06</p>
            <p><span class="font-semibold">Add: IGST:</span> ₹666.94</p>
            <p><span class="font-semibold">Shipping Charges:</span> ₹0.00</p>
            <p class="text-lg font-bold"><span class="font-semibold">Total Amount After Tax:</span> ₹12384.00</p>
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