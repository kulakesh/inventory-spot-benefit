import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import ApiService from '@/services/ApiService'
import dayjs from 'dayjs'
import DatePicker from '@/components/ui/DatePicker'

const Reports = () => {
    const [dateRange, setDateRange] = useState([null, null])
    const handleReport = (type) => {
        let url = '';
        switch (type) {
            case 'stock_report':
                url = '/stock-report-download'
                break;
            case 'sales_report':
                url = '/sales-report-download'
                break;
            case 'item_sales_report':
                url = '/item-sales-report-download/' + dayjs(dateRange[0]).format('YYYY-MM-DD') + '/' + dayjs(dateRange[1]).format('YYYY-MM-DD')
                break;
        }
        ApiService.fetchDataWithAxios({
            url: url,
            method: 'get',
            responseType: 'blob',
        }).then((response) => {
            // create file link in browser's memory
            const blob = new Blob([response], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
        
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', type + '_' + dayjs().format('YYYY-MM-DD_HH:mm:ss') + '.csv'); // Set the desired filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Clean up the Blob URL
        });
    }
    const handleRangePickerChange = (date) => {
        if(date[0] === null || date[1] === null) return;
        setDateRange(date)
    }

    return (
        <>
            <DatePicker.DatePickerRange
                placeholder="Select dates range"
                value={dateRange}
                singleDate={true}
                inputFormat="DD MMM, YYYY"
                separator="to"
                onChange={handleRangePickerChange}
                className="w-64 mb-4 ml-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <Button
                    block
                    type="button"
                    variant="solid"
                    onClick={() => handleReport('stock_report')}
                >
                    Stock Report
                </Button>
                <Button
                    block
                    type="button"
                    variant="solid"
                    onClick={() => handleReport('sales_report')}
                >
                    Sales Report
                </Button>
                <Button
                    block
                    type="button"
                    variant="solid"
                    onClick={() => handleReport('item_sales_report')}
                >
                    Product Sales Report
                </Button>
            </div>
        </>
    )
}

export default Reports