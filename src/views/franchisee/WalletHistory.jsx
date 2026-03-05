import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import Pagination from '@/components/ui/Pagination'
import Table from '@/components/ui/Table'
import ApiService from '@/services/ApiService'
import { Card } from '@/components/ui'
import Select from '@/components/ui/Select'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import dayjs from 'dayjs'
import appConfig from '@/configs/app.config'

const { Tr, Th, Td, THead, TBody } = Table
export default function WalletHistory() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [recordCount, setRecordCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize]);

    const fetchData = async () => {
        setLoading(true);
        ApiService.fetchDataWithAxios({
            url: `/franchisee-wallet-history`,
            method: 'get',
            params: {
                page: pageIndex,
                per_page: pageSize,
            },
        }).then((response) => {
            setData(response.data);
            setPageCount(response.last_page);
            setRecordCount(response.total);
        }).catch((e) => {
            setError(e?.response?.data || e.toString());
        }).finally(() => {
            setLoading(false);
        })

    };

    const table = useReactTable({
        data,
        pageCount,
        state: {
        pagination: {
            pageIndex,
            pageSize,
        },
        },
        manualPagination: true,
        onPaginationChange: (updater) => {
        const newState =
            typeof updater === "function"
            ? updater({ pageIndex, pageSize })
            : updater;

        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
    });
    if (error) {
        return <div>{error || error.message}</div>
    }
    return (
        <div>
        <Card>
            <Table>
                <THead>
                    <Tr>
                        <Th>Sl. No.</Th>
                        <Th>Type</Th>
                        <Th>Credit</Th>
                        <Th>Debit</Th>
                        <Th>Remark</Th>
                        <Th>Description</Th>
                        <Th>Date</Th>
                    </Tr>
                </THead>
                {loading ?
                    <TableRowSkeleton
                    columns={7}
                    rows={pageSize}
                    avatarInColumns={[1]}
                    avatarProps={{ width: 28, height: 28 }}
                    />
                :
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.original.id}>
                                <Td>{row.index + 1 + pageSize * (pageIndex - 1)}</Td>
                                <Td>{row.original.type}</Td>
                                <Td>{row.original.type === 'cr' ? row.original.amount : 0}</Td>
                                <Td>{row.original.type === 'dr' ? row.original.amount : 0}</Td>
                                <Td>{row.original.remark}</Td>
                                <Td>{row.original.description}</Td>
                                <Td>{dayjs.unix(Date.parse(row.original.created_at)/1000).format('D MMM, YYYY h:mm a')}</Td>
                            </Tr>
                        )
                    })}
                </TBody>
                }
            </Table>
            <div className="flex items-center justify-between mt-4">
            <Pagination
                pageSize={pageSize}
                currentPage={pageIndex}
                total={recordCount}
                onChange={setPageIndex}
            />
            
            <div style={{ minWidth: 130 }}>
                <Select
                    size="sm"
                    isSearchable={false}
                    value={appConfig.pageSizeOption.filter(
                        (option) =>
                            option.value ===
                            table.getState().pagination.pageSize,
                    )}
                    options={appConfig.pageSizeOption}
                    onChange={(option) => {
                        setPageSize(option?.value)
                        setPageIndex(1)
                    }}
                />
            </div>
        </div>
        </Card>
    </div>
    );
}