"use client"

import React, { useEffect, useState } from 'react'
import { FaCog } from "react-icons/fa";
import { MdPayments, MdOutlineAllInclusive } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";

export const UserStats = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactionCount = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/transactions/user');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.success) {
                    setTransactions(data.transactions || []);
                } else {
                    setError(data.message || 'Failed to fetch transactions');
                }
            } catch (error) {
                console.error('Error fetching transaction count:', error);
                setError('Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionCount();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center p-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    // Calculate stats from transactions
    const totalTransactions = transactions.length;
    const nextPayment = 0; 
    const outstandingPayment = 0;
    
  return (
    <div>
        <div className='shadow h-[25rem] lg:h-[10rem]  py-3 px-4 block lg:flex lg:justify-between lg:items-end bg-card rounded-2xl'>
            <div className='shadow-sm h-[100px] lg:w-[20rem] space-y-3 text-[#0F2C59] bg-white font-medium rounded-md'>
                <div className='flex items-center justify-between px-6 pt-5 '>
                    <MdPayments className='h-7 w-7' />
                    <p># {nextPayment}</p>
                </div>
                <h1 className='px-6 text-sm'>Next Payment</h1>
            </div>

            <div className='shadow-sm h-[100px] lg:w-[20rem] space-y-3 text-[#0F2C59] bg-white font-medium rounded-md'>
                <div className='flex items-center justify-between px-6 pt-5 '>
                    <RiSecurePaymentFill className='h-7 w-7' />
                    <p># {outstandingPayment}</p>
                </div>
                <h1 className='px-6 text-sm'>Outstanding Payment</h1>
            </div>

            <div className='shadow-sm h-[100px] lg:w-[20rem] space-y-3 text-[#0F2C59] bg-white font-medium rounded-md'>
                <div className='flex items-center justify-between px-6 pt-5 '>
                    <MdOutlineAllInclusive className='h-7 w-7' />
                    <p>{totalTransactions}</p>
                </div>
                <h1 className='px-6 text-sm'>Total Transactions</h1>
            </div>
        </div>
    </div>
  ) 
}
