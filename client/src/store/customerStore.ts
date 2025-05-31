import { create } from 'zustand';

// interface for all state properties
interface ContractState {
    customerName: string;
    customerContact: string;
    type: string;
    days: string;
    area: string;
    duration: string;
    startDate: string;
    endDate: string;

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
    setType: (type: string) => void;
    setDays: (days: string) => void;
    setArea: (area: string) => void;
    setDuration: (duration: string) => void;
    setStartDate: (startDate: string) => void;
    setEndDate: (endDate: string) => void;
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
    bankName: '',

    setCustomerName: (name: string) => set({ customerName: name }),
    setCustomerContact: (contact: string) => set({ customerContact: contact }),
    setType: (type: string) => set({ type }),
    setDays: (days: string) => set({ days }),
    setArea: (area: string) => set({ area }),
    setDuration: (duration: string) => set({ duration }),
    setStartDate: (startDate: string) => set({ startDate }),
    setEndDate: (endDate: string) => set({ endDate }),
    
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