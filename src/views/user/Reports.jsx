
import Button from '@/components/ui/Button'
import ApiService from '@/services/ApiService'
import dayjs from 'dayjs'

const Reports = () => {
    const stockReport = () => {
        ApiService.fetchDataWithAxios({
            url: '/stock-report-download',
            method: 'get',
            responseType: 'blob',
        }).then((response) => {
            // create file link in browser's memory
            const blob = new Blob([response], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
        
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'stock_report_' + dayjs().format('YYYY-MM-DD_HH:mm:ss') + '.csv'); // Set the desired filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Clean up the Blob URL
        });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Button
                block
                type="button"
                variant="solid"
                onClick={() => stockReport()}
            >
                Stock Report
            </Button>
        </div>
    )
}

export default Reports