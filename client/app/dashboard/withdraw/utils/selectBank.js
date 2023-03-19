import React, { useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

const SelectBank = ({ setShowModal, banks, setBankName, setBankCode }) => {
    const [filter, setFilter] = useState('');
    const [banksUpdated, setBanksUpdated] = useState(banks);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowModal(false);
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (filter.length == 0) {
            const newBanks = banks.filter((bank) =>
                bank.name.toLowerCase().includes(filter.toLowerCase())
            );
            return setBanksUpdated(newBanks);
        }
        const newBanks = banks.filter((bank) =>
            bank.name.toLowerCase().includes(filter.toLowerCase())
        );
        setBanksUpdated(newBanks);
    }, [filter]);

    return (
        <>
            <div className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden px-4 outline-none focus:outline-none">
                <div
                    ref={ref}
                    className="scroll flex w-full max-w-xl flex-col space-y-4 place-self-center overflow-auto rounded-lg bg-neutral pb-8 shadow-lg "
                >
                    <div className="sticky top-0 w-full bg-neutral px-4 pt-14">
                        <FaTimes
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-6 cursor-pointer text-xl"
                        />
                        {/*search*/}
                        <div className="relative w-full rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 xsm:pl-3">
                                <BiSearchAlt className="text-lg text-gray-500 xsm:text-xl" />
                            </div>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="block w-full rounded-md border-2 py-3 px-7  font-medium outline-none transition-all duration-300 focus:border-secondary focus:outline-none xsm:min-w-[19rem] xsm:px-10 xsm:text-xl md:min-w-0"
                                placeholder="Search for a Bank"
                                onChange={(e) => setFilter(e.target.value)}
                                value={filter}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {/*body*/}
                    <ul className="scroll h-96 overflow-auto px-4 [&>*]:border-b">
                        {banksUpdated.map((bank) => {
                            const handleSelect = async () => {
                                setBankCode(bank.code);
                                setBankName(bank.name);
                                setShowModal(false);
                            };
                            return (
                                <li
                                    onClick={handleSelect}
                                    className="cursor-pointer py-6 px-4 text-lg font-medium hover:bg-secondary hover:bg-opacity-5 xsm:text-2xl"
                                >
                                    <h1>{bank.name}</h1>
                                </li>
                            );
                        })}
                    </ul>
                    {/*footer*/}
                    {/* <div className="flex h-full w-full items-center justify-start px-4">
                        <button className="rounded-lg bg-secondary py-2 text-xl px-8 text-neutral">
                            Select
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="absolute inset-0 z-40 bg-black opacity-25"></div>
        </>
    );
};

export default SelectBank;
