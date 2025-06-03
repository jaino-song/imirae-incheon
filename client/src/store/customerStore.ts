import { create } from 'zustand';

// interface for all state properties
interface ContractState {
    customerName: string;
    customerContact: string;
    customerDOB: string;
    customerAddress: string;

    caretaker1Name: string;
    caretaker1Contact: string;

    type: string;
    days: string;
    area: string;
    duration: string;

    startYear: string;
    startMonth: string;
    startDay: string;
    startDate: string;

    endYear: string;
    endMonth: string;
    endDay: string;
    endDate: string;

    // receipt data
    contractDuration: string;
    paymentYear: string;
    paymentMonth: string;
    paymentDay: string;
    receiptYear: string;
    receiptMonth: string;
    receiptDay: string;

    fullPrice: string;
    grant: string;
    actualPrice: string;
    accNum: string;
    bankName: string;
}

// interface for all actions
interface ContractActions {
    setCustomerName: (name: string) => void;
    setCustomerContact: (contact: string) => void;
    setCustomerDOB: (dob: string) => void;
    setCustomerAddress: (address: string) => void;

    setCaretaker1Name: (name: string) => void;
    setCaretaker1Contact: (contact: string) => void;

    setType: (type: string) => void;
    setDays: (days: string) => void;
    setArea: (area: string) => void;
    setDuration: (duration: string) => void;

    setStartYear: (startYear: string) => void;
    setStartMonth: (startMonth: string) => void;
    setStartDay: (startDay: string) => void;
    setStartDate: (startDate: string) => void;

    setEndYear: (endYear: string) => void;
    setEndMonth: (endMonth: string) => void;
    setEndDay: (endDay: string) => void;
    setEndDate: (endDate: string) => void;

    setContractDuration: (contractDuration: string) => void;
    setPaymentYear: (year: string) => void;
    setPaymentMonth: (month: string) => void;
    setPaymentDay: (day: string) => void;
    setReceiptYear: (year: string) => void;
    setReceiptMonth: (month: string) => void;
    setReceiptDay: (day: string) => void;

    setPriceData: (data: {
        fullPrice: string;
        grant: string;
        actualPrice: string;
        accNum: string;
        bankName: string;
    }) => void;
    resetStore: () => void;
}

// tyoe combining for the complete store
type ContractStore = ContractState & ContractActions;

const useContractStore = create<ContractStore>((set) => ({
    // states
    customerName: '',
    customerContact: '',
    customerDOB: '',
    customerAddress: '',

    caretaker1Name: '',
    caretaker1Contact: '',

    type: '',
    days: '',
    area: '',
    duration: '',

    startYear: new Date().getFullYear().toString(),
    startMonth: '',
    startDay: '',
    startDate: '',

    endYear: new Date().getFullYear().toString(),
    endMonth: '',
    endDay: '',
    endDate: '',

    contractDuration: '',
    paymentYear: new Date().getFullYear().toString(),
    paymentMonth: '',
    paymentDay: '',
    receiptYear: new Date().getFullYear().toString(),
    receiptMonth: '',
    receiptDay: '',

    // price data
    fullPrice: '',
    grant: '',
    actualPrice: '',
    accNum: '',
    bankName: '',

    // actions
    setCustomerName: (name: string) => set({ customerName: name }),
    setCustomerContact: (contact: string) => set({ customerContact: contact }),
    setCustomerDOB: (dob: string) => set({ customerDOB: dob }),
    setCustomerAddress: (address: string) => set({ customerAddress: address }),

    setCaretaker1Name: (name: string) => set({ caretaker1Name: name }),
    setCaretaker1Contact: (contact: string) => set({ caretaker1Contact: contact }),
    
    setType: (type: string) => set({ type }),
    setDays: (days: string) => set({ days }),
    setArea: (area: string) => set({ area }),
    setDuration: (duration: string) => set({ duration }),

    setStartYear: (startYear: string) => set({ startYear }),
    setStartMonth: (startMonth: string) => set({ startMonth }),
    setStartDay: (startDay: string) => set({ startDay }),
    setStartDate: (startDate: string) => set({ startDate }),

    setEndYear: (endYear: string) => set({ endYear }),
    setEndMonth: (endMonth: string) => set({ endMonth }),
    setEndDay: (endDay: string) => set({ endDay }),
    setEndDate: (endDate: string) => set({ endDate }),

    setContractDuration: (contractDuration: string) => set({ contractDuration }),
    setPaymentYear: (year: string) => set({ paymentYear: year }),
    setPaymentMonth: (month: string) => set({ paymentMonth: month }),
    setPaymentDay: (day: string) => set({ paymentDay: day }),
    setReceiptYear: (year: string) => set({ receiptYear: year }),
    setReceiptMonth: (month: string) => set({ receiptMonth: month }),
    setReceiptDay: (day: string) => set({ receiptDay: day }),

    setPriceData: (data) => set({
        fullPrice: data.fullPrice,
        grant: data.grant,
        actualPrice: data.actualPrice,
        accNum: data.accNum,
        bankName: data.bankName
    }),

    resetStore: () => set({
        customerName: '',
        customerContact: '',
        type: '',
        days: '',
        area: '',
        duration: '',
        startDate: '',
        endDate: '',
        fullPrice: '',
        grant: '',
        actualPrice: '',
        accNum: '',
        bankName: ''
    })
}));

export default useContractStore;