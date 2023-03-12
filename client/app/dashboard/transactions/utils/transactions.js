import React from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

const Transactions = ({ transactions, user, border }) => {
    const router = useRouter();
    const borderB =
        '[&>div]:border-b [&>div]:border-b-secondary [&>div]:border-opacity-40 [&>div]:last:border-b-0';
    return (
        <div
            className={`flex w-full flex-col items-center overflow-auto  ${
                border && 'p-5'
            } px-2 xsm:px-5 `}
        >
            {transactions.map((transaction, index) => {
                let amount;
                amount = transaction.amount;
                amount = new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                }).format(amount);

                if (amount.split('')[0] !== '-') {
                    amount = '+' + amount;
                }

                let username;
                if (user.username === transaction.sender) {
                    username = '@' + transaction.receiver;
                } else {
                    username = '@' + transaction.sender;
                }

                return (
                    <div
                        onClick={() =>
                            router.push(
                                `/dashboard/transactions/${transaction._id}`
                            )
                        }
                        key={transaction._id}
                        className="my-2 flex w-full cursor-pointer items-center gap-x-2 rounded-lg px-4 py-4 hover:bg-secondary hover:bg-opacity-10 xsm:gap-x-4"
                    >
                        <div
                            className={` flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[0.8rem] text-white xsm:h-9 xsm:w-9 sm:h-10 sm:w-10 sm:text-base`}
                        >
                            {`${
                                transaction.fullName.split(' ')[0].split('')[0]
                            }${
                                transaction.fullName.split(' ')[1].split('')[0]
                            }`}
                        </div>
                        <div className="grid w-full flex-1 grid-cols-2 items-center">
                            <h2 className="flex flex-col text-sm font-semibold text-primary xsm:text-lg sm:text-xl lg:text-2xl">
                                {username}
                                {amount.split('')[0] === '-' ? (
                                    <span className="text-[0.6rem] leading-3 text-gray-400 sm:text-[0.7rem] md:text-sm">
                                        Sent money to user
                                    </span>
                                ) : (
                                    <span className="text-[0.6rem] leading-3 text-gray-400 sm:text-[0.7rem] md:text-sm">
                                        Received money
                                    </span>
                                )}
                            </h2>
                            {/* <div className="flex h-full w-full items-center justify-center">
                                <button
                                    className={`rounded-lg border-2 border-secondary to-gray-200 px-4 py-0.5 text-[0.7rem] text-secondary xsm:px-6 xsm:text-base`}
                                >
                                    Details
                                </button>
                            </div> */}
                            <p
                                className={`flex flex-col text-right text-[0.7rem] font-semibold xsm:text-sm sm:text-lg ${
                                    amount.split('')[0] === '-'
                                        ? 'text-red-600'
                                        : 'text-green-600'
                                }`}
                            >
                                <span
                                    className={`text-[0.5rem] font-medium leading-3 text-gray-400 xsm:text-[0.6rem] md:text-[0.8rem]`}
                                >
                                    {transaction.createdAt.split(',')[1]}
                                </span>
                                {amount}
                                <span
                                    className={`${
                                        transaction.status === 'Pending'
                                            ? 'text-orange-500'
                                            : 'text-blue-500'
                                    }
                                        text-[0.6rem] font-medium leading-3
                                        text-gray-400 xsm:text-[0.7rem]
                                md:text-sm`}
                                >
                                    {transaction.status}
                                </span>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Transactions;
