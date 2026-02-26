import { useState, useEffect } from 'react'
import { TbBasketFilled, TbCoinRupeeFilled } from 'react-icons/tb'
import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'
import Loading from '@/components/shared/Loading'
import ApiService from '@/services/ApiService'

const StatisticCard = ({ title, className, icon, value }) => {
    return (
        <div
            className={classNames(
                'rounded-2xl p-4 flex flex-col justify-center',
                className,
            )}
        >
            <div className="flex justify-between items-center relative">
                <div>
                    <div className="mb-4 text-gray-900 font-bold">{title}</div>
                    <h1 className="mb-1 text-gray-900">{value}</h1>
                </div>
                <div
                    className={
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 bg-gray-900 text-white rounded-full text-2xl'
                    }
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}
async function apiGetData(){
    return ApiService.fetchDataWithAxios({
        url: `/franchisee-dashboard`,
        method: 'get',
    })
}
const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [apierror, setApiError] = useState(null);
    const [values, setValues] = useState(null);

    useEffect(() => {
        apiGetData().then((resp) => {
            setValues(resp)
        }).catch((e) => {
            setApiError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <Card>
            {loading ? <Loading loading={true} /> :
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl mt-4">
                    <StatisticCard
                        title="Myshopee Orders"
                        className="bg-sky-100 dark:bg-sky/75"
                        value={values?.total_orders || 0}
                        icon={<TbBasketFilled />}
                    />
                    <StatisticCard
                        title="Wallet Balance"
                        className="bg-emerald-100 dark:bg-emerald/75"
                        value={values?.wallet_balance || 0}
                        icon={<TbCoinRupeeFilled />}
                    />
                </div>
            }
        </Card>
    )
}

export default Dashboard
