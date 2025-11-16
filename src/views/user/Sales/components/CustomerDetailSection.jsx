import { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import InputGroup from '@/components/ui/InputGroup'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { countryList } from '@/constants/countries.constant'
import { Controller } from 'react-hook-form'
import ApiService from '@/services/ApiService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { get, set } from 'lodash'

async function searchUserID(id) {
    return ApiService.fetchDataWithAxios({
        url: `/get-member-details/${id}`,
        method: 'get',
    })
}
const CustomerDetailSection = ({ control, errors, setValue, getValues }) => {
    const handleSearchUserID = async () => {
        const userID = getValues('user_id')
        try{
            const resp = await searchUserID(userID);
            if (resp) {
                setValue('name', resp.name);
                setValue('email', resp.email);
                setValue('phone', resp.phone);
                setValue('address', resp.address);
                setValue('pin', resp.pin);
                setValue('city', resp.city);
                setValue('member_id', resp.id);
            }
        }catch (e) {
            toast.push(
                <Notification type="danger">
                    {e?.response?.data?.message || e.message.toString() || e.toString()}
                </Notification>,
                { placement: 'top-center' },
            )
        }
    };
    return (
        <Card id="customerDetails">
            <h4 className="mb-6">Customer details</h4>
            <FormItem
                label="User ID"
                invalid={Boolean(errors.user_id)}
                errorMessage={errors.user_id?.message}
            >
                <InputGroup className="mb-4">
                    <Controller
                        name="user_id"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="User ID"
                                {...field}
                            />
                        )}
                    />
                    <Button type="button" variant="solid" onClick={handleSearchUserID}>Search</Button>
                </InputGroup>
                
            </FormItem>
            
            <FormItem
                label="Name"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Customer Name"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                autoComplete="off"
                                placeholder="Email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Phone Number"
                    invalid={Boolean(errors.phone)}
                    errorMessage={errors.phone?.message}
                >
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                type="number"
                                autoComplete="off"
                                placeholder="Phone Number"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
            
        </Card>
    )
}

export default CustomerDetailSection
